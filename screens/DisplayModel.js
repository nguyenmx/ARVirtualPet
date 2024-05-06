import React, { useRef } from 'react';
import { useFrame, Canvas } from '@react-three/fiber/native';
import { useGLTF, Environment } from '@react-three/drei/native';
import { mat4, vec3 } from 'gl-matrix';
import Shiba from '../components/Model/shiba.glb';
import {PanResponder} from 'react-native';

function Model({ url, ...rest }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  // useFrame(() => {
  //   if (modelRef.current) {
  //     // Rotate the model using gl-matrix
  //     const rotationMatrix = mat4.create();
  //     mat4.fromYRotation(rotationMatrix, 0.1); // Rotate around the y-axis by 0.01 radians
  //     mat4.multiply(modelRef.current.matrixWorld, modelRef.current.matrixWorld, rotationMatrix);
  //   }
  // });

  
  useFrame(() => {
    if (modelRef.current) {
      // Rotate the model
      modelRef.current.rotation.y += 0.01; // Rotate around the y-axis by 0.01 radians
    }
  });

  return <primitive {...rest} object={scene} ref={modelRef} />;
}

const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderGrant: () => {
    console.log("PanResponder granted");
    // timerRef.current = setInterval(() => {
    //   setPanningDuration(prevDuration => prevDuration + 1000);
    // }, 1000);
  },
});

export default function DisplayModel() {
  return (
    <Canvas
      {...panResponder.panHandlers}
      gl={{ physicallyCorrectLights: true }}
      camera={{ position: [-9, 0, 16], fov: 36 }}
    >
      {/* <color attach="background" args={[0xe2f4df]} /> */}
      <ambientLight />
      <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />
      <Environment preset="park" />
      <Model
        url={Shiba}
        scale={2} />
    </Canvas>
  );
}