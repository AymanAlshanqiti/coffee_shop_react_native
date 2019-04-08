import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Title } from "native-base";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

// Stores
import * as actionCreators from "../../store/actions";

// Styles
import styles from "./styles.js";

class Signup extends Component {
  static navigationOptions = {
    headerRight: null,
    title: "Signup"
  };

  state = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };

  render() {
    let { navigation } = this.props;
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>Registration</Text>
        <TextInput
          style={styles.authTextInput}
          autoCapitalize="none"
          placeholder="Username"
          placeholderTextColor="#A47B88"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.authTextInput}
          placeholder="First Name"
          placeholderTextColor="#A47B88"
          value={this.state.firstname}
          onChangeText={first_name => this.setState({ first_name })}
        />
        <TextInput
          style={styles.authTextInput}
          placeholder="Last Name"
          placeholderTextColor="#A47B88"
          value={this.state.lastname}
          onChangeText={last_name => this.setState({ last_name })}
        />
        <TextInput
          style={styles.authTextInput}
          placeholder="Email"
          placeholderTextColor="#A47B88"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.authTextInput}
          placeholder="Password"
          placeholderTextColor="#A47B88"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity
          style={styles.authButtonStyle}
          onPress={() => this.props.signup(this.state, navigation)}
        >
          <Text style={styles.authButtonText}>Register</Text>
        </TouchableOpacity>
        <Button
          transparent
          onPress={() => this.props.navigation.replace("Login")}
        >
          <Text style={styles.authOther}>Do you have an account? Log in!</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profileReducer.user
});

const mapDispatchToProps = dispatch => ({
  signup: (userData, navigation) =>
    dispatch(actionCreators.signup(userData, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
