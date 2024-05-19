import React from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';
import Model from '../components/UI/Model';
import { useModelContext } from '../components/ReferenceData/ModelContext';
import { useGLTF, Environment,useAnimations } from '@react-three/drei/native';
import { useFrame, Canvas } from '@react-three/fiber/native';
import DisplayModel from './DisplayModel';


const PictureScreen = ({ route }) => {
  const {
    scale,
    rotationX,
    rotationY,
    rotationZ,
    temp,
    tint,
    brightness,
    selectedModel,

  } = useModelContext();

  const { imageUri } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={{ uri: imageUri }} style={styles.backgroundImage}>
        <DisplayModel showControls= {false}/>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default PictureScreen;