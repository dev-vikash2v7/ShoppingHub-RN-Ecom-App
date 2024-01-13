import { View, Text } from 'react-native'
import React,{useState , useEffect} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome' 
import { useNavigation } from '@react-navigation/native'
import { ScaledSheet, scale } from 'react-native-size-matters'
import { Colors, fontSize } from '../../constants/theme'
import CustomButton from './CustomButton'
import { useSelector } from 'react-redux'

const CheckoutLayer = () => {
  const nav = useNavigation()
  const cartList = useSelector(state => state.cartList.data);
  const total = useSelector(state => state.cartList.total_amount);


  return (
    <View style={styles.container} >

<View style={styles.tab}> 
 
<View style={styles.priceBox}>  
   <Text style = { styles.label}>   Total Amount :  </Text>
  <View style={styles.priceView}> 
    <FontAwesome name = 'rupee' size = {scale(14)} />
  <Text style={styles.value}>{total }    </Text>
    </View>
</View>

<View style={styles.priceBox}>  
   <Text style = {styles.label }>   Total Items :  </Text>
  <Text style={styles.value}>{cartList.length }    </Text>
</View>


    </View>    

   <CustomButton 
   width={scale(100)}
    borderRadius = {20} 
   title = {'Buy Now'}
   onClick={()=>nav.navigate('Addresses' , {type :'payment' })}
   bg={Colors.primary}
   fontSize={fontSize.regular}
   color  = {'white'}
   />
    </View>
  )
}






const styles = ScaledSheet.create({
  container:{
    alignItems: 'center',
    paddingHorizontal : '20@s',
    justifyContent:'space-between',
    flexDirection:'row',
    marginBottom:'30@vs'
    
},
value:{
  fontWeight:'600',
  fontSize:fontSize.regular,
  marginLeft:'2@s'
},

label:{
   color : '#000' , 
   fontWeight : '500',
   fontSize : fontSize.regular
   },

btn:{
  backgroundColor:'#036f03',
  borderRadius:'20@ms' ,
  width:'60@s',

} ,
priceBox: {
  flexDirection : 'row',
  alignItems : 'center',
},
priceView:{
  flexDirection:'row',
  alignItems:'center',
      },
      price: {
        color: '#000',
        fontSize: fontSize.regular,
        fontWeight: '500',
        marginLeft:'1@s'
      },


});




export default CheckoutLayer