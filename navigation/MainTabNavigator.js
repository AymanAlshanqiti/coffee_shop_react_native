import React from "react";
import { Platform } from "react-native";
import { Icon } from "native-base";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import ProductsList from "../screens/Products";
import ProductDetail from "../screens/Products/ProductDetail";

import Cart from "../screens/Cart";
import Profile from "../screens/Profile";

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
        color: "#F12580"
      },
      headerTintColor: "#F12580"
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
    activeTintColor: "#F12580",
    inactiveTintColor: "#CCC"
  }
};

const LinksStack = createStackNavigator(
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
        color: "#F12580"
      },
      headerTintColor: "#F12580"
    }
  }
);

LinksStack.navigationOptions = {
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
    activeTintColor: "#F12580",
    inactiveTintColor: "#CCC"
  }
};

const SettingsStack = createStackNavigator(
  {
    MyProfile: Profile
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#FFF"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#F12580"
      },
      headerTintColor: "#F12580"
    }
  }
);

SettingsStack.navigationOptions = {
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
    activeTintColor: "#F12580",
    inactiveTintColor: "#CCC"
  }
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
});
