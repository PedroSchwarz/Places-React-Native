import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import {Divider, Image, Badge} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import UserDetails from '../components/UserDetails';
import MapDetails from '../components/MapDetails';
import CustomHeaderButton from '../components/CustomHeaderButton';

import {deletePlace} from '../helpers/firebase/firestore';
import {getCurrentUser} from '../helpers/firebase/auth';

const PlaceDetails = ({navigation}) => {
  const {
    id,
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
          <UserDetails userEmail={user.userEmail} placeId={id} />
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
  },
  priceContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  priceText: {
    fontSize: 16,
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
  const placeInfo = navigation.getParam('place');
  const currentUser = getCurrentUser();
  const isOwner = placeInfo.user.userId === currentUser.uid;

  const goToEdit = () => {
    navigation.navigate('EditPlace', {place: placeInfo});
  };

  const handleDeletePlace = async () => {
    await deletePlace(placeInfo.id);
    navigation.popToTop();
  };

  const showAlert = () => {
    Alert.alert('Are You Sure?', 'This post will be delete forever!', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Yes', onPress: handleDeletePlace, style: 'destructive'},
    ]);
  };

  return {
    title: placeInfo.title,
    headerRight: isOwner ? (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Edit" iconName="create" onPress={goToEdit} />
        <Item title="Delete" iconName="delete" onPress={showAlert} />
      </HeaderButtons>
    ) : null,
  };
};

export default PlaceDetails;
