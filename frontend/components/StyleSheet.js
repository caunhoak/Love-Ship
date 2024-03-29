import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  wingBlank: {
    // paddingTop: "50%",
    margin: "10%",
  },
  logoContainer: {
    position: "absolute",
    top: "10%", // Đặt logo cách paddingTop là 10%
    left: 0,
    right: 0,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    fontSize: 24,
    marginBottom: "10%",
    marginTop: "10%",
    textAlign: "center",
  },
  viewInputContainer: {
    marginBottom: 10,
  },
  viewPicker: {
    flexDirection: "row",
    backgroundColor: "#C0C0C0",
    borderRadius: 30,
  },
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#C0C0C0",
  },
  textInput: {
    fontSize: 18,
    width: "100%",
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
  },
  button: {
    borderRadius: 30,
    width: "50%",
    marginLeft: "25%",
  },
  listPicker: {
    backgroundColor: "#C0C0C0",
    borderRadius: 30,
  },
});

export default styles;
