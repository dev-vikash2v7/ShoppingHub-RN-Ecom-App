import {
    Text
   
  } from 'react-native';
  import React from 'react';
import { Button } from 'react-native-paper';
import { fontSize } from '../../constants/theme';
import { ScaledSheet } from 'react-native-size-matters';
  

  const CustomButton = ({bg, title, onClick, color , width , fontSize }) => {
    return (
      <Button
        title= {title}
        style={[styles.btn, {backgroundColor: bg , width }]}
        onPress={() => {
          onClick();
        }}
       >
       <Text style = {{ fontSize,fontWeight: '500',color : color }}>{title}</Text>

       </Button>
    );
  };
  
  
  export default CustomButton;

  const styles = ScaledSheet.create({
    btn: {
      height: '50@vs',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: '30@vs',
      borderRadius: '10@ms',
    },
  });