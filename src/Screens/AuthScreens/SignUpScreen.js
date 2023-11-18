import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState  , useEffect} from 'react'

import Checkbox from "expo-checkbox"

import {  useNavigation } from '@react-navigation/native';
import {useDispatch }  from 'react-redux'

// import Toast from 'react-native-toast-message';
import { Colors, fontSize } from '../../../constants/theme';
import { setUser } from '../../Redux/Slices/AuthSlice';

import Ionicons  from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoadingButton from '../../Components/LoadingButton';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';
import GoogleButton from '../../Components/GoogleButton';

const Signup = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [loading , setLoading] = useState(false);
    const [showBtn , setShowBtn] = useState(false);
    const dispatch = useDispatch();

    const navigation = useNavigation();


    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        return () =>
        navigation.getParent()?.setOptions({ 
            tabBarStyle: { 
              height : 80,
              alignItems:'center',
            }, 
            tabBarVisible: true 
          });
    }, [navigation]);






    const handleUpdateProfile = async () => {
        const user = auth().currentUser;

          await user.updateProfile({
            displayName: name,
          })
          .then(()=>{
              console.log('User profile updated successfully!');

              dispatch( setUser( {
                id : user.uid ,
                name : user.displayName , 
                email : user.email,
                photo : user.photoURL ,
                emailVerified :user.emailVerified ,
                address : [],
                phone : user.phoneNumber
            })) 

            navigation.replace('Home')
          })
          .catch ((error)=> {
          console.error('Error updating user profile:', error.message);
      });
    }


    
    const  registerUser = async (  )=>{
        setLoading(true);
        setShowBtn(false);

      await  auth().createUserWithEmailAndPassword(email, password)

        .then(async () => {
           await handleUpdateProfile();
            })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            setErrorMessage('That email address is already in use!');
            }
            else if (error.code === 'auth/invalid-email') {
                    setErrorMessage('That email address is invalid!');
                }
            else if (error.code === 'auth/weak-password') {
                    setErrorMessage(error.message);
                }
            console.log(error)
        })
            setLoading(false);
            setShowBtn(true);
      }
      

    

      useEffect(()=>{

          if ( (!name || !email || !password || !confirmPassword || !password || !isChecked) ) 
            setShowBtn(false);
          else 
           setShowBtn(true);

       } , [name , email,password , confirmPassword , isChecked])
      
        const handleSignup = async() => {
            setErrorMessage('')

          if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
          }
           await registerUser()
            // setErrorMessage('Error checking email existence: ', error);

        };

    return (
        <ScrollView style={styles.container}>

            <View style={{ flex: 1, marginHorizontal: scale(22) }}>

                <View style={  { marginTop: verticalScale(5) , marginBottom : verticalScale(10) }}>

                    <View style = {{alignItems:'center' ,justifyContent :'space-between'}}>

                    <Text style={{

                        fontSize: fontSize.extralarge,
                        fontWeight: 'bold',
                        marginVertical: verticalScale(12),
                        color: Colors.black
                    }}>
                        Create Account
                    </Text>

                    <TouchableOpacity style= {{marginLeft : scale(10) ,position :'relative' , right : 0}} onPress={()=>navigation.navigate('Home')}>
                        <Text style={{color:Colors.secondary, fontWeight : 'bold' , textDecorationLine:'underline' , fontSize:fontSize.regular }} >{'Continue as a Guest ->'} </Text>
                        </TouchableOpacity>


                    </View>

                    {/* <Text style={{
                        fontSize: 16,
                        color: Colors.black 
                    }}>Connect with your friend today!</Text> */}
                </View>


                      {/* Name Input */}
                <View style={ styles.inputBox}>
                    <Text style={styles.label_text}>Your Name</Text>

                    <View style={styles.input_view}>
                       <FontAwesome name="user-o" color={Colors.black} size={scale(16)} />

                        <TextInput
                            placeholder='Enter your name.'
                            placeholderTextColor={Colors.black}
                            style={styles.input}
                            onChangeText={text => setName(text)}
                            value={name}
                        />
                    </View>
                </View>



{/* Email input */}
                <View style={ styles.inputBox}>
                    <Text style={styles.label_text}>Email address</Text>

                    <View style={styles.input_view}>
                            <FontAwesome name="envelope-o" color={Colors.black} size={scale(16)} />

                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={Colors.black}
                            keyboardType='email-address'
                            style={styles.input}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            autoCapitalize='none'
                        />
                    </View>
                </View>

                

                <View style={ styles.inputBox}>
                    <Text style={styles.label_text}>Password</Text>

                    <View style={styles.input_view}>

                        <FontAwesome name='key' size={scale(16)} color={Colors.black}/>

                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={Colors.black}
                            secureTextEntry={isPasswordShown}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            style={styles.input}
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

                <View style={styles.inputBox}>
                    <Text style={styles.label_text}>Confirm Password</Text>

                    <View style={styles.input_view}>
                    <FontAwesome name='key' size={scale(16)} color={Colors.black}/>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={Colors.black}
                            secureTextEntry={isPasswordShown}
                            onChangeText={text => setConfirmPassword(text)}
                            value={confirmPassword}
                            style={styles.input}
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
                    marginVertical: verticalScale(6)
                }}>
                    <Checkbox
                        style={{ marginRight: scale(8) }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? Colors.secondary : undefined}
                    />

                    <Text style={{fontSize:fontSize.small}}>I aggree to the terms and conditions</Text>
                </View>

                {errorMessage &&
        <Text style={styles.errorMessage}>{errorMessage}</Text>
       }

      </View>

     

               
                <LoadingButton 
                  title="Sign Up"
                  bg={Colors.primary}
                  color={'#fff'}
                onClick = {handleSignup}
                loading={loading}
                showBtn={showBtn}
                marginTop={verticalScale(10)}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: verticalScale(20) }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: Colors.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: fontSize.small }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: Colors.grey,
                            marginHorizontal: scale(10)
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                   <GoogleButton type={'signIn'}/>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: verticalScale(22)
                }}>
                    <Text style={{ fontSize: fontSize.regular, color: Colors.black }}>Already have an account</Text>

                    <Pressable
                        onPress={() => navigation.navigate("LogIn")}
                    >
                        <Text style={{
                            fontSize: fontSize.regular,
                            color: Colors.secondary,
                            fontWeight: "bold",
                            marginLeft: scale(6)
                        }}>Login</Text>
                    </Pressable>
            </View>
            
        </ScrollView>
    )
}

export default Signup;



const styles = StyleSheet.create({
  container:{
      flex: 1,
       backgroundColor: Colors.white 
    },
label_text:{
  fontSize: fontSize.regular,
  fontWeight: '400',
  marginVertical: verticalScale(5)
}
    ,
    input: {
        width : '100%',
        marginLeft : scale(5),
      },


  inputBox: {
     marginBottom: verticalScale(8) 
  },
  errorMessage: {
    marginTop : verticalScale(5) ,
    color: 'red',
    marginBottom: verticalScale(7),
    fontWeight : 'bold'
  },
  input_view :{
    width: "100%",
    height: verticalScale(48),
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: scale(22),
    flexDirection:'row'
}
});

