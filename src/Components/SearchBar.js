import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet ,Keyboard} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontSize } from '../../constants/theme';


const SearchBar = ({ onSearch , title }) => {

    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        onSearch(searchText);
    }, [searchText]);


    return (
      <View style={styles.container}>

        <TouchableOpacity  style={styles.iconContainer}>
          <Ionicons name="search" size={scale(20)} color="black" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder={title}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          placeholderTextColor={ '#000'}
        />

        <TouchableOpacity onPress={()=>  setSearchText('') } style={ [styles.iconContainer , {display: searchText ? 'block' : 'none'} ]}>
          <Entypo name="cross" size={scale(24)} color="black" />
        </TouchableOpacity>


      </View>
    );
  
  }
  
  export default SearchBar ;


  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e0e0e0',
      borderRadius: moderateScale(8),
      paddingHorizontal: scale(10),
      margin: moderateScale(10),
    },
    input: {
        color : '#000' ,
      flex: 1,
      paddingVertical: verticalScale(8),
      fontSize:fontSize.regular
    },
    iconContainer: {
      padding: moderateScale(10),
    },
  });