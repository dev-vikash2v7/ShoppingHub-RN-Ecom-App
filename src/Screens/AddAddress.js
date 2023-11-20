import {
    StyleSheet,
    Text,
    TextInput,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import {useDispatch} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import { RadioButton } from 'react-native-paper';
import { addAddress, updateAddress } from '../Redux/Slices/AuthSlice';
import { Colors, fontSize } from '../../constants/theme';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';

const options = [
    { label: 'Home', value: 'home' },
    { label: 'Office', value: 'office' },
  ];

  const AddAddress = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const [type, setType] = useState(
      route.params.type == 'edit'
        ? route.params.data.type : 'home',
    );
    
    const [state, setState] = useState(
      route.params.type == 'edit' ? route.params.data.state : '',
    );
    const [city, setCity] = useState(
      route.params.type == 'edit' ? route.params.data.city : '',
    );
    const [pincode, setPincode] = useState(
      route.params.type == 'edit' ? route.params.data.pincode : '',
    );

    const dispatch = useDispatch();
  
    return (
      <View style={styles.container}>
        
        <TextInput
          placeholder="Enter State"
          style={[styles.input, {marginTop: verticalScale(50)}]}
          value={state}
          onChangeText={txt => setState(txt)}
        />
        <TextInput
          placeholder="Enter City"
          style={[styles.input, {marginTop: verticalScale(15)}]}
          value={city}
          onChangeText={txt => setCity(txt)}
        />
        <TextInput
          placeholder="Enter Pincode"
          keyboardType={'number-pad'}
          style={[styles.input, {marginTop: verticalScale(15)}]}
          value={pincode}
          onChangeText={txt => setPincode(txt)}
        />


        <View style={styles.typeView}>

        {options.map((option) => (
        <View key={option.value} style={styles.typeBtn}>
          <RadioButton
            value={option.value}
            status={type === option.value ? 'checked'  : 'unchecked'}
            onPress={() => setType(option.value)}
            color='orange'
          />
           <Text style={styles.radioText}>{option.label}</Text>
        </View>
      ))}

        </View>

        <CustomButton
          bg={'#FE9000'}
          title={'Save Address'}
          color="#fff"
          width={'90%'}
          onClick={() => {
            if (route.params.type == 'edit') {
              dispatch(
                updateAddress({
                  state: state,
                  city: city,
                  pincode: pincode,
                  type: type ,
                  id: route.params.data.id,
                }),
                navigation.goBack(),
              );
            } else {
              dispatch(
                addAddress({
                  state: state,
                  city: city,
                  pincode: pincode,
                  type: type ,
                  currentAddress : false ,
                  id: parseInt(Math.random() * 1343),
                }),
                navigation.goBack(),
              );
            }
          }}
        />
      </View>
    );
  };
  
  export default AddAddress;
  
  const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.bg,
    },
    addButton: {
      width: '50@s',
      height: '50@vs',
      backgroundColor: '#EC8A00',
      borderRadius: '25@ms',
      position: 'absolute',
      bottom: '50@vs',
      right: '20@s',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '90%',
      height: '50@vs',
      borderRadius: '10@ms',
      borderWidth: 0.3,
      alignSelf: 'center',
      paddingLeft: '20@s',
      fontSize:fontSize.regular
    },
    typeView: {
      width: '100%',
      flexDirection: 'row',
      marginTop: '20@vs',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    typeBtn: {
      width: '40%',
      height: '50@vs',
      borderRadius: '10@ms',
      flexDirection: 'row',
      paddingLeft: '10@s',
      alignItems: 'center',
    },
    radio: {
      width: '24@s',
      height: '24@vs',
    },
    radioText: {marginLeft: 10},
  });
  