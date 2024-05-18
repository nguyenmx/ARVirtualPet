import React from 'react';
import { View, Image } from 'react-native';
import DisplayModel from './DisplayModel';

const PictureScreen = ({ route }) => {
  const { imageUri } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: imageUri }} style={{ flex: 1 }} resizeMode="cover" />
    </View>
  );
};

export default PictureScreen;