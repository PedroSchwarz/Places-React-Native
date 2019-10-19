import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import {requestLocationPermission} from './permissions';
import ApisKeys from '../constants/ApisKeys';

export const getLocation = async (setRegion, setAddress) => {
  const result = await requestLocationPermission();
  if (result === 'GRANTED') {
    let location = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        location = {...location, latitude, longitude};
        setRegion(location);
        getAddress(location, setAddress);
      },
      error => {
        console.log('ERROR!!!', error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000,
      },
    );
  } else {
    setAddress("Location couldn't be gotten.");
  }
};

const getAddress = async ({latitude, longitude}, setAddress) => {
  Geocoder.init(ApisKeys.GOOGLE_MAPS_API_KEY);
  const result = await Geocoder.from({latitude, longitude});
  const address = result.results[0].formatted_address;
  setAddress(address);
};
