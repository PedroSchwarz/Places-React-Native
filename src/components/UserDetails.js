import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {Avatar, Divider, Icon} from 'react-native-elements';
import email from 'react-native-email';

import Comments from '../components/Comments';

import useToggleState from '../hooks/useToggleState';

import Colors from '../constants/Colors';

const UserDetails = ({userEmail, placeId}) => {
  const [show, toggleShow] = useToggleState(false);

  const handleEmail = () => {
    const to = userEmail;
    email(to, {subject: 'Contact from Places App', body: ''});
  };

  const showComments = () => {
    toggleShow();
  };

  return (
    <View>
      <View style={styles.userDetailContainer}>
        <Modal animationType="slide" transparent={false} visible={show}>
          <Comments placeId={placeId} hideModal={showComments} />
        </Modal>
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
          onPress={showComments}
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
