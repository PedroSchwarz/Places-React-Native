import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../constants/Colors';

import Places from '../pages/Places';
import NewPlace from '../pages/NewPlace';
import PlaceDetails from '../pages/PlaceDetails';
import EditPlace from '../pages/EditPlace';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';

const AuthTabNavigator = createMaterialBottomTabNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <MaterialIcons name="person" size={22} color={tintColor} />
        ),
        tabBarColor: Colors.accent,
        title: 'Access Your Account',
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <MaterialIcons name="person-add" size={22} color={tintColor} />
        ),
        tabBarColor: Colors.success,
        title: 'Create a New Account',
      },
    },
  },
  {
    shifting: true,
    activeColor: '#FFF',
  },
);

const MainNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthTabNavigator,
      navigationOptions: {
        title: 'Authentication',
      },
    },
    Places: {
      screen: Places,
    },
    NewPlace: {
      screen: NewPlace,
    },
    PlaceDetails: {
      screen: PlaceDetails,
    },
    EditPlace: {
      screen: EditPlace,
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.light,
      headerStyle: {
        backgroundColor: Colors.primary,
      },
    },
  },
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
