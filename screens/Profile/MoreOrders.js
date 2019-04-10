import React, { Component } from "react";
import { Container, Content, List } from "native-base";

import OrderRow from "./OrderRow";

class MoreOrders extends Component {
  static navigationOptions = () => {
    return {
      title: "Previous Orders"
    };
  };
  render() {
    let orderList = this.props.navigation.getParam("orderRows");

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
