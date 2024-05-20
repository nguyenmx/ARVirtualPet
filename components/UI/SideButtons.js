// components/UI/SideButtons.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SideButtons = ({ onButtonPress, onButtonPress2,  onButtonPress3}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onButtonPress('Button 1')}>
        <Text style={styles.buttonText}>Feed</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={() => onButtonPress3('Button 2')}>
        <Text style={styles.buttonText}>Spin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onButtonPress3('Button 3')}>
        <Text style={styles.buttonText}>Roll</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={() => onButtonPress2('Play')}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    width: 120,
    height: 43,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#CBC3E3',
    fontSize: 16,
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default SideButtons;
