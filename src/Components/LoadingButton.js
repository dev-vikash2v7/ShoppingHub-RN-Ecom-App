import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet , Dimensions, ActivityIndicator } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import {  fontSize } from '../../constants/theme'



const LoadingButton = ({loading ,showBtn,  title , onClick  , bg , color , marginTop }) => {

  return (
    <View style={[ styles.container , {marginTop  }]}>
      <TouchableOpacity
        style={[styles.button,  !showBtn ?  {  backgroundColor : 'lightgrey' } :{  backgroundColor : bg } ]}
        onPress={onClick}
        disabled={!showBtn}
      > 
        {loading ? (
          <ActivityIndicator size={scale(30)}/>
        ) : (
          <Text style = {[styles.title ,  !showBtn ?  {  color : '#000'  } :{  color }] }>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
 container:{
  alignSelf :'center'
 },
  button: {
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 40,
    height: verticalScale(53),
  },
  circle: {
    width: scale(20),
    height: scale(20),
    borderRadius: moderateScale(10),
    backgroundColor: 'red',
  },
  
  title:{
    fontWeight: '500',
    fontSize:fontSize.regular
  }
});

export default LoadingButton;
