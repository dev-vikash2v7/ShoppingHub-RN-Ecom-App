import {useSelector} from 'react-redux'
import React from 'react';
import { View , Text, ScrollView } from 'react-native';
import DisplayProducts from '../Components/DisplayProducts';
import CheckoutLayer from '../Components/CheckoutLayer';
import { Colors, fontSize } from '../../constants/theme';
import { ScaledSheet } from 'react-native-size-matters';

const CartList = () => {

  const cartList = useSelector(state => state.cartList.data);
  
  
  return (

    <ScrollView style={styles.container}>

{cartList.length ? 
<>
   <DisplayProducts products = {cartList} isCart={true}/>
    <CheckoutLayer  />
    </>
:
 <Text style = {styles.text}>Cart Is Empty..</Text>
}
  </ScrollView>
  
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.bg,
  },
  text :{
    alignSelf : 'center', 
    fontWeight:'bold' ,
     marginTop:'20@vs',
     fontSize:fontSize.large
}
});


export default CartList;