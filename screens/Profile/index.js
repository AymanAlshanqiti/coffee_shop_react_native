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

import { Badge } from "native-base";

import LogoutBtn from "../Authentication/LogoutBtn";
import * as actionsCreator from "../../store/actions";
import { AsyncStorage } from "react-native";
import { Spinner } from "native-base";
import OrderList from "./OrderList";

class Profile extends Component {
  static navigationOptions = {
    title: "My Profile",
    headerRight: <LogoutBtn />
  };

  async componentDidMount() {
    let user = this.props.user;
    console.log("TCL: Profile -> componentDidMount -> user", user);
    let test = await AsyncStorage.getItem("token");
    console.log("App => componentDidMount => AsyncStorage: ", test);
    if (user) await this.props.getProfile();
  }

  render() {
    let { user, profile, profileLoading } = this.props.profileReducer;
    console.log("TCL: Profile -> render -> profile", profile);

    if (profileLoading) return <Spinner />;

    let prevOrders = profile.customer_orders.filter(
      ord => ord.status.title !== "Cart"
    );

    console.log("TCL: Profile -> render -> prevOrders", prevOrders);
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <Image
          style={styles.avatar}
          source={
            profile.image ? { uri: profile.image } : require("./cafe.png")
          }
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>
              {profile.customer.first_name + " " + profile.customer.last_name}
            </Text>
            <Text style={styles.description}>
              Total Orders: {prevOrders.length}
            </Text>
          </View>
        </View>
        <OrderList prevOrders={prevOrders} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profileReducer: state.profileReducer,
  user: state.profileReducer.user
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(actionsCreator.fetchProfileDetail())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
