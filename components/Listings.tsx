import { SerachBar } from './serachBar';
import { View } from 'react-native';

import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import tw from 'twrnc';
import { useAppContext } from '~/context/MapProvider';
import ListingItem from './ListingItem';
import { AirbnbListing } from '~/types';

interface Props {
  listings: AirbnbListing[];
}

const Listings = ({ listings: items }: Props) => {
  const { mapRef, bottomSheetRef, scrollRef } = useAppContext();

  const onPress = (item: any) => {
    bottomSheetRef.current?.collapse();

    mapRef.current?.animateToRegion({
      latitude: item.geolocation.lat,
      longitude: item.geolocation.lon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View style={tw`flex-1 rounded-t-xl bg-white `}>
      <SerachBar />
      <BottomSheetFlatList
        ref={scrollRef}
        renderItem={({ item }) => <ListingItem onPress={onPress} item={item} />}
        data={items ?? []}
        keyboardDismissMode="on-drag"
      />
    </View>
  );
};

export default Listings;
