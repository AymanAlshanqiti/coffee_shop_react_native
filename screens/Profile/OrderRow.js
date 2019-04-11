import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Icon,
  Badge
} from "native-base";

import { withNavigation } from "react-navigation";

import OrderDetail from "./OrderDetail";

const formatAMPM = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12; // the hour '0' should be '12'

  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes + " " + ampm;
};

const formatTimeS = ts => {
  let date = new Date(ts);
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  // Where do we use it ? hey ayman!! we use it here!
  let datestr = day + " " + monthNames[monthIndex] + " " + year;
  let time = formatAMPM(date);

  return datestr + " | " + time;
};

class OrderRow extends Component {
  render() {
    let order = this.props.order;
    let date = formatTimeS(order.created_at);
    console.log("TCL: OrderRow -> render -> order", order);
    return (
      <ListItem
        button
        onPress={() =>
          this.props.navigation.navigate("OrderDetail", {
            orderProducts: order.order_products,
            orderDate: date,
            totalPrice: order.total_price
          })
        }
      >
        <Left>
          <Text style={{ fontWeight: "bold" }}>{order.id}</Text>
          <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
            {order.status.title}
          </Text>
        </Left>

        <Body>
          <Text style={{ marginLeft: -50 }}>{date}</Text>

          <Text note style={{ marginLeft: -40 }}>
            Total Price {order.total_price} SAR
          </Text>
        </Body>
        <Right>
          <Left>
            <Badge primary style={{ backgroundColor: "#fe687b" }}>
              <Text>{order.order_products.length}</Text>
            </Badge>
          </Left>

          <Body />

          <Right />
        </Right>
      </ListItem>
    );
  }
}

export default withNavigation(OrderRow);
