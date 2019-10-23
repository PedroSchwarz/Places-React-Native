import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';

import useInputState from '../hooks/useInputState';
import useToggleState from '../hooks/useToggleState';

import {updatePlace} from '../helpers/firebase/firestore';

import Colors from '../constants/Colors';

const EditPlace = ({navigation}) => {
  const place = navigation.getParam('place');

  const [title, changeTitle] = useInputState(place.title);
  const [description, changeDescription] = useInputState(place.description);
  const [price, changePrice] = useInputState(place.price);

  const [isLoading, toggleIsLoading] = useToggleState(false);

  const handleUpdatePlace = async () => {
    toggleIsLoading();
    await updatePlace({id: place.id, title, description, price});
    toggleIsLoading();
    navigation.popToTop();
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
          title="Save Place"
          disabled={!title || !description || !price || isLoading}
          disabledTitleStyle={{color: Colors.light}}
          onPress={handleUpdatePlace}
          loading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1},
  inputContainer: {
    marginVertical: 16,
    marginHorizontal: 8,
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

EditPlace.navigationOptions = ({navigation}) => {
  const title = navigation.getParam('place').title;
  return {
    title: `Edit ${title}`,
  };
};

export default EditPlace;
