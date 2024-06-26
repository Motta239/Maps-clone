import { View, Text, StyleSheet } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { defaultStyles } from '~/constants/Styles';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '~/context/MapProvider';

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter();
  const { mapRef, bottomSheetRef } = useAppContext();
  const [markers, setMarkers] = useState<any[]>(listings.features);
  const [visibleMarkers, setVisibleMarkers] = useState<any[]>([]);
  const [region, setRegion] = useState(INITIAL_REGION);

  useEffect(() => {
    filterVisibleMarkers(region);
  }, [region, markers]);

  const filterVisibleMarkers = (currentRegion: any) => {
    const latDelta = currentRegion.latitudeDelta / 2;
    const lonDelta = currentRegion.longitudeDelta / 2;

    const filteredMarkers = markers.filter(
      (marker) =>
        marker.properties.latitude >= currentRegion.latitude - latDelta &&
        marker.properties.latitude <= currentRegion.latitude + latDelta &&
        marker.properties.longitude >= currentRegion.longitude - lonDelta &&
        marker.properties.longitude <= currentRegion.longitude + lonDelta
    );

    setVisibleMarkers(filteredMarkers);
  };

  const onMarkerSelected = (event: any) => {
    router.push(`/listing/${event.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}>
        <View style={tw`p-2 items-center justify-center rounded-lg`}>
          <Text style={tw`text-black text-center font-semibold`}>{points}</Text>
        </View>
      </Marker>
    );
  };

  const onLongPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    const newMarker = {
      properties: {
        id: Math.random().toString(36).substr(2, 9),
        latitude,
        longitude,
        price: longitude,
      },
    };

    setMarkers([...markers, newMarker]);
  };

  const onRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        ref={mapRef}
        showsUserLocation
        showsCompass
        onLongPress={onLongPress}
        onRegionChangeComplete={onRegionChangeComplete}
        onTouchStart={() => bottomSheetRef.current?.snapToIndex(0)}
        style={tw`flex-1`}
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        scrollDuringRotateOrZoomEnabled
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}>
        {visibleMarkers.map((item: any) => (
          <Marker
            coordinate={{
              latitude: item.properties.latitude,
              longitude: item.properties.longitude,
            }}
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}>
            <View style={tw`p-2 items-center justify-center elevation-5 rounded-lg`}>
              <Ionicons name="pin" size={24} color="black" />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

export default ListingsMap;
