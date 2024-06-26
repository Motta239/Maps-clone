import React, { useMemo, useState, useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useAppContext } from '~/context/MapProvider';
import { Stack } from 'expo-router';
import listingsDataGeo from '~/assets/data/airbnb-listings.geo.json';
import ListingsMap from '~/components/ListingsMap';
import { Handle } from '~/components/HandleComponent';

const Layout = ({ listings }: { listings: any }) => {
  const geoItems = useMemo(() => listingsDataGeo, []);
  const snapPoints = useMemo(() => ['10%', '50%', '80%'], []);
  const { bottomSheetRef } = useAppContext();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e: KeyboardEvent) => {
      bottomSheetRef.current?.expand();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e: KeyboardEvent) => {
      bottomSheetRef.current?.collapse();
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onIndexChange = (index: number) => {
    if (index === 0) {
      Keyboard.dismiss();
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      onChange={(index) => onIndexChange(index)}
      snapPoints={snapPoints}
      backgroundComponent={null}
      enablePanDownToClose={false}
      backdropComponent={() => <ListingsMap listings={geoItems} />}
      handleComponent={() => <Handle />}
      enableHandlePanningGesture>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="listing"
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
            presentation: 'modal',
          }}
        />
      </Stack>
    </BottomSheet>
  );
};

export default Layout;
