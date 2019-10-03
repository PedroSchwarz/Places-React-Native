import ImagePicker from 'react-native-image-crop-picker';

export const openLibrary = async () => {
  const result = await ImagePicker.openPicker({
    cropping: true,
  });
  return result;
};

export const openCamera = async () => {
  const result = await ImagePicker.openCamera({
    cropping: true,
  });
  return result;
};
