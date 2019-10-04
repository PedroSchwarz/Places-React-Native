import React from 'react';
import {ActivityIndicator} from 'react-native';
import {ListItem} from 'react-native-elements';

const PlaceListItem = ({
  title,
  description,
  price,
  imageUrl,
  goToPlaceDetail,
}) => {
  return (
    <ListItem
      title={title}
      subtitle={`${description} - $${price}`}
      leftAvatar={{
        source: {uri: imageUrl},
        size: 'medium',
        renderPlaceholderContent: <ActivityIndicator />,
      }}
      bottomDivider
      chevron
      onPress={() => goToPlaceDetail({title, description, price, imageUrl})}
    />
  );
};

export default PlaceListItem;
