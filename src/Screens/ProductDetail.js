import { View, Text     , TouchableOpacity , Image  ,  ScrollView} from 'react-native'
import React,{useEffect, useState } from 'react'
import {useNavigation  } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome' 
import CustomButton from '../Components/CustomButton';
import {useDispatch, useSelector }  from 'react-redux'

import AuthPrompt from '../Components/AuthPrompt'


import { addItemToCartList } from '../Redux/Slices/CartListSlice'
import { addItemToWishList , removeItemFromWishList} from '../Redux/Slices/WishListSlice'
import { Colors, fontSize } from '../../constants/theme'
import { ScaledSheet, scale } from 'react-native-size-matters';

const ProductDetail = ({route}) => {

const user = useSelector( state => state.auth.user)
const wishList = useSelector( state => state.wishList.items)

const dispatch = useDispatch();
const navigation = useNavigation()
const item = route.params.data 

const [isLike , setIsLike] = useState(item.isLike);
const [qty , setQty] = useState(  item.qty );

const [modelVisible , setModelVisible] = useState(  false );


useEffect(()=>{
    wishList.forEach(wishList_item=> {
      if(wishList_item.id == item.id ) 
        setIsLike(true)
      })
} , [])


const handleAddToCart = () =>{
  if(user){
    dispatch(addItemToCartList(  { item : {...item , qty}} ) )
  }
  else{
    setModelVisible(true);
  }
}



const handleLike = ()=>{
   if(user){
     if(isLike)
         dispatch(removeItemFromWishList( item ) )
     else
        dispatch(addItemToWishList( item ) )

     setIsLike(!isLike)
  }
  else{
    setModelVisible(true);
  }
} 


  return (
    
  <View style={styles.container}>
  <ScrollView>

    <View style={styles.imgBox}>  
     <Image source = {{uri:item.image}} style = {styles.itemImage} />
    </View>

        <TouchableOpacity onPress={()=>{ handleLike() }} style = {styles.likeBtn}>
    <FontAwesome  name  = 'heart' color = {isLike || item.isLike  ? 'red' : 'gray' } size = {scale(25)} />
      </TouchableOpacity>

     <View style = {styles.detailBox}>

                <Text style={styles.name}>
                  {item.title}
                </Text>

                <Text style={styles.desc}>
                  {item.description}
                </Text>


              <View style={styles.priceBox}>     
                <Text style = {[ styles.price , { color : '#000' , fontWeight : '500'}] }>   Price :  </Text>
                <View style={styles.priceView}> 
                 <FontAwesome name = 'rupee' size = {14} color ='green' />
                <Text style={styles.price}>{item.price }    </Text>
                 </View>
              </View>


              <View style={styles.cartView} >
         
                <TouchableOpacity style={styles.cartBtn} onPress={()=> setQty(qty+1)  }>
                  <Text style = {{fontSize : fontSize.regular , fontWeight : '600' , color : 'green' }} > + </Text>
                </TouchableOpacity>
          
                  <Text style={styles.itemQty}> {qty} </Text>
          
                <TouchableOpacity style={styles.cartBtn} onPress={()=> qty > 0 && setQty(qty-1)   }>
                <Text style = {{fontSize :  fontSize.regular , fontWeight : '600' , color : 'red' }}> - </Text>
                </TouchableOpacity>

              </View>

      </View> 


<View style={{display:'flex' , flexDirection:'row' , justifyContent:'space-between' }}>
      <CustomButton
          bg={'#FF9A0C'}
          title={'Add To Cart'}
          color={'#fff'}
          onClick={handleAddToCart}
          width={'45%'}
          />
          
      <CustomButton
          bg={'green'}
          title={'Buy Now'}
          color={'#fff'}
          onClick={()=>{
            handleAddToCart();
            user &&  navigation.navigate('Cart')
            }}
          width={'45%'}
          />
          </View>

          {
            modelVisible && <AuthPrompt modelVisible={modelVisible} setModelVisible={setModelVisible}/>
          }
          
      </ScrollView>
   </View>


  )
}

const styles = ScaledSheet.create({
  container : {
    flex:1,
    paddingHorizontal:'20@s',
    backgroundColor : Colors.bg,
    alignItems:'center',
    paddingVertical : '20@vs'
  },
  whishListBtn: {
    position : 'absolute',
    right :'5@s',
    top : '10@vs',
    backgroundColor : '#fff' ,
    justifyContent : 'center' , 
    alignItems:'center',
    width:'50@s' ,
    height : '50@vs' , 
    borderRadius : '25@ms'
  } ,
  imgBox:{
    // width : Dimensions.get('window').width ,
    // paddingVertical : 5,
    height: '250@vs',
    justifyContent:'center',
    alignItems:'center'
  },
   itemImage: {
    width: '100%',
    height: '280@vs',
    resizeMode : 'center'
  },
  name: {
    fontSize: fontSize.regular,
    fontWeight: '600',
    marginTop : '20@vs' ,
    color : '#000'
  },
  
  desc: {
    marginTop : '10@vs' ,
    fontWeight: '500',
    textTransform : 'capitalize',
    fontSize: fontSize.small,
    color : '#000', 
  },

  priceBox: {
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : '10@vs'
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
    bottom : 0 ,
    right : '15@s',
    flexDirection:'row',
    alignItems:'center',
    justifyContent : 'center' ,
  } ,
  cartBtn:{
    borderWidth : 0.2,
    width:'25@s',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:'5@ms',
    backgroundColor : '#fff'
  },
  itemQty:{
    color : 'blue'
  },
  detailBox:{
    // paddingRight :10,
    // backgroundColor :'blue' 
  },
  likeBtn:{
    position:'absolute',
    right:'10@s',
    top:'30@vs'
  }
 
})
export default ProductDetail



// {"category": "women's clothing", "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.", "id": 20, "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg", "price": 12.99, "rating": [Object], "title": "DANVOUY Womens T Shirt Casual Cotton Short"}], "isLoading": true}