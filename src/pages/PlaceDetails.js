import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Divider, Image, Badge} from 'react-native-elements';
import UserDetails from '../components/UserDetails';
import MapDetails from '../components/MapDetails';

const PlaceDetails = ({navigation}) => {
  const {
    title,
    description,
    price,
    imageUrl,
    region,
    address,
    user,
  } = navigation.getParam('place');
  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          style={styles.image}
          source={{uri: imageUrl}}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={styles.imagePlaceholder}
        />
        <View style={styles.contentContainer}>
          <UserDetails userEmail={user.userEmail} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>{title}</Text>
            <Badge
              value={`US$ ${price}`}
              status="success"
              badgeStyle={styles.priceContainer}
              textStyle={styles.priceText}
            />
          </View>
          <Divider />
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.mapContainer}>
          <MapDetails
            region={region}
            address={address}
            showsUserLocation={false}
            scrollEnabled={true}
            showMarker={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    height: 400,
  },
  imagePlaceholder: {
    backgroundColor: '#d4d4d4',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  priceContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  priceText: {
    fontSize: 14,
  },
  description: {
    marginVertical: 16,
    fontSize: 20,
    textAlign: 'center',
  },
  mapContainer: {
    marginBottom: 16,
  },
});

PlaceDetails.navigationOptions = ({navigation}) => {
  return {
    title: `${navigation.getParam('place').title}`,
  };
};

export default PlaceDetails;
