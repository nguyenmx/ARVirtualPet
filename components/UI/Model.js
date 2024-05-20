// Model.js
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber/native';
import { useGLTF, Environment, useAnimations } from '@react-three/drei/native';
import { mat4 } from 'gl-matrix';
import { Accelerometer } from 'expo-sensors';
import * as THREE from 'three';
const textureLoader = new THREE.TextureLoader();
const newTexture = textureLoader.load('../components/Model/M_Chick_baseColor.png');

function Model({ url, onClick, rotationX, rotationY, rotationZ, brightness, temp, tint, discoLights, ...rest }) {
  const { scene, animations } = useGLTF(url);
  const modelRef = useRef();
  const { ref, mixer } = useAnimations(animations, modelRef);
  const [isRotating, modelRotate] = useState(false);

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

  useEffect(() => {
    if (animations.length > 0) {
      mixer.clipAction(animations[0]).play();
    }
  }, [animations, mixer]);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = rotationX * 0.004;
      modelRef.current.rotation.y = rotationY * 0.004;
      modelRef.current.rotation.z = rotationZ * 0.004;
    }
  }, [rotationX, rotationY, rotationZ]);

  const handlePointerDown = () => {
    if (isRotating) {
      modelRotate(false);
    } else {
      modelRotate(true);
      onClick && onClick();
    }
  };

  return (
    <>
      <primitive
        {...rest}
        object={scene}
        ref={modelRef}
        onPointerDown={handlePointerDown}
      />
      {discoLights && discoLights.map((light, index) => (
        <pointLight key={index} position={light.position} color={light.color} intensity={1} />
      ))}
    </>
  );
}

export default Model;
