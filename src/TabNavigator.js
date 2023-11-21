import React,{useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  ScreenNavigator  from './ScreenNavigator'
import {StyleSheet} from 'react-native'
import { Colors, fontSize } from '../constants/theme';
import { verticalScale , scale } from 'react-native-size-matters';
import Ionicons   from 'react-native-vector-icons/Ionicons';


import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setAddress, setUser } from './Redux/Slices/AuthSlice';
import firestore from '@react-native-firebase/firestore';
import { setOrder } from './Redux/Slices/OrderSlice';
import { useNavigation } from '@react-navigation/native';


const CustomTabIcon = ({ focused  , offIcon }) => {
  return (
    <Ionicons
      name ={ offIcon}
     size = {scale(30)}
     color = {focused ? Colors.primary : '#000'}
    />
  );
};



function TabNavigator() {
  
  const dispatch = useDispatch();
  const nav = useNavigation()


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

async  function  onAuthStateChanged (user) {

  // console.log('App user : ' ,  user) 

  if(user && user.displayName){

    // console.log('SETTED')

    let address = []
    let orders = []

    dispatch( setUser( {
      id : user.uid ,
      name : user.displayName , 
      email : user.email,
      photo : user.photoURL ,
      emailVerified :user.emailVerified ,
      address : address,
      phone : user.phoneNumber
  }) )

    await firestore().collection('users').doc(user.uid).get()
    .then(querySnapshot =>  {
      address =  querySnapshot.data()?.address ? querySnapshot.data().address : [];
       orders =  querySnapshot.data()?.orders ? querySnapshot.data().orders : []
    });

    console.log(address)
    console.log(orders)
    
    dispatch(setOrder(orders))
    dispatch(setAddress(address))


nav.navigate('HomeTab')
    
  }

}

  const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator 
      screenOptions={{
        tabBarHideOnKeyboard:true,
     tabBarStyle : {
      height :  verticalScale(70),
      alignItems:'center',
     }
      }} 
      >

      <Tab.Screen
        name="HomeTab"
        component={ScreenNavigator}
        initialParams={{initialRoute : 'Home'}}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon onIcon='home' offIcon = 'home-outline'  focused={focused} />
          ),
          headerShown:false,
          tabBarLabel : 'Home',
          tabBarLabelStyle:styles.tabBarLabel 
        }}
      />

     
      <Tab.Screen
        name="FavouriteTab"
        component={ScreenNavigator}
        initialParams={{initialRoute : 'Favourite'}}

        options={{

          tabBarIcon: ({ focused }) => (
            <CustomTabIcon onIcon='heart' offIcon = 'heart-outline' focused={focused} />
          ),
          headerShown:false,
          tabBarLabel : 'Favourite',
          tabBarLabelStyle:styles.tabBarLabel
        }}
      />

      <Tab.Screen
        name="NotificationsTab"
        component={ScreenNavigator}
        initialParams={{initialRoute : 'Notifications'}}

        options={{

          tabBarIcon: ({ focused }) => (
            <CustomTabIcon onIcon='notifications' offIcon = 'notifications-outline' focused={focused} />
          ),
          headerShown:false,
          tabBarLabel : 'Notifications',
          tabBarLabelStyle:styles.tabBarLabel

        }}
      />


      <Tab.Screen
        name="ProfileTab"
        component={ ScreenNavigator }
        initialParams={{initialRoute : 'User'}}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon onIcon='person' offIcon = 'person-outline' focused={focused} />
          ),
          headerShown:false,
          tabBarLabel : 'Account',
          tabBarLabelStyle:styles.tabBarLabel
        }}
      />
         
    </Tab.Navigator>  
    );
  }

  



export default TabNavigator 

const styles = StyleSheet.create( {
  tabBarLabel : {
    marginBottom : verticalScale(10) ,
    fontWeight:'400',
    fontSize:fontSize.small
  }
})