import React, { Component } from "react";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right
} from "native-base";

import styles from "./styles";
export default class OrderDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Order Detail"
    };
  };

  render() {
    let nav = this.props.navigation;
    console.log("TCL: render -> nav", nav);

    let {
      orderProducts,
      orderDate,
      totalPrice
    } = this.props.navigation.state.params;

    orderProducts = orderProducts.map(prod => {
      return (
        <CardItem key={prod.id} bordered>
          <Left>
            <Text>
              <Text style={{ fontWeight: "bold" }}>{prod.quantity}x</Text>{" "}
              {prod.product.name}
            </Text>
          </Left>

          <Right>
            <Text style={{ fontWeight: "bold" }}>{prod.total_price} SAR</Text>
          </Right>
        </CardItem>
      );
    });
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem style={styles.prodInfo} bordered>
              <Text style={styles.prodRow}>{orderDate}</Text>
            </CardItem>
            {orderProducts}
            <CardItem style={styles.prodInfo} bordered>
              <Text style={styles.prodRow}>Total Price: {totalPrice} SAR</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
