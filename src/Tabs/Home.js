import  React,{useEffect, useState }  from 'react'
import { View  , StyleSheet   , ActivityIndicator, Alert , Text} from 'react-native'
import {useDispatch} from 'react-redux'
import { addProducts } from '../Redux/Slices/ProductSlice';
import DisplayProducts from '../Components/DisplayProducts';
import SearchBar from '../Components/SearchBar';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors, fontSize } from '../../constants/theme';

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

  
 useEffect(() => {
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
      }
  }, [products]);

  return (
    products ? 
    <View style={styles.container}>

<SearchBar onSearch={handleSearch} title = "Search products ..."/>

{searchList?.length == 0 ? 
<View style={{marginTop:verticalScale(20) }}>
  <Text style={{fontWeight:'500' , fontSize:fontSize.extralarge}}>No Search Result for this..</Text>
</View>
:
  <DisplayProducts products = {searchList}  />
}
    </View>
  :
<View style={{marginTop:verticalScale(10)}}>
  <ActivityIndicator  size={scale(30)}/>
  </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'center',
  },
    
})
export default Home