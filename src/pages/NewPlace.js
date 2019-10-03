import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import uuid from 'uuid/v4';

import {openLibrary, openCamera} from '../helpers/imagePicker';
import {PlacesDispatchContext} from '../contexts/PlacesContext';
import useInputState from '../hooks/useInputState';
import Colors from '../constants/Colors';

const NewPlace = props => {
  const [image, setImage] = useState(null);
  const [title, changeTitle, resetTitle] = useInputState('');
  const [description, changeDescription, resetDescription] = useInputState('');
  const [price, changePrice, resetPrice] = useInputState('');

  const dispatch = useContext(PlacesDispatchContext);

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

  const handleAddPlace = () => {
    const newPlace = {id: uuid(), title, description, price, imageUrl: image};
    dispatch({type: 'ADD', newPlace});
    props.navigation.pop();
  };

  return (
    <View style={styles.root}>
      <ScrollView>
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
            containerStyle={styles.imageButtonsContainer}
            icon={{
              name: 'photo-library',
              type: 'material',
              size: 15,
              color: '#fff',
            }}
            title="Open Library"
            onPress={getFromLibrary}
          />
          <Button
            containerStyle={styles.imageButtonsContainer}
            icon={{
              name: 'camera',
              type: 'material',
              size: 15,
              color: '#fff',
            }}
            title="Open Camera"
            onPress={getFromCamera}
          />
        </View>
        {image && (
          <View style={styles.inputContainer}>
            <Image
              style={styles.image}
              source={image}
              PlaceholderContent={<ActivityIndicator />}
              resizeMode="cover"
            />
          </View>
        )}
        <Button
          buttonStyle={styles.postButton}
          containerStyle={styles.postButtonContainer}
          iconContainerStyle={styles.postButtonIcon}
          icon={{name: 'check', type: 'material', size: 15, color: '#fff'}}
          disabled={!title || !description || !price || !image}
          title="Post Place"
          onPress={handleAddPlace}
        />
      </ScrollView>
    </View>
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
  imageButtonsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  postButtonContainer: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
  postButtonIcon: {
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
