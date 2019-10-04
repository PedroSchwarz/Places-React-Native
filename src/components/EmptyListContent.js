import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyListContent = () => {
  return (
    <View style={styles.emptyListContent}>
      <Text style={styles.emptyListWarning}>No Places Added Yet!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyListContent: {
    marginTop: 24,
    alignItems: 'center',
  },
  emptyListWarning: {
    fontSize: 18,
  },
});

export default EmptyListContent;
