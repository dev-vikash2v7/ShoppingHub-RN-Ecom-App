import { View, Text  , FlatList   , Image  , Pressable , TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import { addItemToCartList , reduceItemFromCartList } from '../Redux/Slices/CartListSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome' 
import { fontSize } from '../../constants/theme';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';



const DisplayProducts = ({products   , isCart }) => {

const nav = useNavigation();
const dispatch = useDispatch();


  return ( 
    <View style ={{marginBottom:verticalScale(70)}}>
    <FlatList

        data={products}
        renderItem={({item, index}) => {
          return (  
            <View >

            <Pressable
              key = {index}
              onPress={()=>nav.navigate('ProductDetail' , {data:item})}
              style={styles.productItem}  
              > 

              <View style = {styles.imgBox}>
              <Image source={{ uri: item.image}} style = {styles.itemImage} />
              </View>

              <View style = {styles.detailBox}>

                <Text style={styles.name}>
                  {/* {item.title.length 
                    ? item.title.substring(0, 25) + '...'
                    : item.title} */}
                    {item.title}
                </Text>

                <Text style={styles.desc}>
                  {item.description.length > 100
                    ? item.description.substring(0, 100) + '...'
                    : item.description}
                </Text>


                 <View style={styles.priceBox}>  

               { isCart && <Text style = {[  { color : '#000' , fontWeight : '500' , marginLeft:scale(-5) , fontSize:fontSize.regular} ] }>   Total :  </Text>}

                <View style={styles.priceView}> 
                 <FontAwesome name = 'rupee' size = {14} color ='green' />
                <Text style={styles.price}>{item.price * item.qty} </Text>

                 </View>
              </View>

              </View> 

            </Pressable>


{isCart && 
<View style={styles.cartView} >
         
         <TouchableOpacity style={styles.cartBtn} onPress={()=> dispatch(addItemToCartList({item})  )  }>
           <Text style = {{fontSize : fontSize.regular , fontWeight : '600' , color : 'green' }} > + </Text>
         </TouchableOpacity>
  
           <Text style={styles.itemQty}> {item.qty} </Text>
  
         <TouchableOpacity style={styles.cartBtn} onPress={()=> dispatch(reduceItemFromCartList({item})  )  }>
         <Text style = {{fontSize : fontSize.regular , fontWeight : '600' , color : 'red' }}> - </Text>
         </TouchableOpacity>

       </View>
        }
            </View>
          );
        }}
      />

  </View>
  )

}

export default DisplayProducts;

const styles = ScaledSheet.create({
      productItem: {
      // height: '140@vs',
      // height: Dimensions.get('window').height / 5 ,
      height :'auto',
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth : 1,
      borderBottomColor:'gray', 
      width : '100%',
      paddingVertical : '10@vs'
    },
    imgBox : {
      marginLeft :'4@s',
      marginRight:'2@s'
    },
    itemImage: {
      width: '80@s',
      height: '80@vs',
      resizeMode :'center',
    },
    name: {
      fontSize: fontSize.regular,
      fontWeight: '600',
      color : '#000',
      fontFamily:'FontAwesome',
      marginBottom:'1@vs'
    },
    desc: {
      fontSize: fontSize.small,
      fontWeight: '300',
      color : '#000'
    },
    priceBox: {
      flexDirection : 'row',
      alignItems : 'center',
      marginTop: '5@vs',

    },
    priceView:{
flexDirection:'row',
alignItems:'center',

    },
    price: {
      color: 'green',
      fontSize: fontSize.regular,
      fontWeight: '500',
      marginLeft:'1@s'
    },
    cartView:{
      position : 'absolute',
      bottom : '10@vs' ,
      right : '25@s',
      flexDirection:'row',
      alignItems:'center',
      justifyContent : 'center' ,
    } ,
    cartBtn:{
      padding:'2@ms' ,
      borderWidth : 0.5,
      width:'30@s',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:'10@ms',
      backgroundColor : '#fff'
    },
    itemQty:{
      color : 'blue'
    },
    detailBox:{ 
      width:'72%',
      marginLeft:'2@s'
    }
  })