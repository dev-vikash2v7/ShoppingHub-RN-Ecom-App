import { View, Text ,StyleSheet , Button} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome' 
import { useNavigation } from '@react-navigation/native'
import { ScaledSheet, scale } from 'react-native-size-matters'
import { fontSize } from '../../constants/theme'

const CheckoutLayer = ({total , no_items}) => {
  const nav = useNavigation()
  return (
    <View style={styles.container} >

<View style={styles.tab}> 
 
<View style={styles.priceBox}>  
   <Text style = {[  { color : '#000' , fontWeight : '500'}] }>   Total Amount :  </Text>
  <View style={styles.priceView}> 
    <FontAwesome name = 'rupee' size = {scale(14)} />
  <Text style={styles.price}>{total }    </Text>
    </View>
</View>

<View style={styles.priceBox}>  
   <Text style = {[  { color : '#000' , fontWeight : '500'}] }>   Total Items :  </Text>
  <Text style={styles.price}>{no_items}    </Text>
</View>


    </View>   

   <Button 
   style={{width:scale(50) , borderRadius:20}}
   title = {'Pay Now'}
   onPress={()=>nav.navigate('Checkout' , {total })}
   />
  
    </View>
  )
}






const styles = ScaledSheet.create({
  container:{
    alignItems: 'center',
    paddingHorizontal : '20@s',
    height  : '100@vs' ,
    width:'100%',
    // position:'absolute',
    // bottom:0,
    borderTopWidth:0.5,
    borderTopColor:'grey',
    justifyContent:'space-between',
    flexDirection:'row',
    backgroundColor:'#fff'

},
total:{
  fontWeight:'600',
  fontSize:fontSize.large,
  marginLeft:'1@s'
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