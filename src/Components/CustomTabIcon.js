import React from 'react';
import Ionicons   from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/theme';
import {  scale } from 'react-native-size-matters';


export default CustomTabIcon = ({ focused  , offIcon }) => {
    return (
    
      <Ionicons
        name ={ offIcon}
       size = {scale(30)}
       color = {focused ? Colors.primary : '#000'}
      />
    );
  };
  