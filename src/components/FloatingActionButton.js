import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import Colors from '../constants/Colors';

const FloatingActionButton = ({iconName, iconType, onPress}) => {
  return (
    <Icon
      containerStyle={styles.floatingActionButton}
      reverse
      raised
      name={iconName}
      type={iconType}
      color={Colors.accent}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  floatingActionButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: 0,
    marginBottom: 16,
    marginRight: 16,
  },
});

export default FloatingActionButton;
