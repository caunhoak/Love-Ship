// StartScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const StartScreen = ({ navigation }) => {
  const handleSignUp = () => {
    // Chuyển đến màn hình đăng ký
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    // Chuyển đến màn hình đăng nhập
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 20,
  },
});

export default StartScreen;