import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Input, Image, Button} from 'react-native-elements';

import MapDetails from '../components/MapDetails';

import {openLibrary, openCamera} from '../helpers/imagePicker';
import {getLocation} from '../helpers/location';
// import {PlacesDispatchContext} from '../contexts/PlacesContext';
import {UserContext} from '../contexts/UserContext';
import useInputState from '../hooks/useInputState';
import useToggleState from '../hooks/useToggleState';
import Colors from '../constants/Colors';

import {setPlace} from '../helpers/firebase/firestore';
import {storeFile} from '../helpers/firebase/storage';

const NewPlace = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState('');

  const [title, changeTitle] = useInputState('');
  const [description, changeDescription] = useInputState('');
  const [price, changePrice] = useInputState('');

  const [isLoading, toggleIsLoading] = useToggleState(false);

  // const dispatch = useContext(PlacesDispatchContext);
  const {user} = useContext(UserContext);

  const getFromLibrary = async () => {
    const {path} = await openLibrary();
    const source = {uri: path};
    setImage(source);
  };

  const getFromCamera = async () => {
    const {path} = await openCamera();
    const source = {uri: path};
    setImage(source);
  };

  const getCurrentLocation = async () => {
    await getLocation(setRegion, setAddress);
  };

  const handleAddPlace = async () => {
    toggleIsLoading();
    const imageUrl = await storeFile(image.uri);
    // const newPlace =
    await setPlace({
      title,
      description,
      price,
      imageUrl,
      region,
      address,
      user,
    });
    toggleIsLoading();
    // dispatch({type: 'ADD', newPlace});
    navigation.pop();
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.inputContainer}>
          <Input
            label="Title"
            placeholder="Place's title here..."
            autoCapitalize="words"
            value={title}
            onChangeText={changeTitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            label="Description"
            placeholder="Place's description here..."
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={changeDescription}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            label="Price"
            placeholder="Place's price here..."
            keyboardType="numeric"
            value={price}
            onChangeText={changePrice}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            buttonStyle={styles.libraryButton}
            containerStyle={styles.imageButtonsContainer}
            icon={{
              name: 'photo-library',
              type: 'material',
              size: 18,
              color: Colors.light,
            }}
            title="Open Library"
            onPress={getFromLibrary}
          />
          <Button
            buttonStyle={styles.cameraButton}
            containerStyle={styles.imageButtonsContainer}
            icon={{
              name: 'camera',
              type: 'material',
              size: 18,
              color: Colors.light,
            }}
            title="Open Camera"
            onPress={getFromCamera}
          />
        </View>
        {image && (
          <Image
            style={styles.image}
            source={image}
            PlaceholderContent={<ActivityIndicator />}
            placeholderStyle={styles.imagePlaceholder}
            resizeMode="cover"
          />
        )}
        <Button
          buttonStyle={styles.locationButton}
          containerStyle={styles.buttonContainer}
          iconContainerStyle={styles.buttonIcon}
          icon={{
            name: 'location-on',
            type: 'material',
            size: 18,
            color: Colors.light,
          }}
          title="Get Current Location"
          onPress={getCurrentLocation}
        />
        {region && (
          <MapDetails
            region={region}
            address={address}
            showsUserLocation={true}
            scrollEnabled={false}
            showMarker={false}
          />
        )}
        <Button
          buttonStyle={styles.postButton}
          containerStyle={styles.buttonContainer}
          iconContainerStyle={styles.buttonIcon}
          icon={{
            name: 'check',
            type: 'material',
            size: 18,
            color: Colors.light,
          }}
          title="Post Place"
          disabled={
            !title || !description || !price || !image || !region || isLoading
          }
          disabledTitleStyle={{color: Colors.light}}
          onPress={handleAddPlace}
          loading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputContainer: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
  buttonsContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 400,
  },
  imagePlaceholder: {
    backgroundColor: '#d4d4d4',
  },
  libraryButton: {backgroundColor: Colors.info},
  cameraButton: {backgroundColor: Colors.info},
  imageButtonsContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  locationButton: {
    backgroundColor: Colors.accent,
  },
  buttonContainer: {
    margin: 16,
  },
  buttonIcon: {
    marginRight: 16,
  },
  postButton: {
    backgroundColor: Colors.success,
  },
});

NewPlace.navigationOptions = {
  title: 'Add a New Place',
};

export default NewPlace;
