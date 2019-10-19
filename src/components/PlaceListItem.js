import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

const PlaceListItem = ({place, navigation}) => {
  const {title, description, price, imageUrl} = place;
  const goToPlaceDetail = () => {
    navigation.navigate('PlaceDetails', {
      place,
    });
  };

  return (
    <ListItem
      title={title}
      titleProps={{numberOfLines: 1}}
      titleStyle={{fontSize: 18}}
      subtitle={description}
      subtitleProps={{numberOfLines: 1}}
      leftAvatar={{
        source: {uri: imageUrl},
        size: 64,
        renderPlaceholderContent: <ActivityIndicator />,
        placeholderStyle: styles.avatarPlaceholder,
      }}
      badge={{
        value: `U$ ${price}`,
        status: 'success',
        badgeStyle: styles.priceContainer,
        textStyle: styles.priceText,
      }}
      bottomDivider
      chevron
      onPress={goToPlaceDetail}
    />
  );
};

const styles = StyleSheet.create({
  avatarPlaceholder: {
    backgroundColor: '#d4d4d4',
  },
  priceContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  priceText: {
    fontSize: 14,
  },
});

export default PlaceListItem;
