import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    opacity: 1
  },
  subText: {
    color: "#133B53",
    fontSize: 13,
    fontWeight: "normal",
    opacity: 1
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,

    opacity: 0.5,
    backgroundColor: "black",
    height: "100%",
    width: "100%"
  },
  listitem: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    height: 180,
    flexDirection: "row"
  },
  transparent: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    flexDirection: "row"
  },
  thumbnail: {
    backgroundColor: "white",
    opacity: 1,
    width: 100,
    height: 100,
    marginLeft: -25
  },
  background: {
    width: null,
    flex: 1
    // width: "100%",
    // height: "100%"
  }
});
export default styles;
