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
  
  export default AuthScreen
  
  const styles = StyleSheet.create({
    modalView: {
      width: Dimensions.get('window').width ,
      height: Dimensions.get('window').height ,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent : 'center' ,
      alignItems : 'center',
    },
     modalMain: {
      width:'90%',
      height: 200,
      backgroundColor: '#fff',
      borderRadius : 10,
      paddingHorizontal : 5,
      justifyContent:'center',
      alignItems:'center'
    },
    btn: {
      width: '90%',
      height: 50,
      backgroundColor : 'orange',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginVertical:10
    },
    btnText: { 
      color: "#fff",
       fontSize: 18, 
       fontWeight: '500' 
       },
  
       crossBtn:{
         position : 'absolute' ,
         top : 280 ,
         right : 20
       },
  
  });
  