import AppNavigator from './src/AppNavigator'
import { Provider } from 'react-redux'
import  ReduxStore  from './src/Redux/ReduxStore'
import { SafeAreaView } from 'react-native';
import React,{useEffect , useState} from 'react'
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import CardPayment from './src/Screens/CheckoutScreens/CardPayment';



const App = () => {

  const [fontLoading,setFontLoading]=useState(true);

 
  SplashScreen.preventAutoHideAsync();
  
  useEffect(()=>{
    async function loadFonts(){
      await Font.loadAsync({
        'FontAwesome': require("./node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf"),
        'Entypo': require("./node_modules/react-native-vector-icons/Fonts/Entypo.ttf"),
        'Ionicons': require("./node_modules/react-native-vector-icons/Fonts/Ionicons.ttf"),
        'MaterialCommunityIcons': require("./node_modules/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
        'Feather': require("./node_modules/react-native-vector-icons/Fonts/Feather.ttf"),
      }).then(res=>{
        setFontLoading(true);
        SplashScreen.hideAsync();
      }).catch(Err=>{
        console.log(Err);
      }); 
    }
    loadFonts();
  },[])



  return (
    
  fontLoading &&
  <SafeAreaView style = {{flex : 1 }} > 
    <Provider store={ReduxStore}>
<AppNavigator/>    
    </Provider>
    </SafeAreaView>
  
  )
}

export default App

