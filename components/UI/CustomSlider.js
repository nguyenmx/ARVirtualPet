import {React, useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import SliderComponent from './SliderComponent';


const CustomSliders = ({ 
  scale, 
  rotationX, 
  rotationY, 
  rotationZ, 
  brightness,
  temp,
  tint,
  setRotationX, 
  setRotationY, 
  setRotationZ, 
  setScale,
  setBrightness,
  setTemp,
  setTint
  }) => {
  
  const adjustOptions = [
    { label: 'Adjust', values: ['Scale', 'Rotate X', 'Rotate Y', 'Rotate Z'] },
    { label: 'Light', values: ['Exposure', 'Brightness', 'Contrast', 'Highlights'] },
    { label: 'Color', values: ['Temp', 'Tint', 'Vibrance', 'Saturation'] },
  ];


  const [selectLabel, setLabel] = useState('Adjust');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [selectColor, setSelectColor] = useState('lightgrey');

  const handleOptionPress = (index, label) => {
    setSelectedOptionIndex(index);
    setLabel(label);
    // setSelectColor('cyan');
  };

  return (
    <ScrollView style={{ maxHeight: 220 }}>
    <View 
      style={{ 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: '#373A38',
        paddingVertical: 18,
        paddingHorizontal: 19
      }}
    >
      {/*three options to divide each editing feature wip, replacing with slider design for now}
      {/* <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

      <TouchableOpacity onPress={() => handleOptionPress(0, 'Adjust')}>
        <Text style={{ color: selectColor, marginHorizontal: 25, fontSize: 15, fontWeight: 'bold' }}>Adjust</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleOptionPress(1, 'Color')}>
        <Text style={{ color: selectColor, marginHorizontal: 25, fontSize: 15, fontWeight: 'bold' }}>Color</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleOptionPress(2, 'Light')}>
        <Text style={{ color: selectColor, marginHorizontal: 25, fontSize: 15, fontWeight: 'bold' }}>Light</Text>
      </TouchableOpacity>

      </View> */}

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

        {/*custom dynamic slider in wip}
        <View>
        {/* <SliderComponent
          label={selectLabel}
          value={rotationZ}
          onValueChange={setRotationZ}
          // min={-180}
          // max={180}
        />
      </View> */}

      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white' }}>{adjustOptions[1].values[2]}</Text>
        <Text style={{ color: 'white' }}>{brightness.toFixed(2)}</Text>
      </View>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={-1}
        maximumValue={1}
        value={brightness}
        onValueChange={(value) => setBrightness(value)}
      />

      {/* <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white' }}>{adjustOptions[2].values[0]}</Text>
        <Text style={{ color: 'white' }}>{temp.toFixed(2)}</Text>
      </View>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={-1}
        maximumValue={1}
        value={temp}
        // onValueChange={(value) => setTemp(value)}
      />

      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white' }}>{adjustOptions[2].values[1]}</Text>
        <Text style={{ color: 'white' }}>{tint.toFixed(2)}</Text>
      </View>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={-1}
        maximumValue={1}
        value={tint}
        // onValueChange={(value) => setTint(value)}
      /> */}
    </View>
    </ScrollView>
    
  );
};

export default CustomSliders;
