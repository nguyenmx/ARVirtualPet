import React, { useRef, useEffect, useState } from 'react';
import { useFrame, Canvas } from '@react-three/fiber/native';
import { useGLTF, Environment,useAnimations } from '@react-three/drei/native';
import { mat4, vec3 } from 'gl-matrix';
import Shiba from '../components/Model/shiba.glb';
import Chick from '../components/Model/Chick_Idle_A.glb'
import {PanResponder} from 'react-native';
import { LogBox } from 'react-native';
import CustomSliders from '../components/UI/CustomSlider';

LogBox.ignoreLogs([
  'THREE.WebGLRenderer: EXT_color_buffer_float extension not supported.',
  'EXGL: gl.pixelStorei() doesn\'t support this parameter yet!'
]);

function Model({ url, onClick, ...rest }) {
  const { scene, animations } = useGLTF(url);
  const modelRef = useRef();
  const { ref, mixer, names } = useAnimations(animations, modelRef);
  const [isRotating, modelRotate] = useState(false);


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
    if (modelRef.current && isRotating) {
      modelRef.current.rotation.y += 0.012;
    }
  });

  const handlePointerDown = () => {
    if (isRotating) {
      modelRotate(false);
    } 
    else {
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

export default function DisplayModel() {
  const [scale, setScale] = useState(7.5);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);


  const handleModelClick = () => {
    console.log('Model tapped!');
  };
  

  return (
    <>
    <Canvas
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
        scale={scale} 
        onClick={handleModelClick}
        />

      {/* <Model
        url={Chick}
        scale={scale}
        position={[2, 0, 0]} // Move the Chick model 5 units to the right along the x-axis
      /> */}
     

    </Canvas>

    <CustomSliders
        scale={scale}
        rotationX={rotationX}
        rotationY={rotationY}
        rotationZ={rotationZ}
        setScale={setScale}
        setRotationX={setRotationX}
        setRotationY={setRotationY}
        setRotationZ={setRotationZ}
      />
      </>
  );
}