import firebase from 'react-native-firebase';
import uuid from 'uuid/v4';

const rootRef = firebase.storage().ref('/places_images/');

export const storeFile = async file => {
  const path = rootRef.child(`${uuid()}.jpg`);
  const result = await path.putFile(file);
  return result.downloadURL;
};
