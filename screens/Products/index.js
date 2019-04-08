import React, { Component } from "react";
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
  CardItem,
  Thumbnail,
  ListItem,
  Card,
  ImageBackground,
  List,
  Content
} from "native-base";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles from "./styles";

class ProductsList extends Component {
  static navigationOptions = {
    title: "Products List"
  };
  async componentDidMount() {
    await this.props.getAllProducts();
  }

  render() {
    let { products, productsLoading } = this.props.productsReducer;
    console.log(
      "TCL: ProductsList -> render -> productsLoading",
      productsLoading
    );
    let productList;

    if (productsLoading) return <Spinner />;

    productList = products.map(prod => {
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
      <View>
        <List>{productList}</List>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  productsReducer: state.productsReducer
});

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(actionCreators.getAllProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);
