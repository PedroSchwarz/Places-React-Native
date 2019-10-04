import firebase from 'react-native-firebase';

const rootRef = firebase.firestore().collection('places');

export const getRootRef = () => rootRef;

export const getPlaces = async () => {
  const places = [];
  const result = await rootRef.get();
  result.forEach(doc => {
    places.push({...doc.data()});
  });
  return places;
};

export const setPlace = async (title, description, price, imageUrl) => {
  const placeRef = rootRef.doc();
  const newPlace = {id: placeRef.id, title, description, price, imageUrl};
  await placeRef.set(newPlace);
  return newPlace;
};
