import React from 'react';
import { View, Text} from 'react-native';
import DisplayProducts from '../Components/DisplayProducts';
import Container from '../Components/Container';
import { ScaledSheet } from 'react-native-size-matters';
import { fontSize } from '../../constants/theme';

const OrderDetails = ({route }) => {
  // Mock data for order details
  const {orderDetails} = route.params

  const {billingDetails} = orderDetails
  const address = `${billingDetails.address.city} , ${billingDetails.address.state}\n${billingDetails.address.pincode}\n${billingDetails.address.type}`
  const {name , email , phone} = billingDetails

  // const orderDetails = {
  //   orderId: '123456',
  //   amount: '$250.00',
  //   shippingAddress: '1234 Main St, City, Country',
  //   paymentDetails: 'Credit card ending in 1234',
  //   productItems: [
  //     { id: 1, name: 'Product 1', price: '$50.00' },
  //     { id: 2, name: 'Product 2', price: '$70.00' },
  //     // Add more product items as needed
  //   ],
  //   paymentStatus: 'Paid',
  // };

  const RenderProduct = ({item}) =>{
    return(
    <View key={item.id}>
            <Text>{item.name}</Text>
            <Text>{item.desc}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Quantity: {item.qty}</Text>
            {/* Add images, product descriptions, etc. */}
            </View>
    )}

  return (
    <Container  isScrollable={true}>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <Text>Order ID: {orderDetails.id}</Text>
        <Text>Amount: {orderDetails.amount}</Text>
        <Text>Payment Status: {orderDetails.paymentStatus}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reciver Details</Text>
        <Text>{name}</Text>
        <Text>{email}</Text>
        <Text>{phone}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Details</Text>
        <Text>{address}</Text>
        {/* Add tracking details, delivery date, etc. */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <Text>{orderDetails.paymentMethodType}</Text>
        <Text>{orderDetails.paymentStatus}</Text>
        {/* Add payment method, transaction ID, etc. */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Items</Text>

        <DisplayProducts products={ orderDetails.items} />
        {/* {orderDetails.items.map(item => (
          <RenderProduct item = {item}/>
        ))} */}
      </View>


    </Container>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '20@ms',
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: '20@vs',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: fontSize.large,
    marginBottom: '10@vs',
  },
});

export default OrderDetails;
