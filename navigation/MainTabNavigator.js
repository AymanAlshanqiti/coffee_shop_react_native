import React from "react";
import { Platform } from "react-native";
import { Icon } from "native-base";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

// Components
import ProductsList from "../screens/Products";
import ProductDetail from "../screens/Products/ProductDetail";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";

// Auth Flow screens
import Login from "../screens/Authentication/Login";
import Signup from "../screens/Authentication/Signup";
import OrderDetail from "../screens/Profile/OrderDetail";
import MoreOrders from "../screens/Profile/MoreOrders";

const HomeStack = createStackNavigator(
  {
    Products: ProductsList,
    Product: ProductDetail
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#FFF"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fe687b"
      },
      headerTintColor: "#fe687b"
    }
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Products",
  tabBarIcon: ({ tintColor }) => {
    let iconName = "ios-cafe";
    let iconType = "Ionicons";
    return (
      <Icon
        name={iconName}
        type={iconType}
        style={{ color: tintColor, fontSize: 25 }}
      />
    );
  },
  tabBarOptions: {
    activeTintColor: "#fe687b",
    inactiveTintColor: "#CCC"
  }
};

const CartStack = createStackNavigator(
  {
    MyCart: Cart
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#FFF"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fe687b"
      },
      headerTintColor: "#fe687b"
    }
  }
);

CartStack.navigationOptions = {
  tabBarLabel: "Cart",
  tabBarIcon: ({ tintColor }) => {
    let iconName = "shopping";
    let iconType = "MaterialCommunityIcons";
    return (
      <Icon
        name={iconName}
        type={iconType}
        style={{ color: tintColor, fontSize: 23 }}
      />
    );
  },
  tabBarOptions: {
    activeTintColor: "#fe687b",
    inactiveTintColor: "#CCC"
  }
};

const ProfileStack = createStackNavigator(
  {
    MyProfile: Profile,
    Login: Login,
    Signup: Signup,
    OrderDetail: OrderDetail,
    MoreOrders: MoreOrders
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#FFF"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fe687b"
      },
      headerTintColor: "#fe687b"
    }
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ tintColor }) => {
    let iconName = "user-tie";
    let iconType = "FontAwesome5";
    return (
      <Icon
        name={iconName}
        type={iconType}
        style={{ color: tintColor, fontSize: 21 }}
      />
    );
  },
  tabBarOptions: {
    activeTintColor: "#fe687b",
    inactiveTintColor: "#CCC"
  }
};

export default createBottomTabNavigator({
  HomeStack,
  CartStack,
  ProfileStack
});
