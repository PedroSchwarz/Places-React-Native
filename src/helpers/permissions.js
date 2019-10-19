import {PermissionsAndroid} from 'react-native';

export const requestLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return 'GRANTED';
  } else {
    return 'DENIED';
  }
};
