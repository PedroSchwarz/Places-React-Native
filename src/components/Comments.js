import React, {useEffect, useState, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Input, Icon, Button, Divider} from 'react-native-elements';

import CommentListItem from '../components/CommentListItem';
import EmptyListContent from '../components/EmptyListContent';

import {UserContext} from '../contexts/UserContext';

import useToggleState from '../hooks/useToggleState';
import useInputState from '../hooks/useInputState';

import {getCommentsRef, setComment} from '../helpers/firebase/firestore';

import Colors from '../constants/Colors';

const Comments = ({placeId, hideModal}) => {
  const [comments, setComments] = useState([]);
  const [comment, changeComment, resetComment] = useInputState('');
  const [isLoading, toggleIsLoading] = useToggleState(false);

  const {user} = useContext(UserContext);

  useEffect(() => {
    return getCommentsRef(placeId).onSnapshot(result => {
      const initialComments = [];
      result.forEach(doc => {
        if (doc.data().placeId !== placeId) return;
        initialComments.push({...doc.data()});
      });
      setComments(initialComments);
    });
  }, []);

  const handleAddComment = async () => {
    toggleIsLoading();
    await setComment({message: comment, user, placeId});
    resetComment();
    toggleIsLoading();
  };

  const renderList = ({item}) => <CommentListItem {...item} />;

  return (
    <View style={styles.root}>
      <View style={styles.commentContainer}>
        <Input
          containerStyle={styles.inputContainer}
          label="Comment"
          placeholder="Commnet here..."
          autoCapitalize="sentences"
          value={comment}
          onChangeText={changeComment}
        />
        <Icon
          name="send"
          type="material"
          size={20}
          reverse
          color={Colors.success}
          onPress={handleAddComment}
          disabled={!comment || isLoading}
        />
      </View>
      <FlatList
        data={comments}
        keyExtractor={comment => comment.id}
        renderItem={renderList}
        ListEmptyComponent={<EmptyListContent />}
        ItemSeparatorComponent={() => <Divider />}
      />
      <View style={styles.buttonContainer}>
        <Button
          icon={{
            name: 'close',
            type: 'material',
            size: 18,
            color: Colors.light,
          }}
          title="Hide Comments"
          onPress={hideModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexBasis: '80%',
  },
  buttonContainer: {position: 'absolute', bottom: 0, right: 0, left: 0},
});

export default Comments;
