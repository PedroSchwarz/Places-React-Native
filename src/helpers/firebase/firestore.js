import firebase from 'react-native-firebase';
import moment from 'moment';

const rootRef = firebase.firestore();

export const getPlacesRef = () => rootRef.collection('places');

export const getPlaces = async () => {
  const places = [];
  const result = await getPlacesRef().get();
  result.forEach(doc => {
    places.push({...doc.data()});
  });
  return places;
};

export const setPlace = async place => {
  const placeRef = getPlacesRef().doc();
  const newPlace = {...place, id: placeRef.id};
  await placeRef.set(newPlace);
};

export const updatePlace = async place => {
  const {id, title, description, price} = place;
  const placeRef = getPlacesRef().doc(id);
  await placeRef.update({title, description, price});
};

export const deletePlace = async placeId => {
  const placeRef = getPlacesRef().doc(placeId);
  await placeRef.delete();
};

export const getCommentsRef = () => rootRef.collection('comments');

export const setComment = async comment => {
  const commentRef = getCommentsRef().doc();
  const createdAt = moment(new Date()).format('MMMM Do YYYY, hh:mm');
  const newComment = {...comment, createdAt, id: commentRef.id};
  await commentRef.set(newComment);
};
