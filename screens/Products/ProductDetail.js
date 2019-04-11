import React, { Component } from "react";
// import { ScrollView, StyleSheet, View, TextInput } from "react-native";
// import {
//   Left,
//   Text,
//   Right,
//   Badge,
//   Icon,
//   Body,
//   Row,
//   Spinner,
//   CardItem,
//   Content,
//   Button,
//   ListItem,
//   List,
//   Thumbnail,
//   Image
// } from "native-base";

import { Image, TextInput } from "react-native";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { connect } from "react-redux";
import NumericInput from "react-native-numeric-input";

import styles from "./styles";

import * as actionCreators from "../../store/actions";

class ProductDetail extends Component {
  state = {
    order: null,
    product: null,
    quantity: 1
  };

  handleAddItem = async () => {
    if (this.props.user) {
      await this.props.addProductToCart(this.state);
      await this.props.getUserOrders();
      await this.props.getUserCartOrder(this.props.userOrderStatusCart);
      await this.props.getUserCart(this.props.userOrderStatusCart.id);
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
    console.log("quantiti ======> ", this.state.quantity);

    return (
      <Container>
        <Content>
          <Card>
            <CardItem cardBody>
              {this.props.productInfo && (
                <Image
                  source={{ uri: productInfo.image }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              )}
            </CardItem>
            <CardItem header>
              <Text>
                {this.props.productInfo && this.props.productInfo.name + "\n"}
              </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {this.props.productInfo &&
                    this.props.productInfo.description + "\n"}
                </Text>
              </Body>
            </CardItem>
            <Text note>
              {" "}
              Process:{" "}
              <Text note>
                {" "}
                {this.props.productInfo &&
                  this.props.productInfo.process + "\n"}{" "}
                {"   "}
              </Text>
            </Text>

            <Text note>
              {" "}
              Flavor:{" "}
              <Text note>
                {" "}
                {this.props.productInfo &&
                  this.props.productInfo.flavor + "\n"}{" "}
                {"   "}
              </Text>
            </Text>

            <Text note>
              {" "}
              Origin:{" "}
              <Text note>
                {" "}
                {this.props.productInfo &&
                  this.props.productInfo.origin + "\n"}{" "}
                {"   "}
              </Text>
            </Text>
            <CardItem>
              <NumericInput
                onChange={quantity => this.setState({ quantity })}
                value={this.state.quantity}
                totalWidth={100}
                totalHeight={40}
                iconSize={15}
                step={1}
                valueType="real"
                initValue=""
                rounded
                textColor="gray"
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor="#fe687b"
                leftButtonBackgroundColor="#fe687b"
              />
            </CardItem>

            <Button
              full
              danger
              onPress={this.handleAddItem}
              style={{
                position: "relative",
                left: 15,
                marginRight: 30,
                marginBottom: 20,
                shadowColor: "black",
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: "#fe687b"
              }}
            >
              <Text style={styles.createClassroomText}>Checkout</Text>
            </Button>
          </Card>
        </Content>
      </Container>
      // <Content>
      //   <List>
      //     <ListItem>
      //       {this.props.productInfo && (
      //         <Thumbnail
      //           bordered
      //           source={{ uri: productInfo.image }}
      //           style={{
      //             height: "100%",
      //             width: "100%",
      //             padding: 20,
      //             margin: 5
      //           }}
      //         />
      //       )}
      //     </ListItem>
      //     <ListItem>
      //       <Left>
      //         <Text style={styles.text}>
      //           {this.props.productInfo && this.props.productInfo.name + "\n"}
      //         </Text>
      //       </Left>
      //     </ListItem>
      //     <Body>
      //       <Text style={styles.text}>
      //         {this.props.productInfo &&
      //           this.props.productInfo.description + "\n"}
      //       </Text>
      //     </Body>
      //   </List>
      //   <List>
      //     <ListItem>
      //       <Left>
      //         <Text>
      //           Flavor :
      //           {this.props.productInfo && this.props.productInfo.flavor + "\n"}
      //         </Text>
      //       </Left>
      //     </ListItem>
      //     <ListItem>
      //       <Left>
      //         <Text>
      //           Process :
      //           {this.props.productInfo &&
      //             this.props.productInfo.process + "\n"}
      //         </Text>
      //       </Left>
      //     </ListItem>
      //     <ListItem>
      //       <Left>
      //         <Text>
      //           Origin :
      //           {this.props.productInfo && this.props.productInfo.origin + "\n"}
      //         </Text>
      //       </Left>
      //     </ListItem>
      //     <ListItem>
      //       <Left>
      //         <Text>
      //           Price :
      //           {this.props.productInfo && this.props.productInfo.price + " "}
      //           SAR
      //         </Text>
      //       </Left>
      //     </ListItem>
      //     <TextInput
      //       style={styles.authTextInput}
      //       autoCapitalize="none"
      //       placeholder="1"
      //       type="number"
      //       placeholderTextColor="#A47B88"
      //       value={this.state.quantity}
      //       onChangeText={quantity => this.setState({ quantity })}
      //     />

      //     <Button full danger onPress={this.handleAddItem}>
      //       <Text>Add</Text>
      //     </Button>
      //   </List>
      // </Content>
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
      dispatch(actionCreators.addProductToCart(product)),
    getUserOrders: () => dispatch(actionCreators.getUserOrders()),
    getUserCartOrder: order => dispatch(actionCreators.getUserCartOrder(order)),
    getUserCart: orderID => dispatch(actionCreators.getUserCart(orderID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
