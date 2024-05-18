// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, color }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={[styles.buttonText, { color }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 50,
    // backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold' // Optional: Make the text bold
  }
});

export default CustomButton;
