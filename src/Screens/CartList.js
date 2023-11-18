import {useSelector} from 'react-redux'
import React, { useEffect, useState } from 'react';
import { View , Text } from 'react-native';
import DisplayProducts from '../Components/DisplayProducts';
import CheckoutLayer from '../Components/CheckoutLayer';
import { Colors, fontSize } from '../../constants/theme';
import { ScaledSheet } from 'react-native-size-matters';

const CartList = () => {

  const cartList = useSelector(state => state.cartList.data);
  const [total , setTotal] = useState(0);


  useEffect(()=>{
    cartList.map(item => {
      setTotal( total =>  total +  (item.price * item.qty))
    })
  } , [cartList])
  
  return (
    <View style={styles.container}>

{cartList.length ? 
<>
   <DisplayProducts products = {cartList} isCart={true}/>
    <CheckoutLayer total={total} no_items={cartList.length} />
    </>
:
 <Text style = {styles.text}>Cart Is Empty..</Text>
}
  </View>
  
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.bg
  },
  text :{
    alignSelf : 'center', 
    fontWeight:'bold' ,
     marginTop:'20@vs',
     fontSize:fontSize.large
}
});


export default CartList;