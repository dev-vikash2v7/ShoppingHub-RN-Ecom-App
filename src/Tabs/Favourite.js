import React,{useState} from 'react'
import { View  , StyleSheet  , Text  } from 'react-native'
import { useSelector } from 'react-redux'
import DisplayProducts from '../Components/DisplayProducts'
import { Colors, fontSize } from '../../constants/theme'
import SearchBar from '../Components/SearchBar'
import { scale, verticalScale } from 'react-native-size-matters'

const Favourite = () => {

  const wishListproducts = useSelector(state => state.wishList.items);
  const[searchList , setSearchList] =  useState(wishListproducts)

  
  const handleSearch = (searchText) => {
    if(searchText == '')
      setSearchList(wishListproducts);
    else{
      const newList = searchList.filter( item=> {
       return  item.title.toLowerCase().match(searchText.toLowerCase())
      })
      setSearchList(newList);
    }
  };



  return (
    <View style={styles.container}>

    {wishListproducts?.length == 0 ?

    <View style={{alignItems:'center' , justifyContent:'center' , marginTop:verticalScale(20)}}>
      <Text style={{fontSize:fontSize.large , fontWeight : '600' , color:'#000'}}> No Items In Your Wish List</Text>
    </View>
    :
    <>
   <SearchBar onSearch={handleSearch} title={'Search Favourites...'}/>

   {searchList?.length == 0 ? 
<View style={{marginTop:verticalScale(30) }}>
  <Text style={{fontWeight:'500' , fontSize:fontSize.large}}>No Search Result for this..</Text>
</View>
:
  <DisplayProducts products = {searchList}  />
}
   </>
    }
       
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'center',
    backgroundColor:Colors.bg,
    paddingHorizontal : scale(10)
  },
   
})
export default Favourite;