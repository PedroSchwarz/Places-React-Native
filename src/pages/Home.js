import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import PlaceListItem from '../components/PlaceListItem';
import EmptyListContent from '../components/EmptyListContent';
import FloatingActionButton from '../components/FloatingActionButton';

import {PlacesContext} from '../contexts/PlacesContext';
import {PlacesDispatchContext} from '../contexts/PlacesContext';
import {getPlaces, getRootRef} from '../helpers/firebase/firestore';

const Home = ({navigation}) => {
  const places = useContext(PlacesContext);
  const dispatch = useContext(PlacesDispatchContext);

  useEffect(() => {
    // getPlaces().then(initialPlaces => {
    //   dispatch({type: 'INIT', initialPlaces});
    // });
    return getRootRef().onSnapshot(result => {
      const initialPlaces = [];
      result.forEach(doc => {
        initialPlaces.push({...doc.data()});
      });
      dispatch({type: 'INIT', initialPlaces});
    });
  }, []);

  const goToNewPlace = () => {
    navigation.navigate('NewPlace');
  };

  const goToPlaceDetail = item => {
    navigation.navigate('PlaceDetail', {place: item});
  };

  const buildItems = ({item}) => (
    <PlaceListItem {...item} goToPlaceDetail={goToPlaceDetail} />
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

Home.navigationOptions = {
  title: 'Places List',
};

export default Home;
