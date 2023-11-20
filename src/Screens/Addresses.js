import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {useIsFocused, useNavigation} from '@react-navigation/native';
  import {useDispatch, useSelector} from 'react-redux';
import { deleteAddress, updateAddress } from '../Redux/Slices/AuthSlice';
import { Colors, fontSize } from '../../constants/theme';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' 
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';


  const Addresses = () => {

    const navigation = useNavigation();

    let addressList = useSelector(state => state.auth.user?.address);
 
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const [selectedAddress , setSelectedAddress] = useState( null )

    useEffect(() => {
      addressList?.forEach(item =>     item.currentAddress == true && setSelectedAddress(item)   )
    }, [isFocused]);

    const defaultAddress = async item => {

      addressList  =  addressList.map( address => {
          const newAddress = { ...address, currentAddress: item.id == address.id ?  true : false }
          dispatch(updateAddress(newAddress))
          return newAddress;
        })
        navigation.goBack()
    };

    return (

      
      <View style={styles.container}>
     
      { addressList?.length ?
      <>
        <FlatList
          data={addressList}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[styles.addressView , selectedAddress?.id == item?.id && styles.selectedAddressStyle ]}
                onPress={() => {
                  setSelectedAddress(item);
                }}>
                <Text style={styles.state}>{`State:  ${item.state}`}</Text>
                <Text style={styles.state}>{`City:  ${item.city}`}</Text>
                <Text style={styles.state}>{`Pincode:  ${item.pincode}`}</Text>
                <Text
                  style={[
                    styles.state,
                   styles.radioBtn
                  ]}>
                  {item.type}
                </Text>
                <View style={styles.bottomView}>

                  <TouchableOpacity
                    style={[styles.bottomicon, {marginRight: scale(10)}]}
                    onPress={() => {
                      navigation.navigate('AddAddress', {
                        type: 'edit',
                        data: item,
                      });
                    }}>

                  <MaterialCommunityIcons name = 'home-edit' size = {scale(22)} color = 'green'/>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.bottomicon}
                    onPress={() => {
                      dispatch(deleteAddress(item.id));
                    }}>
                    <MaterialCommunityIcons name = 'delete' size = {scale(22)} color = 'red'/>

                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('AddAddress', {type: 'new'});
          }}>
          <Text style={{fontSize: fontSize.extralarge, color: '#fff'}}>+</Text>
        </TouchableOpacity>


      <CustomButton
    title = 'Select Address'
    onClick={()=>defaultAddress(selectedAddress)}
    width={'90%'}
bg='orange'
      />

      </>
      : 
      <View>
      <Text style = {{fontSize:fontSize.large , fontWeight:'600' , alignSelf:'center' , marginTop : verticalScale(20)}}>No Address Found</Text>
      
      <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('AddAddress', {type: 'new'});
          }}>
          <Text style={{fontSize: fontSize.extralarge, color: '#fff'}}>+</Text>
        </TouchableOpacity>
      </View>
      }

      </View>
    );
  };
  
  export default Addresses;
  
  const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.bg,
      paddingBottom:30
    },
    selectedAddressStyle:{
      borderWidth: 2,
      borderColor:'blue',
    },
    addressView:{
      width: '90%',
      backgroundColor: '#fff',
      borderWidth: 0.5,
      alignSelf: 'center',
      marginTop: '20@vs',
      paddingLeft: '20@s',
      paddingVertical: '10@vs',
      borderRadius: '10@ms',
      borderColor:'#000',

    },
    addButton: {
      width: '50@s',
      height: '50@s',
      backgroundColor: '#EC8A00',
      borderRadius: '25@ms',
      // position: 'absolute',
      // bottom: '50@vs',
      // right: '20@s',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'flex-end',
      marginRight:'20@s'
    },
    state: {
      color: '#000', 
      fontSize: fontSize.regular
    },
    radioBtn:{
        position: 'absolute',
        right: '10@s',
        top: '10@vs',
        backgroundColor: '#B1BFF5',
        padding: '5@ms',
        borderRadius: '10@ms',
        fontSize: fontSize.small,
        fontWeight: '600',
      },
    bottomView: {
      position: 'absolute',
      right: '10@s',
      bottom: '10@vs',
      flexDirection: 'row',
    },
    bottomicon: {
      width: '24@s',
      height: '24@vs',
    },
  });
  