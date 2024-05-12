import {React, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const CustomSliders = ({ scale, rotationX, rotationY, rotationZ, setRotationX, setRotationY, setRotationZ, setScale }) => {
  
  const adjustOptions = [
    { label: 'Adjust', values: ['Scale', 'Rotate X', 'Rotate Y', 'Rotate Z'] },
    { label: 'Light', values: ['Exposure', 'Brightness', 'Contrast', 'Highlights'] },
    { label: 'Color', values: ['Temp', 'Tint', 'Vibrance', 'Saturation'] },
  ];


  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [selectColor, setSelectColor] = useState('lightgrey');

  const handleOptionPress = (index) => {
    setSelectedOptionIndex(index);
    // setSelectColor('cyan');
  };

  return (
    <View 
      style={{ 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: '#373A38',
        paddingVertical: 18,
        paddingHorizontal: 15
      }}
    >
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

      <TouchableOpacity onPress={() => handleOptionPress(0)}>
        <Text style={{ color: 'cyan', marginHorizontal: 25, fontSize: 15, fontWeight: 'bold' }}>Adjust</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleOptionPress(1)}>
        <Text style={{ color: selectColor, marginHorizontal: 25, fontSize: 15, fontWeight: 'bold' }}>Color</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleOptionPress(2)}>
        <Text style={{ color: selectColor, marginHorizontal: 25, fontSize: 15, fontWeight: 'bold' }}>Light</Text>
      </TouchableOpacity>

      </View>

      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ color: 'white' }}>{adjustOptions[selectedOptionIndex].values[0]}</Text>
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
      <Text style={{ color: 'white' }}>{adjustOptions[selectedOptionIndex].values[1]}</Text>
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
      <Text style={{ color: 'white' }}>{adjustOptions[selectedOptionIndex].values[2]}</Text>
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
        <Text style={{ color: 'white' }}>{adjustOptions[selectedOptionIndex].values[3]}</Text>
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
