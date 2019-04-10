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
  render() {
    // let orders = this.props.navigation.state.params;
    let ordersObj = this.props.navigation.getParam("orderRows");
    // console.log("TCL: MoreOrders -> render -> orders", orders);
    let orderList = ordersObj.map(elm => elm.props.order);
    console.log("TCL: MoreOrders -> render -> orderList", orderList);

    // let orders = this.props.prevOrders;
    // console.log("TCL: MoreOrders -> render -> orders", orders);
    // if (!orders) return <Spinner />;
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

export default withNavigation(MoreOrders);
