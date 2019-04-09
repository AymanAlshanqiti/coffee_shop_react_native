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
  Right
} from "native-base";
import OrderRow from "./OrderRow";

export default class OrderList extends Component {
  render() {
    let orders = this.props.prevOrders;
    console.log("TCL: OrderList -> render -> orders", orders);
    if (!orders) return <Spinner />;
    let orderRows = orders.map(ord => {
      return <OrderRow key={ord.id} order={ord} />;
    });
    return (
      <View>
        <Header style={{ backgroundColor: "white" }}>
          <Left>
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>ID</Text>
          </Left>
          <Body>
            <Text style={{ fontWeight: "bold" }}>Previous Order</Text>
          </Body>
          <Right />
        </Header>
        <List>{orderRows}</List>
      </View>
    );
  }
}
