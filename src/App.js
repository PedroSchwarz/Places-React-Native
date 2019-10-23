import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {useScreens} from 'react-native-screens';

import AppContainer from './routes';
import {UserProvider} from './contexts/UserContext';
import {PlacesProvider} from './contexts/PlacesContext';
import Colors from './constants/Colors';

useScreens();

export default App = () => {
  const theme = {
    colors: {
      primary: Colors.primary,
      secondary: Colors.accent,
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <PlacesProvider>
          <StatusBar
            backgroundColor={Colors.darkPrimary}
            barStyle="light-content"
          />
          <AppContainer />
        </PlacesProvider>
      </UserProvider>
    </ThemeProvider>
  );
};
