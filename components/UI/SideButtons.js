// components/UI/SideButtons.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SideButtons = ({ onButtonPress, onButtonPress2,  onButtonPress3}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onButtonPress('Button 1')}>
        <Text style={styles.buttonText}>Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onButtonPress3('Button 2')}>
        <Text style={styles.buttonText}>Spin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onButtonPress3('Button 3')}>
        <Text style={styles.buttonText}>Roll</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onButtonPress2('Play')}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    top: '30%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SideButtons;
