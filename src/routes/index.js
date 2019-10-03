import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Colors from "../constants/Colors";

import Home from "../pages/Home";
import NewPlace from "../pages/NewPlace";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    NewPlace: { screen: NewPlace }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.headerTextColor,
      headerStyle: { backgroundColor: Colors.primary }
    }
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
