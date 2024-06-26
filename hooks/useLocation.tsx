import * as Location from 'expo-location';
import MapView from 'react-native-maps';

const cameraSettings = [
  {
    pitch: 45,
    heading: 20,
    altitude: 2000,
    zoom: 15,
  },
  {
    pitch: 60,
    heading: 40,
    altitude: 1000,
    zoom: 12,
  },
  {
    pitch: 30,
    heading: 60,
    altitude: 5000,
    zoom: 18,
  },
];

let currentIndex = 0;

export const onLocateMe = async ({ mapRef }: { mapRef: React.RefObject<MapView> }) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return;
  }

  const location = await Location.getCurrentPositionAsync({});

  const camera = {
    center: {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    },
    ...cameraSettings[currentIndex],
  };

  currentIndex = (currentIndex + 1) % cameraSettings.length;

  mapRef.current?.animateCamera(camera);
};
