import React, { createContext, useContext, useRef } from 'react';
import { TextInput } from 'react-native';
import MapView from 'react-native-maps';
import BottomSheet, { BottomSheetFlatListMethods, BottomSheetModal } from '@gorhom/bottom-sheet';

interface AppContextProps {
  textInputRef: React.RefObject<TextInput>;
  mapRef: React.RefObject<MapView>;
  bottomSheetRef: React.RefObject<BottomSheet>;
  profileBottomSheetRef: React.RefObject<BottomSheetModal>;
  scrollRef: React.RefObject<BottomSheetFlatListMethods>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const textInputRef = useRef<TextInput>(null);
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const profileBottomSheetRef = useRef<BottomSheetModal>(null);
  const scrollRef = useRef<BottomSheetFlatListMethods>(null);

  return (
    <AppContext.Provider
      value={{ textInputRef, mapRef, bottomSheetRef, scrollRef, profileBottomSheetRef }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
