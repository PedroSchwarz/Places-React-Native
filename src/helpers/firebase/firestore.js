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

export const setPlace = async place => {
  const placeRef = rootRef.doc();
  const newPlace = {...place, id: placeRef.id};
  await placeRef.set(newPlace);
};

export const updatePlace = async place => {
  const {id, title, description, price} = place;
  const placeRef = getRootRef().doc(id);
  await placeRef.update({title, description, price});
};

export const deletePlace = async placeId => {
  const placeRef = getRootRef().doc(placeId);
  await placeRef.delete();
};
