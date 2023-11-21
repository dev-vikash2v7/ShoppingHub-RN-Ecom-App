import {View, Text, Image} from 'react-native';
import React,{useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import icons from '../../constants/icons';
import { fontSize } from '../../constants/theme';
import { ScaledSheet } from 'react-native-size-matters';

const OrderSuccess = ({route}) => {
  const navigation = useNavigation();

  const {orderDetails} = route.params

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    return () =>
    navigation.getParent()?.setOptions({ 
      tabBarStyle:  { 
        height : 80,
        alignItems:'center',
    }, 
    tabBarVisible: true 
  });
}, [navigation]);



  return (
    <View style={styles.container}>
      <Image source={icons.done} style={styles.icon} /> 
      <Text style={styles.msg}>Order Placed Successfully...</Text>
      <Text
        style={styles.btn}
        onPress={() => {
          navigation.navigate('OrderDetails' , {orderDetails});
        }}>
        View Order Details
      </Text>
    </View>
  );
};



export default OrderSuccess;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100@s',
    height: '100@vs',
  },
  msg: {
    marginTop: '20@vs',
    fontSize: fontSize.regular,
    color: '#000',
  },
  btn: {
    padding: '10@ms',
    borderWidth: 1,
    color: '#000',
    marginTop: '20@vs',
  },
});
