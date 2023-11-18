import React,{useEffect, useState} from 'react'
import {View, Text, Pressable, Alert , Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import {useDispatch, useSelector} from 'react-redux'
import { removeUser } from '../Redux/Slices/AuthSlice';
import Container from '../Components/Container';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Colors, fontSize, height } from '../../constants/theme';
import Label from '../Components/Label';
import AvatarImage from '../Components/AvatarImage';
import AuthScreen from '../Screens/AuthScreens/AuthScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';



export default function User({navigation}){

  const user = useSelector( state => state.auth.user) 
  const dispatch = useDispatch();

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '950826209833-pik3ai6qkge4k1o9grc01jrjjf5ft52v.apps.googleusercontent.com',
    });
  },[])

  const handleLogOut =()=>{

    Alert.alert(
      'Logout Confirmation' ,
       'Are you sure want to logout ?',
       [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress:async () => {
            await GoogleSignin.signOut().then( async()=>{
              await auth().signOut().then(() =>{
                dispatch(removeUser())
                navigation.navigate('LogIn') 
              });
            });
          },
        },
      ],
      { cancelable: false }
       )

  }

  const ItemCard = ({item}) => {
    const {label, icon,isNew,route} = item;
    return (
      <Pressable onPress={() =>{
        route=="LogOut"?  handleLogOut() :
         navigation.navigate(route) 
        }} style={styles.itemContainer}>

        <Pressable  style={styles.iconContainer}>
          <Feather name={icon} size={scale(22)}color={Colors.black}  />
        </Pressable>
        
        <View style={styles.itemInnerContainer}>
          <Label text={label} />
          {/* {isNew&&<View style={{paddingHorizontal:scale(10), backgroundColor:appColors.red, padding:scale(5), borderRadius:scale(4)}}>
             <Label text="New" style={{fontSize:scale(10), color:Colors.white}} /> 
          </View>} */}
          <Feather name={"chevron-right"} size={scale(18)} />
        </View>
      </Pressable>
    );
  };


  return (
user ?


<Container>
 {/* <View>
    <FontAwesome name =  'user-circle-o'   size = {50} style = {styles.profileIcon} />
    <Text style={styles.name}>{user.name}</Text>
      <Text style={[styles.name, {fontSize: 16, marginTop: 0}]}>{user.email} </Text>
</View> */}
        <View style={{paddingVertical:scale(20), flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
        {/* {console.log(user.photo)} */}

            <AvatarImage  size={scale(70)}  source={user.photo } />

            <View style={{marginLeft:scale(20)}}> 
                <Label text={user?.name} style={{fontSize:scale(28)}} />
                <Label text={user?.email} style={{fontSize:scale(12)}} />

                <View>
                <Label text={'Email Verified : '} style={{fontSize:scale(12)}} />
               
               <Text> {
                  user.emailVerified ? '*' : 'x'
                }</Text>
                </View>
            </View>
        </View>


    {/* <View style = {{marginTop: 5 , marginBottom : 10}}> */}
      <ItemCard item = {{label : 'Edit Profile'  , icon : 'edit-3' , route : 'EditProfile'}} />
      <ItemCard item = {{label : 'Shipping Address'  , icon : 'map-pin' , route : 'Addresses'}} />
      <ItemCard item = {{label : 'Order History'  , icon : 'clock' , route : 'Orders'}} />
      {/* <ItemCard item = {{label : 'Manage Payment'  , icon : 'credit-card' , route : 'Order'}} /> */}
      <ItemCard item = {{label : "Log Out"  , icon : 'log-out' ,route : 'LogOut'}} />      
      
    
    </Container>

    : 
    <AuthScreen/>
  )
}

const styles = ScaledSheet.create({
  profileIcon : {
    alignSelf : 'center' ,
     marginTop : '20@vs',
     color : '#0786DAFD'
  },
  name: {
    alignSelf: 'center',
    marginTop: '10@vs',
    fontSize: fontSize.regular,
    fontWeight: '600',
    color: '#000',
  },
  tab: {
    width: '90%',
    marginTop: '10@vs',
    height: height / 8 ,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    paddingLeft: '20@s',
    justifyContent: 'center',
  },
  txt: {
    color: '#000',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: scale(15),
  },
  itemInnerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    borderRadius: scale(5),
    padding: scale(10),
    marginRight: scale(20),
    backgroundColor: Colors.lightGreen,
  },
})