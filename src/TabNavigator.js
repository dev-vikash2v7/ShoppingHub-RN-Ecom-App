import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabIcon from './Components/CustomTabIcon';
import  ScreenNavigator  from './ScreenNavigator'
import {StyleSheet} from 'react-native'
import { fontSize } from '../constants/theme';
import { verticalScale } from 'react-native-size-matters';



function TabNavigator() {

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