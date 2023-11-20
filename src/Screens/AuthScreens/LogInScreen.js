import React, { useState   ,useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView
} from 'react-native';

import Checkbox from "expo-checkbox"
import { useDispatch } from 'react-redux';
import { useNavigation  } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';

import { setUser } from '../../Redux/Slices/AuthSlice';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Colors, fontSize } from '../../../constants/theme';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import GoogleButton from '../../Components/GoogleButton';

import  auth from '@react-native-firebase/auth';
import LoadingButton from '../../Components/LoadingButton';
// import { FacebookButton } from '../../Components/FacebookButton';



export default LogInScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch();



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 

  const [loading , setLoading] = useState(false);
    const [showBtn , setShowBtn] = useState(false);


    useEffect( ()=>{

        if (!email || !password) {
            setShowBtn(false)
          }
          else{
                setShowBtn(true)
          }

    },[email , password])


  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    return () =>
    navigation.getParent()?.setOptions({ 
        tabBarStyle: { 
          height : verticalScale(80),
          alignItems:'center',
        }, 
        tabBarVisible: true 
      });
}, [navigation]);

  
 

  const handleLogin = async () => {
    setErrorMessage('')

    setLoading(true)
    setShowBtn(false)
   
    await  auth().signInWithEmailAndPassword( email, password)
      .then(() => {

        setTimeout(() => {
            navigation.replace('Home')
        
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error.message)
         
        switch (errorCode) {
            
            case 'auth/invalid-login':
                setErrorMessage('Invalid Login Credentials !!' )
                break;
            case 'auth/invalid-email':
                setErrorMessage('Email address is not valid !!' )
                break;
            case 'auth/user-disabled':
                setErrorMessage('User corresponding to the given email has been disabled !!' )
                break;
            case 'auth/user-not-found':
                setErrorMessage('There is no user corresponding to the given email !!' )
                break;
            case 'auth/wrong-password':
                setErrorMessage('Password is invalid for the given email, or the account corresponding to the email does not have a password set !!' )
                break;
            default:
                setErrorMessage('Internet Connection is Too Weak !!' )
                console.log(error)
                break;
        }
      });
    setLoading(false)
    setShowBtn(true)

  };



  return (
    <ScrollView style={styles.container}>
            <View style={{ marginHorizontal: 12 ,  }}>

                <View style={{ marginVertical: 12 }}>

                    <Text style={{ 
                        fontSize: fontSize.large,
                        fontWeight: 'bold',
                        marginVertical: verticalScale(22),
                        color: Colors.black
                    }}>
                        Hi Welcome Back ! 👋
                        </Text>

                    <Text style={{
                        fontSize: 16,
                        color: Colors.black
                    }}>Hello again you have been missed!
                    
                    </Text>
                </View>

                

               <View style={{ marginBottom: verticalScale(12) }}>

                    <Text style={styles.text_label}>Email address</Text>

                    <View style={styles.input_box}>
                            <FontAwesome name="envelope-o" color={Colors.black} size={scale(16)} />

                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={Colors.black}
                            keyboardType='email-address'
                            style={styles.input}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{ marginBottom: verticalScale(12) }}>
                    <Text style={styles.text_label}>Password</Text>

                    <View style={styles.input_box}>

                    <FontAwesome name="key" color={Colors.black} size={scale(16)} />

                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={Colors.black}
                            secureTextEntry={isPasswordShown}
                            style={styles.input}
                            onChangeText={text => setPassword(text)}
                            value={password}
                        
                        />

                       <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: scale(12)
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={scale(24)} color={Colors.black} />
                                ) : (
                                    <Ionicons name="eye" size={scale(24)} color={Colors.black} />
                                )
                            }
                        </TouchableOpacity> 


                    </View>
                </View>

  

                <View style={{
                    flexDirection: 'row',
                    marginVertical: verticalScale(5)
                }}>
                    <Checkbox
                        style={{ marginRight: scale(8) }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? Colors.secondary : undefined}
                    />

                    <Text style={{color:'#000'}}>Remenber Me</Text>
                </View>

                 {errorMessage &&
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                }
                    


                    <LoadingButton
                    title={"Login"}
                  bg={'blue'}
                  color={'#fff'}
                    onClick = {handleLogin}
                    width={scale(63)}
                    loading = {loading}
                    showBtn = {showBtn}
                    marginTop = {verticalScale(10)}
                />




                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: verticalScale(1),
                            backgroundColor: Colors.grey,
                            marginHorizontal: scale(10)
                        }}
                    />
                    <Text style={{ 
                        fontSize: fontSize.regular,
                        color:'#000' }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: verticalScale(1),
                            backgroundColor: Colors.grey,
                            marginHorizontal: scale(10)
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                   {/* <FacebookButton type={'LogIn'}/>*/}
                    <GoogleButton type={'LogIn'}/>                     
                </View> 



                <View style = {{justifyContent:'center' , alignItems:'center' , marginBottom:30}}>
                    <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: verticalScale(22)
                }}>
                    <Text style={{ fontSize: fontSize.regular, color: Colors.black }}>Don't have an account ? </Text>

                    <Pressable
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={{
                            fontSize: fontSize.regular,
                            color: Colors.secondary,
                            fontWeight: "bold",
                            marginLeft: scale(6)
                        }}>Register</Text>
                    </Pressable>
                    </View>

                <TouchableOpacity  onPress={()=>navigation.navigate('Home')}>
                        <Text style={{color:Colors.secondary, fontWeight : 'bold' , textDecorationLine:'underline' , fontSize:fontSize.small}} >{'Continue as a Guest->'}</Text>
                        </TouchableOpacity>
                </View>
               



            </View> 



</ScrollView>
  )
};






const styles = ScaledSheet.create({
  container:{
    flex: 1,
    padding : '10@ms',
    backgroundColor : Colors.bg,
},
  input: {
    width : '100%',
    marginLeft : '8@s',
    color:'#000',
    fontSize:fontSize.regular,
    fontWeight:'400'
  },
  errorMessage: {
    marginTop : '5@vs' ,
    color: 'red',
    marginBottom: '7@vs',
    fontWeight : 'bold',
    fontSize:fontSize.small,

  }, 
   loginText :{
    fontSize : fontSize.regular,
    alignSelf : 'center',
    marginTop:'15@vs',
    color  :  '#000',
    fontWeight : '500'

  },
  loginLink:{
    marginLeft : '4@s',
    textDecorationLine:'underline',
    color : 'blue',
  },
  text_label:{
    fontSize: fontSize.regular,
    fontWeight: '400',
    marginVertical: 8,
    color:'#000'

},
input_box:{
    width: "100%",
    height: '48@vs',
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: '8@ms',
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: '22@s',
    flexDirection:'row'
}

});

