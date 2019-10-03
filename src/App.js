import React from 'react';
import {ThemeProvider} from 'react-native-elements';

import AppContainer from './routes';
import {PlacesProvider} from './contexts/PlacesContext';
import Colors from './constants/Colors';

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
