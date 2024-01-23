import  ProductDetail  from './Screens/ProductDetail';
import CartList  from './Screens/CartList';
import  SignUpScreen from './Screens/AuthScreens/SignUpScreen';
import LogInScreen  from './Screens/AuthScreens/LogInScreen';
import Header from './Components/Header';

import  Home from './Tabs/Home'
import  User from './Tabs/User'
import  Notifications from './Tabs/Notifications'

import AddAddress from './Screens/AddAddress';
import Addresses from './Screens/Addresses';
import OrderSuccess from './Screens/OrderSuccess';
import Orders from './Screens/Orders';
import CardPayment from './Screens/CheckoutScreens/CardPayment';
import OrderDetails from './Screens/OrderDetails';
import EditProfile from './Screens/EditProfile';
import AuthScreen from './Screens/AuthScreens/AuthScreen';

import  Favourite from './Tabs/Favourite'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PaymentOptions from './Screens/CheckoutScreens/PaymentOptions';

export default  function ScreenNavigator({ route }){
     const Stack = createNativeStackNavigator()

  const { initialRoute } = route.params;
  
  return(
    <Stack.Navigator  initialRouteName={initialRoute} > 
  
    <Stack.Screen 
    name='Home' 
    component={Home} 
     options={{
     header: () => <Header title  ='Shopping Hub'    leftIcon='menu' rightIcon='cart' />
      }}
     />
     
    <Stack.Screen 
    name='ProductDetail' 
    component={ProductDetail} 
     options={{     header: () => <Header title  ='Product Details'    leftIcon='arrow-back' rightIcon='cart' />
}}
     />
   
     <Stack.Screen 
    name='Addresses' 
    component={Addresses} 
     options={{       header: () => <Header title  ='All Address'   leftIcon='arrow-back' />
  }}
     />
     
     <Stack.Screen 
    name='AddAddress' 
    component={AddAddress} 
     options={{       header: () => <Header title  ='Add Address'   leftIcon='arrow-back' />
  }}
     />
     
     
  
     <Stack.Screen 
    name='Favourite' 
    component={Favourite} 
     options={{   header  :()=> <Header title  ='Favourite List'    leftIcon='menu' rightIcon='cart' />
}}
     /> 
     
     <Stack.Screen 
    name='Notifications' 
    component={Notifications} 
     options={{  header : ()=>  <Header title  = {'Notifications'}    leftIcon='menu' rightIcon='cart'/>
}}
     />
     <Stack.Screen 
    name='User' 
    component={User} 
     options={{  header : ()=>     <Header leftIcon='menu'  title= {'Profile'} />
}}
     />

    <Stack.Screen 
    name='Cart' 
    component={CartList} 
     options={{     header: () => <Header title  ='Cart Items'    leftIcon='arrow-back' />  }} 
/> 

    <Stack.Screen 
    name='OrderSuccess' 
    component={OrderSuccess} 
     options={{   header: () => <Header title  ='Order Success'    />
}} 
/> 

    <Stack.Screen 
    name='Orders' 
    component={Orders} 
     options={{   
            header: () => <Header title  ='Manage Orders'    leftIcon='arrow-back'  rightIcon='cart'/>
}}  /> 

    <Stack.Screen 
    name='OrderDetails' 
    component={OrderDetails} 
     options={{   
            header: () => <Header title  ='Order Details'    leftIcon='arrow-back'  rightIcon='cart' />
}}  /> 

    <Stack.Screen 
    name='EditProfile' 
    component={EditProfile} 
     options={{   
            header: () => <Header title  ='Edit Profile'    leftIcon='arrow-back'  rightIcon='cart' />
}}  /> 


     <Stack.Screen 
     name="PaymentOptions" 
     component={PaymentOptions} 
     options={{   header: () => null  }}
          />

     <Stack.Screen 
     name="CardPayment" 
     component={CardPayment} 
     options={{   header: () => null  }}
          />
     
    
    <Stack.Screen 
    name='SignUp' 
    component={SignUpScreen} 
     options={{  header: () => null}}
     /> 
     
     <Stack.Screen 
    name='LogIn' 
    component={LogInScreen} 
     options={{header: () => null}}
     />
     <Stack.Screen 
    name='AuthScreen' 
    component={AuthScreen} 
     options={{header: () => null}}
     />

  </Stack.Navigator>
  )
  }
  
  


  