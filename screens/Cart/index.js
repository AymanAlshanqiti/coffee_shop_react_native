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
  state = {
    userCart: null
  };
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
      this.setState({ userCart: this.props.userCart });
    }
  };

  async componentDidUpdate(prevProps) {
    if (
      prevProps.userCart.order_products.length !=
      this.props.userCart.order_products.length
    ) {
      this.setState({ userCart: this.props.userCart });
    }
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

  handleCheckout = async () => {
    if (this.state.userCart.order_products.length > 0) {
      await this.props.orderCheckout(this.state.userCart.id, { status: 2 });
      await this.props.createOrder();
      await this.props.getUserOrders();
      await this.props.getUserCartOrder(this.props.userOrderStatusCart);
      await this.props.getUserCart(this.props.userOrderStatusCart.id);
      this.props.navigation.navigate("Products");
    }
  };

  render() {
    if (!this.props.user) {
      return (
        <Container>
          <Content>
            <Text>You have to login to access the cart</Text>
            <Button
              full
              danger
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text>Login</Text>
            </Button>
          </Content>
        </Container>
      );
    } else if (this.props.user && this.props.userCartLoading) {
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
          <Button full danger onPress={this.handleCheckout}>
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
