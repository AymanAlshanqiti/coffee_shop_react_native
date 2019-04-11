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

            <Text
              style={styles.createClassroomText}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              Login
            </Text>
          </Content>
        </Container>
      );
    } else if (this.props.user && this.props.userCartLoading) {
      return <Spinner />;
    }
    let cartProducts = null;
    if (this.props.userCart) {
      cartProducts = this.props.userCart.order_products.map(product => (
        <Button bordered style={styles.ClassroomsContainer}>
          <Left style={{ left: 10 }}>
            <Text style={{ color: "#fe687b", marginBottom: 5 }}>
              {product.quantity}x{" "}
              <Text style={{ color: "#fe687b" }}>{product.product.name} </Text>
            </Text>

            <Text note>
              {" "}
              Sub Total: {"    "}
              <Text note>
                {" "}
                {product.total_price} {"    "}
              </Text>
            </Text>
          </Left>
          <Button
            onPress={() => this.handleDeleteProduct(product.id)}
            style={{
              backgroundColor: "#fff"
            }}
          >
            <Icon
              name="delete"
              type="AntDesign"
              style={{
                fontSize: 18,
                left: 5,
                top: 0,
                color: "red"
              }}
            />
          </Button>

          <View style={{ right: 10 }} />
        </Button>
      ));
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {cartProducts}
        </ScrollView>
        <Button
          full
          danger
          onPress={this.handleCheckout}
          style={styles.createClassroomContainer}
        >
          <Text style={styles.createClassroomText}>Checkout</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB"
  },

  contentContainer: {
    paddingTop: 30
  },

  createClassroomText: {
    color: "#FFF",
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  createClassroomContainer: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
    height: 50,
    shadowColor: "black",
    shadowOffset: { height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fe687b"
  },
  ClassroomsContainer: {
    position: "relative",
    top: 0,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 70,
    shadowColor: "black",
    shadowOffset: { height: -1 },
    shadowOpacity: 0.05,
    borderRadius: 8,
    borderColor: "#F9F9F9",
    shadowRadius: 3,
    alignItems: "center",
    backgroundColor: "#FFF"
  }
});

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
