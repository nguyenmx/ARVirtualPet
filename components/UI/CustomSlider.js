import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const CustomSliders = ({ scale, rotationX, rotationY, rotationZ, setRotationX, setRotationY, setRotationZ, setScale }) => {
  return (
    <View 
      style={{ 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: '#373A38',
        paddingVertical: 20,
        paddingHorizontal: 12
      }}
    >

      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white' }}>Scale</Text>
        <Text style={{ color: 'white' }}>{scale.toFixed(2)}</Text>
      </View>
      
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={15}
        value={scale}
        onValueChange={(value) => setScale(value)}
      />
      
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white' }}>Rotate X</Text>
        <Text style={{ color: 'white' }}>{rotationX.toFixed(2)}</Text>
      </View>
      
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={-180}
        maximumValue={180}
        value={rotationX}
        onValueChange={(value) => setRotationX(value)}
      />
      
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white' }}>Rotate Y</Text>
        <Text style={{ color: 'white' }}>{rotationY.toFixed(2)}</Text>
      </View>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={-180}
        maximumValue={180}
        value={rotationY}
        onValueChange={(value) => setRotationY(value)}
      />

      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white' }}>Rotate Z</Text>
        <Text style={{ color: 'white' }}>{rotationZ.toFixed(2)}</Text>
      </View>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={-180}
        maximumValue={180}
        value={rotationZ}
        onValueChange={(value) => setRotationZ(value)}
      />
    </View>
  );
};

export default CustomSliders;
