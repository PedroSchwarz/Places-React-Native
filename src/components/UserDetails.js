import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';

import Colors from '../constants/Colors';

const UserDetails = ({userEmail}) => {
  return (
    <View>
      <View style={styles.userDetailContainer}>
        <Avatar
          rounded
          size="large"
          overlayContainerStyle={styles.avatar}
          title={userEmail[0].toUpperCase()}
        />
        <Text style={styles.emailText}>{`By: ${userEmail}`}</Text>
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  userDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  avatar: {
    backgroundColor: Colors.accent,
  },
  emailText: {
    marginLeft: 16,
    fontSize: 14,
  },
});

export default UserDetails;
