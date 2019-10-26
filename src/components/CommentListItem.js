import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';

import Colors from '../constants/Colors';

const CommentListItem = ({message, user, createdAt}) => {
  return (
    <View style={styles.root}>
      <Avatar
        size="medium"
        title={user.userEmail[0].toUpperCase()}
        overlayContainerStyle={styles.avatar}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.secondaryContent}>
          <Text style={styles.userEmail}>{user.userEmail}</Text>
          <Text style={styles.date}>{createdAt.toString()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: Colors.accent,
    borderRadius: 50,
  },
  contentContainer: {
    marginLeft: 16,
  },
  message: {
    fontSize: 18,
    width: '95%',
  },
  secondaryContent: {
    flexWrap: 'wrap',
  },
  userEmail: {fontSize: 12, color: Colors.info},
  date: {fontSize: 12, color: Colors.info},
});

export default CommentListItem;
