import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View, Text , StyleSheet  , Dimensions , TouchableOpacity } from 'react-native'
import Ionicons   from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { Colors, fontSize } from '../../constants/theme';
import { ScaledSheet, scale  ,verticalScale} from 'react-native-size-matters';

const { width , height} = Dimensions.get('window');

export default function Header({title   , leftIcon , rightIcon}) {
  
  const cartList = useSelector(state => state.cartList.data);
  const nav = useNavigation();
  const user = useSelector( state => state.auth.user)


  return (
    <View style = {styles.header}>

{leftIcon &&
      (<TouchableOpacity 
      style={styles.leftbtn}
      onPress={()=> leftIcon == 'arrow-back' ? nav.goBack() :  nav.openDrawer()} >
          <Ionicons name={leftIcon} size={scale(30)} color = 'white'/>
      </TouchableOpacity>)
}

      <View >
      <Text style={ styles.title }> {title} </Text>
      </View>

    {user 
    ?

  (  rightIcon &&
         ( <TouchableOpacity onPress = {()=>nav.navigate('Cart')} style={styles.rightbtn}> 

          <View style={ styles.cartBadge} >
            <Text style={styles.count}> {cartList? cartList.length : 0}  </Text>
          </View>

            <Ionicons name={rightIcon} size={scale(30)} color = 'white'/>

         </TouchableOpacity>)
         )
: 

             <TouchableOpacity style={ styles.loginBtn}  onPress={()=>nav.navigate('LogIn')}>
              <Text style={styles.loginText}> {"Log In"}  </Text>
            </TouchableOpacity>
}

    </View>
  );
}

const styles = ScaledSheet.create({
  header : {
    backgroundColor:Colors.primary,
    alignItems : 'center' , 
    // height : '80@vs' ,
    height : (height / 11) ,
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal : '10@s',
    paddingTop:'10@vs'
  },
  title:{
    fontSize:fontSize.large ,
    color : '#fff',
    fontWeight:'600'
  },
 
  cartBadge : {
    width :  '15@s',
    height: '15@vs' , 
    borderRadius : '10@ms' , 
    backgroundColor  : '#fff',
    top : '-5@vs' ,
    right : 0 , 
    position : 'absolute',
    alignItems:'center',
    justifyContent:'center',
  },
  count:{
    color:'#000',
    fontSize : fontSize.small , 
    fontWeight:"600",
    alignSelf:'center',
  },
  
  loginText:{
    fontSize:fontSize.regular  ,
    fontWeight:'600', 
    color :'#fff',
    textDecorationLine:'underline'
  }
})
