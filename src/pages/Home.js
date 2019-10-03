import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Icon, ListItem } from "react-native-elements";

import { PlacesContext } from "../contexts/PlacesContext";
import Colors from "../constants/Colors";

const Home = ({ navigation }) => {
  const goToNewPlace = () => {
    navigation.navigate("NewPlace");
  };

  const places = useContext(PlacesContext);

  return (
    <View style={styles.root}>
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subtitle={`${item.description} - $${item.price} - $${item.id}`}
            bottomDivider
            chevron
          />
        )}
        keyExtractor={item => item.id}
      />
      <Icon
        containerStyle={styles.newPlaceButton}
        reverse
        raised
        name="add"
        type="material"
        color={Colors.accent}
        onPress={goToNewPlace}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  newPlaceButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    right: 0,
    marginBottom: 16,
    marginRight: 16
  }
});

Home.navigationOptions = {
  title: "Places List"
};

export default Home;
