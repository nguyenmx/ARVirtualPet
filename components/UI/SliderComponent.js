// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Slider from '@react-native-community/slider';

// const SliderComponent = ({ label, value, onValueChange}) => {
//     let min = 0;
//     let max = 0;
//     if (label === 'Color' || label === 'Light') {
//       min = -100;
//       max = 100;
//     }
//     else if (label === 'Adjust') {
//       min = -180;
//       max = 180;
//     }
    
//   return (
//     <View style={styles.container}>
//       <View style={styles.sliderContainer}>
//         <Slider
//           style={{ width: '100%', height: 40 }}
//           minimumValue={min}
//           maximumValue={max}
//           value={value}
//           onValueChange={onValueChange}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//   },
//   sliderContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   label: {
//     color: 'white',
//   },
//   slider: {
//     flex: 1,
//   },
//   value: {
//     color: 'white',
//     marginRight: 10,
//   },
// });

// export default SliderComponent;