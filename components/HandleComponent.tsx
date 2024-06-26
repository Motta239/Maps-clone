import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import tw from 'twrnc';
import { useAppContext } from '~/context/MapProvider';
import Colors from '~/constants/Colors';
import { onLocateMe } from '~/hooks/useLocation';

export const Handle = () => {
  const { mapRef, bottomSheetRef, textInputRef } = useAppContext();

  return (
    <View style={tw`flex-row absolute top-[-12] left-2 gap-2`}>
      <BlurView
        intensity={100}
        tint="systemChromeMaterialLight"
        style={tw`flex-row w-10 h-10 justify-center items-center overflow-hidden rounded-xl`}>
        <TouchableOpacity
          style={tw`p-2 rounded-lg`}
          onPress={() => {
            onLocateMe({ mapRef });
            bottomSheetRef.current?.collapse();
          }}>
          <Ionicons name="navigate" size={24} color={Colors.dark} />
        </TouchableOpacity>
      </BlurView>
      <BlurView
        intensity={100}
        tint="systemChromeMaterialLight"
        style={tw`flex-row w-10 h-10 justify-center items-center overflow-hidden rounded-xl`}>
        <TouchableOpacity
          style={tw`p-2 rounded-lg`}
          onPress={() => {
            textInputRef.current?.focus();
          }}>
          <Ionicons name="search-outline" size={24} color={Colors.dark} />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};
