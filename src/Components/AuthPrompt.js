import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { fontSize } from '../../constants/theme';

const AuthPrompt = ({modelVisible , setModelVisible}) => {


const navigation = useNavigation();

  return (
      <Modal transparent visible={modelVisible}>

      <View  style={styles.modalView}>

        <View style={styles.modalMain}>
  
          <TouchableOpacity 
          style={styles.btn}
          onPress={() => {setModelVisible(false) ;navigation.navigate('LogIn')}}>
            <Text style={styles.btnText}>{"Log In"}</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.btn ]}
            onPress={() => {setModelVisible(false) ; navigation.navigate('SignUp')}}>
            <Text style={styles.btnText}>{"Create Account"}</Text>
          </TouchableOpacity>

        </View>


       <TouchableOpacity style={styles.crossBtn} onPress={() => { setModelVisible(false) }}>
          <Entypo name ='circle-with-cross' size = {scale(25)} color = '#000'/>
        </TouchableOpacity>

</View>
      </Modal>
  );
};

export default AuthPrompt

const styles = ScaledSheet.create({
  modalView: {
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height ,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent : 'center' ,
    alignItems : 'center',
  },
   modalMain: {
    width:'90%',
    height: '200@vs',
    backgroundColor: '#fff',
    borderRadius : '10@ms',
    paddingHorizontal : '5@s',
    justifyContent:'center',
    alignItems:'center'
  },
  btn: {
    width: '90%',
    height: '50@vs',
    backgroundColor : 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@ms',
    marginVertical:'10@vs'
  },
  btnText: { 
    color: "#fff",
     fontSize: fontSize.large, 
     fontWeight: '500' 
     },

     crossBtn:{
       position : 'absolute' ,
       top : '280@vs' ,
       right : '20@s'
     },

});
