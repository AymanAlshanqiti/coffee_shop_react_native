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

class Profile extends Component {
  static navigationOptions = {
    title: "My Profile"
  };

  render() {
    return (
      <View>
        <Text> Hi From My Profile</Text>
      </View>
    );
  }
}

export default Profile;
