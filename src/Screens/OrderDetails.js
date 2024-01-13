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
