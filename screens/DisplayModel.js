import React, { useRef,useEffect } from 'react';
import { useFrame, Canvas } from '@react-three/fiber/native';
import { useGLTF, Environment,useAnimations } from '@react-three/drei/native';
import { mat4, vec3 } from 'gl-matrix';
import Shiba from '../components/Model/shiba.glb';
import Chick from '../components/Model/Chick_Idle_A.glb'
import {PanResponder} from 'react-native';

function Model({ url, ...rest }) {
  const { scene, animations } = useGLTF(url);
  const modelRef = useRef();
  const { ref, mixer, names } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (animations.length > 0) {
      mixer.clipAction(animations[0], ref.current).play(); // Ensure the first animation plays
    }
  }, [animations, mixer, ref]);

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

      <Model
        url={Chick}
        scale={2}
        position={[2, 0, 0]} // Move the Chick model 5 units to the right along the x-axis
      />

    </Canvas>
  );
}