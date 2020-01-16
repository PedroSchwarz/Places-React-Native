import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import PlaceListItem from '../components/PlaceListItem';
import EmptyListContent from '../components/EmptyListContent';
import FloatingActionButton from '../components/FloatingActionButton';
import CustomHeaderButton from '../components/CustomHeaderButton';

import {PlacesContext} from '../contexts/PlacesContext';
import {PlacesDispatchContext} from '../contexts/PlacesContext';
import {getPlacesRef} from '../helpers/firebase/firestore';
import {getCurrentUser, signOutUser} from '../helpers/firebase/auth';

const Places = ({navigation}) => {
  const places = useContext(PlacesContext);
  const dispatch = useContext(PlacesDispatchContext);

  useEffect(() => {
    goToAuth();
    return getPlacesRef().onSnapshot(result => {
      const initialPlaces = [];
      result.forEach(doc => {
        initialPlaces.push({...doc.data()});
      });
      dispatch({type: 'INIT', initialPlaces});
    });
  }, []);

  const goToAuth = async () => {
    if (!getCurrentUser()) navigation.replace('Auth');
    else return;
  };

  const goToNewPlace = () => {
    navigation.navigate('NewPlace');
  };

  const buildItems = ({item}) => (
    <PlaceListItem place={item} navigation={navigation} />
  );

  return (
    <View style={styles.root}>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyListContent />}
        renderItem={buildItems}
      />
      <FloatingActionButton
        iconName="add"
        iconType="material"
        onPress={goToNewPlace}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

Places.navigationOptions = ({navigation}) => {
  const signOut = async () => {
    await signOutUser();
    navigation.replace('Auth');
  };

  return {
    title: 'Places AppCenter version',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Sign Out" iconName="exit-to-app" onPress={signOut} />
      </HeaderButtons>
    ),
  };
};

export default Places;
