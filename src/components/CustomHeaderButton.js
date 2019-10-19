import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={25}
      color={Colors.light}
    />
  );
};

export default CustomHeaderButton;
