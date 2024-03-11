// TextInputField.js
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const TextInputField = ({ placeholder, secureTextEntry, onChangeText, value, keyboardType, autoCapitalizeType }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalizeType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: '80%',
  },
});

export default TextInputField;