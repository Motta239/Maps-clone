import { Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';

import listingsData from '~/assets/data/airbnb-listings.json';
import ListingsMap from '~/components/ListingsMap';

import { AppProvider, useAppContext } from '~/context/MapProvider';
import tw from 'twrnc';
import Listings from '~/components/Listings';
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import listingsDataGeo from '~/assets/data/airbnb-listings.geo.json';
import Profile from '~/components/Profile';
const Page = () => {
  const items = useMemo(() => listingsData as any, []);
  const { bottomSheetRef } = useAppContext();

  const onShowMap = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  return (
    <View style={tw` flex-1 `}>
      <Listings listings={items} />
      <View style={tw`absolute bottom-8 w-full items-center`}>
        <BlurView intensity={70} tint="dark" style={tw`rounded-full overflow-hidden`}>
          <TouchableOpacity
            onPress={onShowMap}
            style={tw`py-3 px-6 rounded-full flex-row items-center`}>
            <Text style={tw`font-bold text-white`}>Map</Text>
            <Ionicons name="map" size={20} style={tw`ml-2`} color={'#fff'} />
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
};

export default Page;
