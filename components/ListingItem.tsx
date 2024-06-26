import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useState } from 'react';
import tw from 'twrnc';
import { AirbnbListing } from '~/types';

const ListingItem: React.FC<{
  item: AirbnbListing;
  onPress: (item: AirbnbListing) => void;
}> = ({ item, onPress }) => {
  const defaultImage = 'https://picsum.photos/200/200?random=1';
  const [imageUrl, setImageUrl] = useState(item.medium_url ?? defaultImage);

  return (
    <Link href={'(tabs)/(explore)/listing'} asChild>
      <TouchableOpacity style={tw` rounded-xl overflow-hidden  shadow bg-white  m-3`}>
        <Image
          source={{ uri: imageUrl }}
          style={tw`h-80 w-full `}
          onProgress={() => <ActivityIndicator />}
          onError={() => setImageUrl(defaultImage)}
        />
        <Animated.View style={tw`p-4 gap-3`} entering={FadeInRight} exiting={FadeOutLeft}>
          <View style={tw`absolute bottom-0 right-0 m-3 p-2 rounded-full bg-white bg-opacity-80`}>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="#ff4444" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress(item)}>
              <Ionicons name="navigate-outline" size={24} color="#007aff" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row justify-between items-start`}>
            <Text style={tw`text-lg flex-1 font-semibold text-gray-800`}>{item.name}</Text>
            <View style={tw`flex-row items-start gap-1 p-1`}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={tw`text-gray-600`}>{(item.review_scores_rating / 20).toFixed(1)}</Text>
            </View>
          </View>
          <Text style={tw`text-gray-500`}>{item.room_type}</Text>
          <View style={tw`flex-row items-center gap-1 mt-1`}>
            <Text style={tw`text-lg font-bold text-gray-800`}>€{item.price}</Text>
            <Text style={tw`text-gray-500`}>/ night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default ListingItem;
