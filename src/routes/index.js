import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from '../pages/Home';

const AppNavigator = createStackNavigator(
  {
    Home: {screen: Home},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {backgroundColor: '#0000FF'},
      headerTintColor: '#FFF',
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
