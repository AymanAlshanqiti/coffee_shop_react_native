import React, { Component } from "react";
import styles from "./styles";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";

import LogoutBtn from "../Authentication/LogoutBtn";

class Profile extends Component {
  static navigationOptions = {
    title: "My Profile",
    headerRight: <LogoutBtn />
  };

  componentDidMount() {
    let user = this.props.navigation.getParam("user");
    console.log("TCL: Profile -> componentDidMount -> user", user);
  }

  render() {
    let { user } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={require("./cafe.png")} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{user && user.username}</Text>
            <Text style={styles.info}>More Info</Text>
            <Text style={styles.description}>Orders</Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.handleLogout}
            >
              <Text style={{ fontWeight: "bold" }}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profileReducer.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
