import React, { useRef, useEffect, useState } from 'react';
import { View, LogBox, StyleSheet } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { Environment } from '@react-three/drei/native';
import CustomSliders from '../components/UI/CustomSlider';
import ModelSelector from '../components/UI/ModelSelector';
import Model from '../components/UI/Model';
import SideButtons from '../components/UI/SideButtons';
import { useModelContext } from '../components/ReferenceData/ModelContext';
import * as THREE from 'three';
import Chick from '../components/Model/Chick_Idle_A.glb';
import ChickBounce from '../components/Model/Chick_Bounce.glb';
import ChickEat from '../components/Model/Chick_Eat.glb';

LogBox.ignoreLogs([
  'THREE.WebGLRenderer: EXT_color_buffer_float extension not supported.',
  'EXGL: gl.pixelStorei() doesn\'t support this parameter yet!',
]);

const ParticleSystem = () => {
  const particlesRef = useRef();
  const count = 6000;

  useEffect(() => {
    const particles = particlesRef.current;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  }, []);

  useFrame(() => {
    const particles = particlesRef.current;
    const positions = particles.geometry.attributes.position.array;
    const velocities = particles.geometry.attributes.velocity.array;

    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      if (positions[i * 3 + 1] < -5) {
        positions[i * 3 + 1] = 5;
      }
    }

    particles.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial color="white" size={0.035} />
    </points>
  );
};

export default function DisplayModel({ showControls = true, style }) {
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

    if (selectedModel === Chick || ChickBounce || ChickEat) {
      if (buttonLabel === 'Play') {
        setSelectedModel(ChickBounce);
      }
    }
  };

  const handleButtonPress2 = (buttonLabel) => {
    console.log(`${buttonLabel} pressed`);
    if (selectedModel === Chick || ChickBounce || ChickEat) {
      if (buttonLabel === 'Button 1') {
        setSelectedModel(ChickEat);
      }
    }
  };

  const handleButtonPress3 = (buttonLabel) => {
    console.log(`${buttonLabel} pressed`);
    if (selectedModel === Chick || ChickBounce || ChickEat) {
      if (buttonLabel === 'Button 2') {
        setSelectedModel(Chick);
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      {showControls && <ModelSelector onChangeModel={handleModelChange} />}

      <Canvas
        gl={{ physicallyCorrectLights: true }}
        camera={{ position: [-9, 0, 16], fov: 50 }}
        style={[styles.canvas, style]}
      >
        <ambientLight intensity={brightness} />
        <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
        <directionalLight intensity={0.8} position={[-6, 2, 2]} />
        <Environment preset="park" />

        {/* Render particles first */}
        <ParticleSystem />

        {/* Render the model */}
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
          setTemp={setTemp}
          setTint={setTint}
        />
      )}
      <SideButtons
        onButtonPress={handleButtonPress2}
        onButtonPress2={handleButtonPress}
        onButtonPress3={handleButtonPress3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',

  },
  canvas: {
    flex: 1,
  },
});
