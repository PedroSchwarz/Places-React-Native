import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Divider, Icon} from 'react-native-elements';
import email from 'react-native-email';

import Colors from '../constants/Colors';

const UserDetails = ({userEmail}) => {
  const handleEmail = () => {
    const to = userEmail;
    email(to, {subject: 'Contact from Places App', body: ''});
  };

  return (
    <View>
      <View style={styles.userDetailContainer}>
        <View>
          <Avatar
            size="large"
            title={userEmail[0].toUpperCase()}
            overlayContainerStyle={styles.avatar}
          />
        </View>
        <Icon
          name="comment"
          type="material"
          size={25}
          reverse
          color={Colors.success}
          onPress={handleEmail}
        />
        <Icon
          name="email"
          type="material"
          size={25}
          reverse
          color={Colors.info}
          onPress={handleEmail}
        />
      </View>
      <Text style={styles.emailText}>{`By: ${userEmail}`}</Text>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  userDetailContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: Colors.accent,
    borderRadius: 50,
  },
  emailText: {
    marginVertical: 16,
    marginLeft: 8,
    fontSize: 16,
  },
});

export default UserDetails;
