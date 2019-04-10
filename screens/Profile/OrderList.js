import React, { Component } from "react";
import {
  Header,
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

class OrderList extends Component {
  render() {
    let orders = this.props.prevOrders;
    console.log("TCL: OrderList -> render -> orders", orders);
    if (!orders) return <Spinner />;

    let orderRows = orders.map(ord => {
      return <OrderRow key={ord.id} order={ord} />;
    });

    let isMoreOrders = orderRows.length > 3;
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
        <ScrollView>
          <List>
            {isMoreOrders ? orderRows.slice(0, 3) : orderRows}

            {isMoreOrders && (
              <ListItem
                button
                onPress={() =>
                  this.props.navigation.navigate("MoreOrders", {
                    orderRows: orders
                  })
                }
              >
                <Left>
                  <Text>More Orders</Text>
                </Left>

                <Body />

                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
          </List>
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(OrderList);
