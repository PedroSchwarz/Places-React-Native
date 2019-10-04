import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {useScreens} from 'react-native-screens';

import AppContainer from './routes';
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
      <PlacesProvider>
        <AppContainer />
      </PlacesProvider>
    </ThemeProvider>
  );
};
