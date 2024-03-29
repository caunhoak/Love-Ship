// AuthButton.js
import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const AuthButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AuthButton;
