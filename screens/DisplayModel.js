import React, { useRef, useEffect, useState } from 'react';
import { useFrame, Canvas } from '@react-three/fiber/native';
import { useGLTF, Environment,useAnimations } from '@react-three/drei/native';
import { mat4, vec3 } from 'gl-matrix';
import Shiba from '../components/Model/shiba.glb';
import Cubone from '../components/Model/Cubone.glb';
import Chick from '../components/Model/Chick_Idle_A.glb'
import {PanResponder} from 'react-native';
import { LogBox } from 'react-native';
import CustomSliders from '../components/UI/CustomSlider';
import { Accelerometer } from 'expo-sensors';
import ModelSelector from '../components/UI/ModelSelector';
import Model from '../components/UI/Model';
import { useModelContext } from '../components/ReferenceData/ModelContext';

LogBox.ignoreLogs([
  'THREE.WebGLRenderer: EXT_color_buffer_float extension not supported.',
  'EXGL: gl.pixelStorei() doesn\'t support this parameter yet!'
]);

export default function DisplayModel({showControls = true}) {
  // Grab values and methods from the ReferenceData directory
  const {
    scale,
    setScale,
    rotationX,
    setRotationX,
    rotationY,
    setRotationY,
    rotationZ,
    temp,
    tint,
    setRotationZ,
    brightness,
    setBrightness,
    setTemp,
    setTint,
    selectedModel,
    setSelectedModel

  } = useModelContext();

  const handleModelChange = (modelUrl) => {
    setSelectedModel(modelUrl);
  };

  return (
    <>

    {/* Show model selector component */}

    {showControls && <ModelSelector onChangeModel={handleModelChange} />}

    {/* Create Canvas component here */}

    <Canvas
      gl={{ physicallyCorrectLights: true }}
      camera={{ position: [-9, 0, 16], fov: 50 }}
    >
      <ambientLight intensity = {brightness}/>
      <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />
      <Environment preset="park" />

    {/* Import the model component and instantiate parameters */}

      <Model
        url={selectedModel}
        scale={scale} 
        rotationX={rotationX}
        rotationY={rotationY}
        rotationZ={rotationZ}
        brightness={brightness}
        temp={temp}
        tint={tint}
        />

    </Canvas>

    {/* Render the customSlider component */}

    {showControls && (
       <CustomSliders
        scale={scale}
        rotationX={rotationX}
        rotationY={rotationY}
        rotationZ={rotationZ}
        temp={temp}
        tint={tint}
        brightness={brightness}
        setScale={setScale}
        setRotationX={setRotationX}
        setRotationY={setRotationY}
        setRotationZ={setRotationZ}
        setBrightness={setBrightness}
        setTemp={temp}
        setTint={tint}
      />
    )}
      </>
  );
}