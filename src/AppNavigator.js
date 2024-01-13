import React,{useEffect} from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator  from './TabNavigator';

const Drawer =createDrawerNavigator();

export default function AppNavigator() {
  
 
  return (

    <NavigationContainer >
      <Drawer.Navigator>
        <Drawer.Screen name="Home Page" component={TabNavigator} options={{headerShown:false}}/>
      </Drawer.Navigator>


    


    </NavigationContainer>
  );
}




