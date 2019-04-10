import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

import { ScrollView, StyleSheet, View } from "react-native";
import {
  Left,
  Text,
  Right,
  Badge,
  Icon,
  Body,
  Row,
  Spinner,
  Button,
  List,
  ListItem,
  Container,
  Content
} from "native-base";

class Cart extends Component {
  static navigationOptions = {
    title: "My Cart"
  };

  componentDidMount = async () => {
    await this.props.checkForExpiredToken();
    if (this.props.user) {
      await this.props.getUserOrders();
      this.getCartStatusOrder();
    }
    if (this.props.userOrderStatusCart) {
      await this.props.getUserCart(this.props.userOrderStatusCart.id);
    }
  };

  async componentDidUpdate(prevProps) {
	console.log("TCL: Cart -> componentDidUpdate -> prevProps", prevProps)
	console.log("TCL: Cart -> componentDidUpdate -> this.props", this.props)

    
  }

  getCartStatusOrder = () => {
    const cartStatusOrder = this.props.userOrders.find(order => {
      return order.status === 1;
    });

    if (cartStatusOrder) {
      this.props.getUserCartOrder(cartStatusOrder);
    } else {
      this.props.createOrder(this.state);
    }
  };

  handleDeleteProduct = async orderProductID => {
    await this.props.deleteCartProduct(orderProductID);
    await this.props.getUserCart(this.props.userOrderStatusCart.id);
  };

  handleCheckout = async orderID => {
    if (this.props.userOrderStatusCart.order_products_count > 0) {
      await this.props.orderCheckout(orderID, { status: 2 });
      await this.props.createOrder();
      await this.props.getUserOrders();
      this.props.navigation.navigate("MyProfile");
    }
  };

  render() {
    if (this.props.userCartLoading) {
      return <Spinner />;
    }
    let cartProducts = null;
    if (this.props.userCart) {
      cartProducts = this.props.userCart.order_products.map(product => (
        <List>
          <ListItem selected>
            <Left>
              <Text> {product.product.name}</Text>
            </Left>
            <Right>
              <Button
                full
                danger
                onPress={() => this.handleDeleteProduct(product.id)}
              >
                <Text>Delete</Text>
              </Button>
            </Right>
          </ListItem>
        </List>
      ));
    }
    return (
      <Container>
        <Content>
          {cartProducts}
          <Button
            full
            danger
            onPress={() => this.handleCheckout(this.props.userCart.id)}
          >
            <Text>Checkout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.profileReducer.user,
    userLoading: state.profileReducer.userLoading,

    userOrders: state.profileReducer.userOrders,
    userOrdersLoading: state.profileReducer.userOrdersLoading,

    userOrderStatusCart: state.profileReducer.userOrderStatusCart,
    userOrderStatusCartLoading: state.profileReducer.userOrderStatusCartLoading,

    userCart: state.ordersReducer.userCart,
    userCartLoading: state.ordersReducer.userCartLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken()),
    getUserOrders: () => dispatch(actionCreators.getUserOrders()),
    createOrder: () => dispatch(actionCreators.createOrder()),
    getUserCartOrder: order => dispatch(actionCreators.getUserCartOrder(order)),
    getUserCart: orderID => dispatch(actionCreators.getUserCart(orderID)),
    deleteCartProduct: orderProductID =>
      dispatch(actionCreators.deleteCartProduct(orderProductID)),
    orderCheckout: (orderID, orderStatus) =>
      dispatch(actionCreators.orderCheckout(orderID, orderStatus))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
