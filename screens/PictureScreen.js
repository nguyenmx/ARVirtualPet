import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

// Render a screenshot onto the screen
const PictureScreen = ({ route }) => {
  const { imageUri } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: imageUri }} style={styles.backgroundImage} resizeMode="cover">
      </Image>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PictureScreen;
