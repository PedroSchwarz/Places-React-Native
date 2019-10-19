import firebase from 'react-native-firebase';

const userRef = firebase.auth();

export const getCurrentUser = () => {
  return userRef.currentUser;
};

export const signOutUser = async () => {
  return userRef.signOut();
};

export const createUser = async (email, password) => {
  let result;
  try {
    const {user} = await userRef.createUserWithEmailAndPassword(
      email,
      password,
    );
    result = {userEmail: user.email, userId: user.uid};
  } catch (error) {
    result = {error};
  }
  return result;
};

export const signInUser = async (email, password) => {
  let result;
  try {
    const {user} = await userRef.signInWithEmailAndPassword(email, password);
    result = {userEmail: user.email, userId: user.uid};
  } catch (error) {
    result = {error};
  }
  return result;
};
