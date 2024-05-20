import React, { useRef, useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { useGLTF, Environment } from '@react-three/drei/native';
import { LogBox } from 'react-native';
import CustomSliders from '../components/UI/CustomSlider';
import ModelSelector from '../components/UI/ModelSelector';
import Model from '../components/UI/Model';
import SideButtons from '../components/UI/SideButtons';
import { useModelContext } from '../components/ReferenceData/ModelContext';

import Shiba from '../components/Model/shiba.glb';
import Cubone from '../components/Model/Cubone.glb';
import Chick from '../components/Model/Chick_Idle_A.glb';
import ChickBounce from '../components/Model/Chick_Bounce.glb';
import ChickEat from '../components/Model/Chick_Eat.glb';

LogBox.ignoreLogs([
  'THREE.WebGLRenderer: EXT_color_buffer_float extension not supported.',
  'EXGL: gl.pixelStorei() doesn\'t support this parameter yet!',
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
    setRotationZ,
    brightness,
    setBrightness,
    temp,
    setTemp,
    tint,
    setTint,
    selectedModel,
    setSelectedModel,
  } = useModelContext();

  const [modelColor, setModelColor] = useState('white');

  const handleModelChange = (modelUrl) => {
    setSelectedModel(modelUrl);
  };

  const handleButtonPress = (buttonLabel) => {
    console.log(`${buttonLabel} pressed`);

    if (selectedModel === Chick || ChickBounce || ChickEat ) {
      if (buttonLabel === 'Play' && selectedModel === Chick || ChickBounce || ChickEat ) {
        setSelectedModel(ChickBounce);
      } 
    }
  };

  const handleButtonPress2 = (buttonLabel) => {
    console.log(`${buttonLabel} pressed`);
    if (selectedModel === Chick || ChickBounce || ChickEat ) {
      if (buttonLabel === 'Button 1' && selectedModel === Chick || ChickBounce || ChickEat ) {
        setSelectedModel(ChickEat);
      } 
    }
  };

  const handleButtonPress3 = (buttonLabel) => {
    console.log(`${buttonLabel} pressed`);
    if (selectedModel === Chick || ChickBounce || ChickEat ) {
      if (buttonLabel === 'Button 2' && selectedModel === Chick || ChickBounce || ChickEat ) {
        setSelectedModel(Chick);
      } 
    }
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
          <SideButtons onButtonPress={handleButtonPress2} onButtonPress2={handleButtonPress}  onButtonPress3={handleButtonPress3}  />
      </>
  );
}
