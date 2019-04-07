import React from "react";
import { Platform } from "react-native";
import { Icon } from "native-base";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import ProductsList from "../screens/Products/ProductsList";
import ProductDetail from "../screens/Products/ProductDetail";

import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

const HomeStack = createStackNavigator({
  Products: ProductsList,
  Product: ProductDetail
});

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
    Links: LinksScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#FFF"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "gray"
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

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

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
