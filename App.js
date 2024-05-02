import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ARCamera from './screens/ARCamera';
import DisplayModel from './screens/DisplayModel';

const Stack = createStackNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  
  const goToModelScreen = () => {
    navigation.navigate('DisplayModel');
  };

  const goToARCameraScreen = () => {
    navigation.navigate('ARCamera');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goToModelScreen}>
        <Text style={styles.buttonText}>3D Model</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToARCameraScreen}>
        <Text style={styles.buttonText}>AR Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTransparent: true, title: '' }}
        />
        <Stack.Screen name="DisplayModel" component={DisplayModel} options={{ headerShown: false }}/>
        <Stack.Screen name="ARCamera" component={ARCamera} options = {{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});