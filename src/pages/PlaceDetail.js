import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Divider, Image, Badge} from 'react-native-elements';

const PlaceDetail = ({navigation}) => {
  const {title, description, price, imageUrl} = navigation.getParam('place');
  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          style={styles.image}
          source={{uri: imageUrl}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.contentContainer}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{title}</Text>
            <Badge
              value={`US$ ${price}`}
              status="success"
              badgeStyle={styles.priceContainer}
              textStyle={styles.priceText}
            />
          </View>
          <Divider style={styles.headerContentDivider} />
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    height: 400,
  },
  contentContainer: {
    marginHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 24,
  },
  priceContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  priceText: {
    fontSize: 14,
  },
  headerContentDivider: {
    marginVertical: 8,
  },
  description: {
    fontSize: 20,
  },
});

PlaceDetail.navigationOptions = ({navigation}) => {
  return {
    title: `${navigation.getParam('place').title}`,
  };
};

export default PlaceDetail;
