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

class Cart extends Component {
  static navigationOptions = {
    title: "My Cart"
  };
  render() {
    return (
      <View>
        <Text> Hi From Cart</Text>
      </View>
    );
  }
}

export default Cart;
