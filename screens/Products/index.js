import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { ScrollView, StyleSheet, View, ImageBackground } from "react-native";
import {
  Left,
  Text,
  Right,
  Badge,
  Icon,
  Body,
  Row,
  Spinner,
  CardItem,
  Thumbnail,
  ListItem,
  Card,
  List,
  Content
} from "native-base";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles from "./styles";

import LogoutBtn from "../Authentication/LogoutBtn";

class ProductsList extends Component {
  static navigationOptions = ({ navigation }) => {
    let user = navigation.getParam("productUser");
    console.log("TCL: ProductsList -> staticnavigationOptions -> user", user);

    return {
      title: "Products List",
      headerRight: user ? <LogoutBtn /> : null
    };
  };
  async componentDidMount() {
    await this.props.checkForToken();
    await this.props.getAllProducts();
    await AsyncStorage.getItem("token");
    if (this.props.user) {
      await this.props.getUserOrders();
      this.getCartStatusOrder();
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

  async componentDidUpdate(prevProps) {
    let prevUser = prevProps.user;
    console.log("TCL: componentDidUpdate -> prevUser", prevUser);
    if (this.props.user) {
      let currentUser = this.props.user;
      console.log("TCL: componentDidUpdate -> currentUser", currentUser);
      console.log("TCL: componentDidUpdate -> if this.props.user");
      if (cartStatusOrder) {
        this.props.getUserCartOrder(cartStatusOrder);
      } else {
        this.props.createOrder(this.state);
      }
    }
  }

  render() {
    let { products, productsLoading } = this.props.productsReducer;
    console.log(
      "TCL: ProductsList -> render -> productsLoading",
      productsLoading
    );
    let productList;

    let { user } = this.props;
    console.log("TCL: RENDER RENDER -> user", user);

    if (productsLoading) return <Spinner />;

    productList = products.map(prod => {
      console.log("TCL: render -> prod.image", prod.image);
      return (
        <View key={prod.id}>
          <View style={styles.overlay} />
          <ListItem
            button
            style={styles.listitem}
            onPress={() =>
              this.props.navigation.navigate("Product", {
                productID: prod.id
              })
            }
          >
            <Card style={styles.transparent}>
              <CardItem key={prod.id} style={styles.transparent}>
                <Left>
                  <Thumbnail
                    // bordered
                    source={{ uri: prod.image }}
                    // style={styles.thumbnail}
                  />
                  <Text style={styles.text}>
                    {prod.name}
                    <Text note style={styles.subtext}>
                      {"\n"}
                      Price: {prod.price} SAR
                    </Text>
                  </Text>
                </Left>
              </CardItem>
            </Card>
          </ListItem>
        </View>
      );
    });
    console.log("TCL: ProductsList -> render -> products", products);
    return (
      <Content>
        <List>{productList}</List>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profileReducer.user,
  productsReducer: state.productsReducer,

  userOrders: state.profileReducer.userOrders,
  userOrdersLoading: state.profileReducer.userOrdersLoading,

  userOrderStatusCart: state.profileReducer.userOrderStatusCart,
  userOrderStatusCartLoading: state.profileReducer.userOrderStatusCartLoading
});

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(actionCreators.getAllProducts()),
  checkForToken: () => dispatch(actionCreators.checkForExpiredToken()),
  getUserOrders: () => dispatch(actionCreators.getUserOrders()),
  createOrder: order => dispatch(actionCreators.createOrder(order)),
  getUserCartOrder: order => dispatch(actionCreators.getUserCartOrder(order))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);
