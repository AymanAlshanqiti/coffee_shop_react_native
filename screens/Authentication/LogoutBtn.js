import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { Button, Icon } from "native-base";

// Stores
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

class LogoutBtn extends Component {
  render() {
    return (
      <Button
        transparent
        onPress={() => this.props.logout(this.props.navigation)}
      >
        <Icon
          type="MaterialCommunityIcons"
          name="logout"
          style={{ color: "#DC1B50" }}
        />
      </Button>
    );
  }
}

mapStateToProps = state => ({});

mapDispatchToProps = dispatch => ({
  logout: navigation => dispatch(actionCreators.logout(navigation))
});
export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LogoutBtn)
);
