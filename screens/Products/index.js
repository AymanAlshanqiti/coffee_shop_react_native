import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Left,
  Text,
  Right,
  Badge,
  Icon,
  Body,
  Row,
  Spinner
} from "native-base";

class ProductsList extends Component {
  static navigationOptions = {
    title: "Products List"
  };

  render() {
    return (
      <View>
        <Text> Hi From Products List</Text>
      </View>
    );
  }
}

export default ProductsList;
