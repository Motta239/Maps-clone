import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import tw from 'twrnc';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const Profile = () => {
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`items-center mt-10`}>
        <BlurView intensity={100} tint="light" style={tw`rounded-full overflow-hidden`}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={tw`w-32 h-32 rounded-full`}
          />
        </BlurView>
        <Text style={tw`mt-4 text-2xl font-bold`}>John Doe</Text>
        <Text style={tw`text-gray-500`}>@johndoe</Text>
      </View>
      <View style={tw`mt-10 px-6`}>
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold`}>Personal Information</Text>
          <Text style={tw`text-gray-500 mt-2`}>Email: johndoe@example.com</Text>
          <Text style={tw`text-gray-500 mt-1`}>Phone: (123) 456-7890</Text>
          <Text style={tw`text-gray-500 mt-1`}>Location: San Francisco, CA</Text>
        </View>
        <TouchableOpacity
          style={tw`flex-row items-center justify-between py-4 border-b border-gray-200`}>
          <Text style={tw`text-lg`}>Account Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center justify-between py-4 border-b border-gray-200`}>
          <Text style={tw`text-lg`}>Privacy</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center justify-between py-4 border-b border-gray-200`}>
          <Text style={tw`text-lg`}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center justify-between py-4 border-b border-gray-200`}>
          <Text style={tw`text-lg`}>Help</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center justify-between py-4 border-b border-gray-200`}>
          <Text style={tw`text-lg`}>About</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
