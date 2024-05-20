// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, color, onButtonPress, onButtonPress2, }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={[styles.buttonText, { color }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 43,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CustomButton;
