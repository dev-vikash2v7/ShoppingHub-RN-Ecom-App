import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from '../../Redux/Slices/CartListSlice';
import { addOrder } from '../../Redux/Slices/OrderSlice';

import { useStripe , CardField, StripeProvider    } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import {  Alert , View , Text , BackHandler} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import LoadingButton from '../../Components/LoadingButton';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { fontSize } from '../../../constants/theme';


function  CardPayment  ({selectedAddress , amount }) {

    const user = useSelector( state => state.auth.user) 
    const cartItems = useSelector( state => state.cartList.data)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    // const [cardDetails , setCardDetails] = useState(null)

    const { confirmPayment  } = useStripe();

    const [loading , setLoading] = useState(false);
    const [showBtn , setShowBtn] = useState(false);



  useEffect( () => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });

    const backAction = () => {
      // Navigate to the Home screen when the back button is pressed
      Alert.alert('Hold on!', 'Are you sure ? Your Order will Cancel', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () =>   navigation.navigate('Cart')},
      ]);
    
      return true; // Prevent default back button behavior
    };
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
        {
          backHandler.remove();
          navigation.getParent()?.setOptions({ 
            tabBarStyle:  { 
              height : 80,
              alignItems:'center',
          }, 
          tabBarVisible: true 
        });
        }
}, [navigation] );




  const placeOrder = (paymentIntent) => {

    const orderDetails = {
      id:paymentIntent.id , 
      items: cartItems,
      amount: paymentIntent.amount,
      currency : paymentIntent.currency,
      billingDetails: paymentIntent.paymentMethod.billingDetails,
      paymentMethodType: paymentIntent.paymentMethod.paymentMethodType,
      paymentStatus: paymentIntent.status,
      createdAt:paymentIntent.created ,
    };

    // console.log(data)

    dispatch(addOrder(orderDetails));
    dispatch(emptyCart([]));
    navigation.navigate('OrderSuccess' , {orderDetails});
  };






    const fetchPaymentIntentClientSecret = async  ( ) => {
    
        try{
      const res = await  fetch('https://shopping-hub-backend.vercel.app/create-payment-intent', {
        method : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            amount: amount ,
            currency: 'usd',
            gateway: 'card',
          }),} )


      const { clientSecret  , error} = await res.json();
      return { clientSecret  , error} ;
        }

      catch(e){
          console.log( 'fetchPaymentIntentClientSecret Error : ' ,  e ) 
          Alert.alert('Server Error '+ e.message)
          setLoading(false);
      }
    }


















    const handlePayment = async ()=>{
      
            setLoading(true)
            setShowBtn(false)

            const billingDetails = {
                name : user.name ,
                email : user.email,
                phone: '+1234567890',
                address: {
                  line1: 'room no 101',
                  line2: 'patel nagar',
                  city: selectedAddress.city,
                  state: selectedAddress.state,
                  postalCode: '462022',
                  country: 'IN',
                },
            }

            const {clientSecret , error} = await  fetchPaymentIntentClientSecret();

            if(error || !clientSecret){
                console.log('USER ERROR  : ' , error)
                Alert.alert('Unable to process payment ! Try Again')
                setLoading(false)
                setShowBtn(true)
                return 
            }

      

            try{

            const {error , paymentIntent} = await confirmPayment(clientSecret , 
              {
                paymentMethodType: 'Card' ,
                paymentMethodData: { 
                  billingDetails: billingDetails 
                },
              });

                if (error) {
                  console.log('PAYMENT ERROR : ' , error.message)
                  Alert.alert(error?.localizedMessage);
                } 
                else if (paymentIntent) {
                   console.log(paymentIntent)
                   // Alert.alert(`Payment of INR ${amount}   is successful! `)
                   console.log(` order id ${paymentIntent.id} at ${paymentIntent.created}`)
                   placeOrder(paymentIntent)
                }
            }
            catch(e){
                console.log(e.message)
                Alert.alert('SERVER ERROR : ' +e.message)
            }
            setLoading(false)
            setShowBtn(true) 
    }

    return (


      <View style = {styles.container}> 

      <Text style={styles.title}> Enter Card Details</Text>

        <StripeProvider
        publishableKey="pk_test_51J5EHJSEzMLO0wLKuoQkQvHZDW5XE5xwQiSXP61XSBMfzmHNvLDnf9iU0Ba68wuh6nAldPxtld3ORd1P07BDzDsq00ndvDCXLX"
      >
      <CardField
      postalCodeEnabled={false}
        
        style={styles.cardContainer}
        
        onCardChange={(card) => {
          if(card.complete) setShowBtn(true)
          else setShowBtn(false)
        }}
      /> 

          </StripeProvider>

<LoadingButton 
            title={'Pay Now'}
           onClick={() => handlePayment() }
            bg = 'green'
           color = 'white'
           loading={ loading}
           showBtn={ showBtn}
           marginTop={verticalScale(10)}
           fontSize = {fontSize.regular}
/>
          </View>
    );
  }

  export default CardPayment
  

