import {StyleSheet} from 'react-native'
import {Canvas} from '@react-three/fiber'
import Box from '../components/Box';

export default function DisplayModel() {
    return (
      <Canvas>
        <ambientLight intensity= {0.005}/>
        <spotLight intensity= {0.5} position={[-1, 1.5, 1.5]}/>
        <directionalLight color= "white" position = {[10, 10, 10]}/>
        <Box/>
      </Canvas>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });