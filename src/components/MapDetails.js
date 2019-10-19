import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import Colors from '../constants/Colors';

const MapDetails = ({
  region,
  address,
  showsUserLocation,
  scrollEnabled,
  showMarker,
}) => {
  return (
    <View>
      <MapView
        style={styles.map}
        region={region}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={showsUserLocation}
        scrollEnabled={scrollEnabled}
        loadingEnabled>
        {showMarker && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Place's location"
            description={address}
          />
        )}
      </MapView>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 400,
  },
  addressContainer: {
    marginTop: 8,
    marginHorizontal: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  address: {fontSize: 14, textAlign: 'center', color: '#fff'},
});

export default MapDetails;