const styles = ScaledSheet.create({
  container:{
// flex : 1,
// alignItems : 'center',
padding:'10@ms',
paddingTop:20 ,
height : '300@vs' 
  },
  title:{
fontSize:fontSize.large,
fontWeight:'600', 
  },

      cardContainer :{
        width: '100%',
        height: '60@vs',
        borderWidth:1,
        marginTop : '10@vs',
        borderRadius:'10@ms',
        padding:'10@ms',
        color: 'black', // Customize text color
        fontSize: fontSize.regular,   // Customize font size
        placeholderColor: 'gray', // Customize placeholder color
        borderColor: 'gray',
      },
  
})



// {
  // "amount": 2180,
  //  "canceledAt": "0", 
  //  "captureMethod": "Automatic", 
  //  "clientSecret": "pi_3O67rfSEzMLO0wLK0siyj3Yt_secret_rhQIXFnPyLp9zLnB5mxX5v7WQ", 
  //  "confirmationMethod": "Automatic", 
  //  "created": "1698481647000", 
  //  "currency": "inr", 
  //  "description": null,
  //   "id": "pi_3O67rfSEzMLO0wLK0siyj3Yt", 
  //   "lastPaymentError": null,
  //    "livemode": false, 
  //    "nextAction": null, 
  //    "paymentMethod": 
  //         {"AuBecsDebit": 
  //           {
  //             "bsbNumber": null,
  //           "fingerprint": null, "last4": null
  //           }, 
  //         "BacsDebit":
  //          {"fingerprint": null, "last4": null, "sortCode": null},
  //           "Card": {"availableNetworks": null, "brand": "Visa", "country": "US", "expMonth": 12, "expYear": 2024, "fingerprint": null, "funding": "credit", "last4": "4242", "preferredNetwork": null, "threeDSecureUsage": [Object]}, 
  //           "Fpx": {"accountHolderType": null, "bank": null}, 
  //           "Ideal": {"bankIdentifierCode": null, "bankName": null},
  //            "SepaDebit": {"bankCode": null, "country": null, "fingerprint": null, "last4": null},
  //             "Sofort": {"country": null},
  //              "USBankAccount": {"accountHolderType": "Unknown", "accountType": "Unknown", "bankName": null, "fingerprint": null, "last4": null, "linkedAccount": null, "preferredNetworks": null, "routingNumber": null, "supportedNetworks": null}, 
  //              "Upi": {"vpa": null}, 
  //              "billingDetails": {"address": [Object], "email": "vk@gmail.com", "name": "vikash", "phone": "+1234567890"}, "customerId": null, "id": "pm_1O67rgSEzMLO0wLKCmWpP5Je", "livemode": false, "paymentMethodType": "Card"}, "paymentMethodId": "pm_1O67rgSEzMLO0wLKCmWpP5Je", "receiptEmail": null, "shipping": null, "status": "Succeeded"}