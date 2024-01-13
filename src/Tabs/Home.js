import  React,{useEffect, useState }  from 'react'
import { View  , StyleSheet   , ActivityIndicator, Alert , Text} from 'react-native'
import {useDispatch} from 'react-redux'
import { addProducts } from '../Redux/Slices/ProductSlice';
import DisplayProducts from '../Components/DisplayProducts';
import SearchBar from '../Components/SearchBar';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { Colors, fontSize } from '../../constants/theme';
import { setAddress } from '../Redux/Slices/AuthSlice';
import { setOrder } from '../Redux/Slices/OrderSlice';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { emptyCart, setCartList } from '../Redux/Slices/CartListSlice';
import { ScrollView } from 'react-native-gesture-handler';



const user = auth().currentUser;

const Home = () => {
  const [products, setProducts] = useState();
  const dispatch = useDispatch();
  const[searchList , setSearchList] =  useState(null)

  const handleSearch = (searchText) => {

    if(searchText == ''){
      setSearchList(products);
    }
    else{
      const newList = products.filter( item=> {
        return  item.title.toLowerCase().match(searchText.toLowerCase())
      })
      console.log(newList.length ,searchList.length )
      setSearchList(newList);
    }
  };

   
 useEffect( () => {

// dispatch(emptyCart())  
   try{
   fetch('https://fakestoreapi.com/products')
   .then(res => res.json())
   .then(data => {
     data.map(item => {
       item.qty = 1;
       item.isLike = false ;
       item.price = parseInt(item.price) * 10
     });
     setProducts(data);
     dispatch(  addProducts(  data ) );
     });
     }
    catch(e){
        Alert.alert('Network connection failed')
        // fetchData()
      }
  }, [products]);


  useEffect(()=>{

    if(user){
    firestore().collection('users').doc(user.uid).get()
    .then(querySnapshot =>  {
      
       dispatch(setOrder(querySnapshot.data()?.orders ? querySnapshot.data().orders : []))
       dispatch(setAddress(querySnapshot.data()?.address ? querySnapshot.data().address : [])) 
       dispatch(setCartList(querySnapshot.data()?.cartList ? querySnapshot.data().cartList : [])) 

      //  console.log('Address & Order fixed')
    })
    .catch((e)=>{
      console.error('Error : ' , e)
    })
  }
  },[])

  return (
    products ? 
    <ScrollView style={styles.container}>

<SearchBar onSearch={handleSearch} title = "Search products ..."/>

{searchList?.length == 0 ? 
<View style={{marginTop:verticalScale(20) }}>
  <Text style={{fontWeight:'500' , fontSize:fontSize.extralarge}}>No Search Result for this..</Text>
</View>
:
  <DisplayProducts products = {searchList}  />
}
    </ScrollView>
  :
<View style={{marginTop:verticalScale(10)}}>
  <ActivityIndicator  size={scale(30)}/>
  </View>
  )
}

const styles = ScaledSheet.create({
  container : {
    backgroundColor : Colors.bg
  },
    
})
export default Home