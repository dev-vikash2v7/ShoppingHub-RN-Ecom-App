import {
    Text,
    TouchableOpacity,
    Modal,
    View,
  } from 'react-native';
  import React from 'react';
  import Entypo from 'react-native-vector-icons/Entypo'
  import { useNavigation } from '@react-navigation/native';
import { fontSize, height, width } from '../../../constants/theme';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
  
  const AuthScreen = () => {
  
  const navigation = useNavigation();
  
    return (
        <View style={styles.modalView}>
  
          <View style={styles.modalMain}>
    
            <TouchableOpacity 
            style={styles.btn}
            onPress={() => {navigation.navigate('LogIn')}}>
              <Text style={styles.btnText}>{"Log In"}</Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              style={[styles.btn , {marginTop:15}]}
              onPress={() => { navigation.navigate('SignUp')}}>
              <Text style={styles.btnText}>{"Create Account"}</Text>
            </TouchableOpacity>
  
          </View>
  
  
         <TouchableOpacity style={styles.crossBtn} onPress={() => { navigation.navigate('HomeTab')}}>
            <Entypo name ='circle-with-cross' size = {25} color = '#000'/>
          </TouchableOpacity>
  
        </View>
    );
  };
  
  export default AuthScreen;

const styles = ScaledSheet.create({
  modalView: {
    width: width ,
    height:height ,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent : 'center' ,
    alignItems : 'center',
  },
   modalMain: {
    width:'86%',
    height: height / 4,
    backgroundColor: '#fff',
    borderRadius : '10@ms',
    paddingHorizontal : '5@s',
    justifyContent:'center',
    alignItems:'center'
  },
  btn: {
    width: '75%',
    height: '40@vs',
    backgroundColor : 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12@ms',
    marginVertical:'10@vs'
  },
  btnText: { 
    color: "#fff",
     fontSize: fontSize.regular, 
     fontWeight: '500' 
     },

     crossBtn:{
       position : 'absolute' ,
       top : verticalScale(260) ,
       right : scale(35)
     },

});
