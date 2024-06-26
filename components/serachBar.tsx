import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import tw from 'twrnc';
import { useAppContext } from '~/context/MapProvider';
import { router } from 'expo-router';

export const SerachBar = ({}) => {
  const { textInputRef, bottomSheetRef, profileBottomSheetRef } = useAppContext();
  const [search, setSearch] = useState('');
  return (
    <View style={tw`flex-row rounded-xl  items-center justify-between p-2 gap-2`}>
      <BlurView
        intensity={100}
        tint="systemChromeMaterialLight"
        style={tw`flex-1 flex-row items-center justify-center   px-4 overflow-hidden rounded-full`}>
        <View style={tw`overflow-hidden flex-row items-center`}>
          <TextInput
            placeholder="Search"
            style={tw`flex-1 h-8 bg-transparent`}
            value={search}
            ref={textInputRef as React.LegacyRef<TextInput>}
            onChangeText={setSearch}
          />
          <TouchableOpacity
            onPress={() => {
              textInputRef.current?.blur();
              textInputRef.current?.clear();
              setSearch('');
            }}>
            <Ionicons name={search ? 'close' : 'search'} size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </BlurView>
      <TouchableOpacity
        onPress={() => {
          router.push('/profile');
        }}
        style={tw`w-9 h-9 rounded-full`}>
        <Ionicons name="person" size={24} color="gray" style={tw`m-auto`} />
      </TouchableOpacity>
    </View>
  );
};
