import React,{useEffect} from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator  from './TabNavigator';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/Slices/AuthSlice';
import firestore from '@react-native-firebase/firestore';
import { setOrder } from './Redux/Slices/OrderSlice';

const Drawer =createDrawerNavigator();

export default function AppNavigator() {
  
  const dispatch = useDispatch();

  async  function  onAuthStateChanged (user) {

    console.log('App user : ' ,  user) 

    if(user && user.displayName){

      console.log('SETTED')

      let address = []
      let orders = []

      await firestore().collection('users').doc(user.uid).get()
      .then(querySnapshot =>  {


        address =  querySnapshot.data()?.address ? querySnapshot.data().address : [];
         orders =  querySnapshot.data()?.orders ? querySnapshot.data().orders : []

      });

      dispatch( setUser( {
        id : user.uid ,
        name : user.displayName , 
        email : user.email,
        photo : user.photoURL ,
        emailVerified :user.emailVerified ,
        address : address,
        phone : user.phoneNumber
    }) )
    
    console.log(orders)

    dispatch(setOrder(orders))
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




