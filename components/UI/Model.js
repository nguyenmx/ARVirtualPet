import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber/native';
import { useGLTF, Environment, useAnimations } from '@react-three/drei/native';
import { mat4 } from 'gl-matrix';
import { Accelerometer } from 'expo-sensors';
import { captureRef } from 'react-native-view-shot';

function Model({ url, onClick, rotationX, rotationY, rotationZ, brightness, temp, tint, ...rest }) {
  const { scene, animations } = useGLTF(url);
  const modelRef = useRef();
  const { ref, mixer } = useAnimations(animations, modelRef);
  const [isRotating, modelRotate] = useState(false);
  const viewRef = useRef();

  // Rotations based on the phone's gyroscope data
  useEffect(() => {
    let subscription;
    const subscribeToAccelerometer = async () => {
      subscription = Accelerometer.addListener(({ x, z }) => {
        if (modelRef.current && isRotating) {
          modelRef.current.rotation.y -= x * 0.03;
          modelRef.current.rotation.x -= z * 0.0008;
        }
      });
    };

    subscribeToAccelerometer();

    return () => {
      subscription && subscription.remove();
    };
  }, [isRotating]);

  // Play chick animations
  useEffect(() => {
    if (animations.length > 0) {
      mixer.clipAction(animations[0]).play();
    }
  }, [animations, mixer]);

  // Rotations based on current values from the slider
  useEffect(() => {
    modelRef.current.rotation.x = rotationX * 0.004;
  }, [rotationX]);

  useEffect(() => {
    modelRef.current.rotation.y = rotationY * 0.004;
  }, [rotationY]);

  useEffect(() => {
    modelRef.current.rotation.z = rotationZ * 0.004;
  }, [rotationZ]);

  // Checks if the user has tapped on the model and rotates accordingly
  const handlePointerDown = () => {
    if (isRotating) {
      modelRotate(false);
    } else {
      modelRotate(true);
      onClick && onClick();
    }
  };
  

  return (
    <primitive
      {...rest}
      object={scene}
      ref={modelRef}
      onPointerDown={handlePointerDown}
    />
  );
}

export default Model;