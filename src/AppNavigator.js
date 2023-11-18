import React,{useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator  from './TabNavigator';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/Slices/AuthSlice';

const Drawer =createDrawerNavigator();

export default function AppNavigator() {
  
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    console.log('App user : ' ,  user) 

    if(user && user.displayName){
      dispatch( setUser( {
        id : user.uid ,
        name : user.displayName , 
        email : user.email,
        photo : user.photoURL ,
        emailVerified :user.emailVerified ,
        address : [],
        phone : user.phoneNumber
    })) 
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (

    <NavigationContainer >
      <Drawer.Navigator>
        <Drawer.Screen name="Home Page" component={TabNavigator} options={{headerShown:false}}/>

        {/* <Drawer.Screen name="Details" component={ TabNavigator}  options={{headerShown:false}}/> */}
      </Drawer.Navigator>


    


    </NavigationContainer>
  );
}




