import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Button, Image} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';

const ref = firebase.firestore().collection('places');
const storageRef = firebase.storage().ref('/places_images/');

const Home = () => {
  const [image, setImage] = useState(null);

  const getImage = async () => {
    const result = await ImagePicker.openCamera({
      cropping: true,
    });
    const imageRef = storageRef.child(
      `${result.creationDate}+${result.filename}.jpg`,
    );
    const storageResult = await imageRef.putFile(result.path);
    setImage({uri: storageResult.downloadURL});
  };

  const saveOnDB = () => {
    ref.add(image);
  };

  return (
    <View style={{flex: 1}}>
      <Text h1>Hello...!</Text>
      <Button
        icon={{name: 'camera', type: 'material', size: 18, color: '#fff'}}
        title="Get Image"
        onPress={getImage}
      />
      {image && <Image style={{height: 400}} source={image} />}
      <Button title="Save on Database" onPress={saveOnDB} disabled={!image} />
    </View>
  );
};

Home.navigationOptions = {
  title: 'Main Page',
};

export default Home;
