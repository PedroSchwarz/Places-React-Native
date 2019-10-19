import React, {useEffect, useContext} from 'react';
import {View, Alert, ScrollView, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';

import useInputState from '../hooks/useInputState';
import useToggleState from '../hooks/useToggleState';

import {getCurrentUser, createUser} from '../helpers/firebase/auth';

import {UserContext} from '../contexts/UserContext';

import Colors from '../constants/Colors';

const Register = ({navigation}) => {
  const [email, changeEmail, resetEmail] = useInputState('');
  const [password, changePassword, resetPassword] = useInputState('');
  const [conf, changeConf, resetConf] = useInputState('');
  const [isLoading, toggleIsLoading] = useToggleState(false);

  const {setUser} = useContext(UserContext);

  useEffect(() => {
    goToPlaces();
  }, []);

  const handleRegister = async () => {
    toggleIsLoading();
    const userInfo = await createUser(email, password);
    if (!userInfo.error) {
      setUser(userInfo);
      goToPlaces();
    } else {
      Alert.alert('Something Went Wrong!', `${userInfo.error}`, [
        {
          text: 'OK',
          onPress: () => {
            toggleIsLoading();
          },
        },
      ]);
    }
  };

  const goToPlaces = () => {
    if (getCurrentUser()) navigation.replace('Places');
    else return;
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email..."
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={{
              name: 'email',
              type: 'material',
              size: 24,
              color: Colors.grey,
            }}
            leftIconContainerStyle={{marginRight: 16}}
            value={email}
            onChangeText={changeEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Password..."
            keyboardType="visible-password"
            leftIcon={{
              name: 'lock',
              type: 'material',
              size: 24,
              color: Colors.grey,
            }}
            leftIconContainerStyle={{marginRight: 16}}
            value={password}
            onChangeText={changePassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Confirm Password..."
            keyboardType="visible-password"
            leftIcon={{
              name: 'lock',
              type: 'material',
              size: 24,
              color: Colors.grey,
            }}
            leftIconContainerStyle={{marginRight: 16}}
            value={conf}
            onChangeText={changeConf}
          />
        </View>
        <Button
          buttonStyle={styles.registerButton}
          containerStyle={styles.buttonContainer}
          iconContainerStyle={styles.buttonIcon}
          icon={{name: 'check', type: 'material', size: 18, color: '#fff'}}
          title="Register Account"
          disabled={
            !email || !password || !conf || conf !== password || isLoading
          }
          disabledTitleStyle={{color: '#FFF'}}
          onPress={handleRegister}
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
  buttonContainer: {
    margin: 16,
  },
  buttonIcon: {
    marginRight: 16,
  },
  registerButton: {
    backgroundColor: Colors.success,
  },
});

export default Register;
