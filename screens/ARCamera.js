import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import DisplayModel from './DisplayModel';


const ARCamera = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [focusSquare, setFocusSquare] = useState({ visible: false, x: 0, y: 0 });
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (isRefreshing) {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  const handleTouch = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setFocusSquare({ visible: true, x: locationX, y: locationY });

    setTimeout(() => {
      setFocusSquare((prevState) => ({ ...prevState, visible: false }));
    }, 1000);

    setIsRefreshing(true);
  };

  const handlePinch = (event) => {
    const scale = event.nativeEvent.scale;
    setZoom(scale);
  };

  const cameraRef = useRef(null);

  if (hasCameraPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync(null);
        const { height, width } = data;
    
        //const filteredImage = GrayScale(data); // Apply grayscale transformation
    
        console.log("Height:", height);
        console.log("Width:", width);
    
        setImage(data.uri);
    
      } catch (error) {
        console.error("Error while taking picture:", error);
      }
    }
  }

  return (
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
            autoFocus={!isRefreshing ? Camera.Constants.AutoFocus.on : Camera.Constants.AutoFocus.off}
            onTouchEnd={handleTouch}
          >
        <DisplayModel />
        </Camera>
   

          {focusSquare.visible && (
            <View
              style={[
                styles.focusSquare,
                { top: focusSquare.y - 25, left: focusSquare.x - 25 },
              ]}
            />
          )}

           <Button
            title="Flip Camera"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
        </Button>
       <Button title="Take Picture" onPress={() => takePicture()} />
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
        
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  focusSquare: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
});

export default ARCamera;