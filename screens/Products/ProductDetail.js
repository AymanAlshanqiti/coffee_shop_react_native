import React, { Component } from "react";
import { ScrollView, StyleSheet, View, TextInput } from "react-native";
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
  Content,
  Button,
  ListItem,
  List,
  Thumbnail,
  Image
} from "native-base";
import { connect } from "react-redux";

import styles from "./styles";

import * as actionCreators from "../../store/actions";

class ProductDetail extends Component {
  state = {
    order: null,
    product: null,
    quantity: 1
  };

  handleAddItem = () => {
    if (this.props.user) {
      this.props.addProductToCart(this.state);
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate("Login");
    }
  };

  async componentDidMount() {
    const productID = this.props.navigation.getParam("productID");
    await this.props.getProduct(productID);

    if (this.props.userOrderStatusCart) {
      await this.setState({
        order: this.props.userOrderStatusCart.id,
        product: this.props.productInfo.id
      });
    }
  }

  render() {
    const productID = this.props.navigation.getParam("productID");
    productInfo = this.props.productInfo;

    return (
      <Content>
        <List>
          <ListItem>
            {this.props.productInfo && (
              <Thumbnail
                bordered
                source={{ uri: productInfo.image }}
                style={{
                  height: "100%",

                  width: "100%",
                  padding: 50,
                  margin: 5
                }}
              />
            )}
          </ListItem>
          <ListItem>
            <Left>
              <Text style={styles.text}>
                {this.props.productInfo && this.props.productInfo.name + "\n"}
              </Text>
            </Left>
          </ListItem>
          <Body>
            {/* <Image
              source={{ uri: productInfo.image }}
              style={{ height: "70%", width: null, padding: 50, margin: 5 }}
              resizeMode="cover"
            /> */}

            <Text style={styles.text}>
              {this.props.productInfo &&
                this.props.productInfo.description + "\n"}
            </Text>
          </Body>
        </List>
        <List>
          <ListItem>
            <Left>
              <Text>
                Flavor :
                {this.props.productInfo && this.props.productInfo.flavor + "\n"}
              </Text>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Text>
                Process :
                {this.props.productInfo &&
                  this.props.productInfo.process + "\n"}
              </Text>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Text>
                Origin :
                {this.props.productInfo && this.props.productInfo.origin + "\n"}
              </Text>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Text>
                Price :
                {this.props.productInfo && this.props.productInfo.price + " "}
                SAR
              </Text>
            </Left>
          </ListItem>
          <TextInput
            style={styles.authTextInput}
            autoCapitalize="none"
            placeholder="1"
            type="number"
            placeholderTextColor="#A47B88"
            value={this.state.quantity}
            onChangeText={quantity => this.setState({ quantity })}
          />

          <Button full danger onPress={this.handleAddItem}>
            <Text>Add</Text>
          </Button>
        </List>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    productInfo: state.productsReducer.productInfo,
    loading: state.productsReducer.productInfoLoading,

    user: state.profileReducer.user,
    userLoading: state.profileReducer.userLoading,

    userOrderStatusCart: state.profileReducer.userOrderStatusCart,
    userOrderStatusCartLoading: state.profileReducer.userOrderStatusCartLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProduct: prodID => dispatch(actionCreators.getProductDetail(prodID)),
    addProductToCart: product =>
      dispatch(actionCreators.addProductToCart(product))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
