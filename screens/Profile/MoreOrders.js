import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Spinner,
  View,
  Left,
  Body,
  Right,
  Icon
} from "native-base";

import { withNavigation } from "react-navigation";

import { ScrollView } from "react-native";
import OrderRow from "./OrderRow";

class MoreOrders extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Previous Orders"
    };
  };
  render() {
    let ordersObj = this.props.navigation.getParam("orderRows");

    let orderList = ordersObj.map(elm => elm.props.order);

    let orderRows = orderList.map(ord => {
      return <OrderRow key={ord.id} order={ord} />;
    });

    return (
      <Container>
        <Content>
          <List>{orderRows}</List>
        </Content>
      </Container>
    );
  }
}

export default MoreOrders;
