import React, { Component } from "react";
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
    let user = navigation.getParam("user");
    console.log("TCL: ProductsList -> staticnavigationOptions -> user", user);

    return {
      title: "Products List",
      headerRight: user ? <LogoutBtn /> : null
    };
  };
  async componentDidMount() {
    await this.props.getAllProducts();
    let user = this.props.navigation.getParam("user");
    console.log("TCL: Profile -> componentDidMount -> user", user);
  }
  componentDidUpdate() {}

  render() {
    let { products, productsLoading } = this.props.productsReducer;
    console.log(
      "TCL: ProductsList -> render -> productsLoading",
      productsLoading
    );
    let productList;

    if (productsLoading) return <Spinner />;

    productList = products.map(prod => {
      console.log("TCL: render -> prod.image", prod.image);
      return (
        //   <ImageBackground
        //   source={{ uri: prod.image }}
        //   style={styles.background}
        // >

        // </ImageBackground>
        <View key={prod.id}>
          <View style={styles.overlay} />
          <ListItem
            button
            style={styles.listitem}

            // onPress={() =>
            //   this.props.navigation.navigate("Product", {
            //     product: ProductInfo
            //   })
            // }
          >
            <Card style={styles.transparent}>
              <CardItem key={prod.id} style={styles.transparent}>
                <Left>
                  <Thumbnail
                    bordered
                    source={{ uri: prod.image }}
                    style={styles.thumbnail}
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
  productsReducer: state.productsReducer
});

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(actionCreators.getAllProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);
