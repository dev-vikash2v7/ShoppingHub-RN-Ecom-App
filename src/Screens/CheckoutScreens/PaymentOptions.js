import { View, Text, Modal, TouchableOpacity , Linking , Dimensions, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo' 
import FontAwesome from 'react-native-vector-icons/FontAwesome' 
import { Colors, fontSize } from '../../../constants/theme';
import { useNavigation } from '@react-navigation/native';

import QRCode from 'react-native-qrcode-svg';

import   Card from  '../../../assets/payment_icons/credit-card-color-icon.svg'
import Upi from  '../../../assets/payment_icons/upi-icon.svg'
import Cod from  '../../../assets/payment_icons/cod.svg'
import Qr from  '../../../assets/payment_icons/qr-icon.svg' 
import   Bank from '../../../assets/payment_icons/bank-transfer-icon.svg'

import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import CardPayment from './CardPayment';

const PaymentOptions = ({route}) => {

  const width = 45
  const height = 45
  
  const user = useSelector( state => state.auth.user) 
  const total = useSelector(state => state.cartList.total_amount)


  const selectedAddress = route.params.selectedAddress

  
  const navigation = useNavigation();
  
  const [QRVisible, setQRVisible] = useState(   false );
  const [cardPayment, setCardPayment] = useState(   false );
  
  const payee_address = 'vikash0955@axl'
  const payee_name = 'ShoppingHub'
  const merchant_category = '0000'
  const currency = 'INR'
  const transaction_ref = 'Order Payment from ShppingHub'
  const mode = '02'
  const upiLink = `upi://pay?pa=${payee_address}&pn=${payee_name}&mc=${merchant_category}&mode=${mode}&cu=${currency}&am=${total}&tn=${transaction_ref}`
  
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle : {display : 'none'} ,  tabBarVisible: false });
    
    return () =>
        navigation.getParent()?.setOptions({ 
          tabBarStyle: { 
            height : verticalScale(80),
            alignItems:'center',
          }, 
          tabBarVisible: true 
        });

}, [navigation]);


    useEffect(()=>{
      if(user.address.length){
         user.address.forEach(address=> {
          if(address.currentAddress == true ) {
            setSelectedAddress(
              address.city +
                  ', ' +
                  address.state +
                  '\n' + 
                  address.pincode +
                  '\n' +
                  address.type,
            )
          }
        }) 
      }
    } , [user])

    const upiPayment = ()=>{
      Linking.openURL(upiLink)
    }

    const ShowQR = ()=>{
      return(
        <Modal visible={QRVisible}    >
        <View style={styles.qr_container}>
        <QRCode value={upiLink} size={scale(200)} />
        </View>
       <TouchableOpacity style={styles.crossBtn} onPress={() => setQRVisible(false) }>
          <Entypo name ='circle-with-cross' size = {scale(25)} color = '#000'/>
        </TouchableOpacity>
      </Modal>
      )
    }







  const options = [
    { 
      method: 'Card', 
      image : 'Card',
      desc : 'Visa , MastarCard , Rupay & more',
      onClick : ()=> setCardPayment(true)
    },
    { 
      method: 'UPI', 
      image : 'Upi',
      desc : 'GPay , PhonePe , Paytm & more',
      onClick : ()=> upiPayment()
    },
    { 
      method: 'QR Code', 
      image : 'Qr',
      desc : 'Pay with scanner',
      onClick : ()=> setQRVisible(true)
    },
    // { 
    //   method: 'NET Banking', 
    //   image : 'Bank',
    //   desc : 'All Indians Bank',
    //   onClick : ()=> {}
    // },
    // { 
    //   method: 'Wallet', 
    //   image : paymentIcons.wallet,
    //   desc : 'Mobikwik , Paytm Wallet & more',
    //   onClick : ()=> {}
    // },
    // { 
    //   method: 'EMI', 
    //   image : paymentIcons.emi,
    //   desc : 'EMI via Slice & Amazon Pay',
    //   onClick : ()=> {}
    // },
    { 
      method: 'Cash on Delievery', 
      image : 'Cod',
      desc : 'Pay at your doorstep',
      onClick : ()=> {}
    },
   
  ];




  return (
    <ScrollView style={styles.container}>

<Text style={styles.title}>Select Payment Method</Text>


<View style = {styles.box}>

      {options.map((option) => (

        <TouchableOpacity key={option.method} style={styles.optionBox} onPress={() => option.onClick()}>


      <View style={styles.imgBox}>
          {
            option.image == 'Card' ?
             <Card width={width} height={height}/>
             :
             option.image == 'Upi'  ?
            <Upi width={width} height={height}/>:
            option.image == 'Cod' ? 
            <Cod width={width} height={height}/> 
            :
            option.image == 'Qr' ?
            <Qr width={width} height={height}/>
            :
            <Bank width={width} height={height}/>
          }
      </View>
          <View style={styles.textBox}>
           <Text style={styles.method}>{option.method}</Text>
           <Text style={styles.desc}>{option.desc}</Text>
          </View>

        </TouchableOpacity>
      ))}
</View>



         <View style={styles.totalView}>

             <Text style={[styles.title , { marginTop:0}] }>  Total Amount : </Text>
          <View style = {{marginRight:scale(2) ,flexDirection:'row' , justifyContent:'space-evenly' , alignItems:'center'}}>
          <FontAwesome name = 'rupee' size = {scale(14)} color ='black'/>

          <Text style = {styles.total}>{total} </Text>
          </View>
        </View> 


{QRVisible && <ShowQR/>}
{cardPayment && <CardPayment amount = {total} selectedAddress={selectedAddress}/>}



    </ScrollView>

  )
}

const styles = ScaledSheet.create({
  container : {
    flex:1,
    backgroundColor:Colors.bg,
    paddingHorizontal : '10@s' ,
    paddingBottom: '10@vs',
    paddingTop: '15@vs'
  },
  qr_container :{
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height ,
    justifyContent : 'center' ,
    alignItems : 'center',
    position:'absolute' ,
    top :0 ,
  },
  crossBtn:{
    position : 'absolute' ,
    top : '250@vs' ,
    right : '50@s'
  },
  
  title: {
    fontSize: fontSize.regular,
    marginLeft: '6@s' ,
    color: '#000',
    fontWeight:'500'
  },
  totalView: {
    width: '100%',
    height: '70@vs',
    borderWidth: 0.3,
    borderColor: '#B7B7B7',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    // position : 'absolute',
    // bottom:0,
  },
  box:{
      marginTop:'10@vs'
  }, 
  optionBox:{
    flexDirection:'row',
    alignItems:'center',
    height : '70@vs' , 
    paddingHorizontal : '4@s' ,
    marginHorizontal : '2@s' ,
    paddingVertical : '2@vs',
    // borderWidth : 0.5 ,
    // borderColor : 'grey' , 
    borderRadius:'5@ms',
    width:'100%',
    elevation:2,

  },
  option:{
    fontWeight:'400',
    fontSize:fontSize.regular
  },
  imgBox:{
    marginRight : '10@s' ,
    width : '65@s',
    height : '65@vs',
    paddingLeft:'4@s',
    paddingVertical:'6@vs',
    },
  total:{
    fontWeight:'500',
    fontSize:fontSize.large,
  },
  addressView: {
    width: '100%',
    marginTop : '30@vs'
  },
  textBox:{
    marginLeft:'2@s'
  },
  method:{
    fontWeight:'600',
    fontSize:fontSize.regular 
  },
  desc:{
    fontWeight:'300',
    fontSize:fontSize.small
  }

})

export default PaymentOptions;