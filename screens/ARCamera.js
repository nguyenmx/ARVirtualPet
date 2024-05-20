import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import DisplayModel from './DisplayModel';
import CustomButton from '../components/UI/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useModelContext } from '../components/ReferenceData/ModelContext';
import { captureRef } from 'react-native-view-shot';


const ARCamera = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [focusSquare, setFocusSquare] = useState({ visible: false, x: 0, y: 0 });
  const [zoom, setZoom] = useState(0);
  const navigation = useNavigation();
  const { resetState } = useModelContext();
  const viewRef = useRef();

  // Checks if the camera has been given permission to access
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

  // Focus on a particular area of the camera
  const handleTouch = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setFocusSquare({ visible: true, x: locationX, y: locationY });

    setTimeout(() => {
      setFocusSquare((prevState) => ({ ...prevState, visible: false }));
    }, 1000);

    setIsRefreshing(true);
  };

  const cameraRef = useRef(null);

  if (hasCameraPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // const takePicture = async () => {
  //   if (cameraRef.current) {
  //     try {
  //       const data = await cameraRef.current.takePictureAsync(null);
  //       setImage(data.uri);
  //       navigation.navigate('PictureScreen', { imageUri: data.uri });
  //     } catch (error) {
  //       console.error("Error while taking picture:", error);
  //     }
  //   }
  // }
  
  // Navigates to the pictureScreen
  const takePicture = async () => {
    try {
      const uri = await takeScreenshot();
      navigation.navigate('PictureScreen', { imageUri: uri });
    } catch (error) {
      console.error("Error while taking picture:", error);
    }
  };

  // Takes a screenshot of the current screen
  const takeScreenshot = () => {
    return new Promise((resolve, reject) => {
      captureRef(viewRef, {
        format: 'png',
        quality: 1,
      }).then(
        uri => {
          console.log('Image saved to', uri);
          resolve(uri);
        },
        error => {
          console.error('Oops, snapshot failed', error);
          reject(error);
        }
      );
    });
  };
  

  const handleReset = () => {
    resetState();
  };


  return (
    <View style={styles.container} ref={viewRef}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        autoFocus={!isRefreshing ? Camera.Constants.AutoFocus.on : Camera.Constants.AutoFocus.off}
        onTouchEnd={handleTouch}
      >
      <DisplayModel showControls={true} />
        {/* {focusSquare.visible && (
            <View
              style={[
                styles.focusSquare,
                { top: focusSquare.y - 20, left: focusSquare.x - 20},
              ]}
            />
          )} */}
        </Camera>
        
    <View style = {styles.buttons}> 
      <CustomButton
        title="Flip Camera"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
        color = 'yellow'
      />

      <CustomButton
        title="Reset"
        onPress={() => handleReset()}
        color= 'white'
      />

      <CustomButton
        title="Freeze"
        onPress={() => takePicture()}
        color= 'cyan'
      />
    </View>
        
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
  buttons: {
    flexDirection: 'row',
    backgroundColor: '#373A38',
    justifyContent: 'center'
  }
});

export default ARCamera;