const {createSlice} = require('@reduxjs/toolkit');

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const user = auth().currentUser;


const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    data:[]
      // {"amount": 1090, "billingDetails": {"address": {"city": "Bhopal", "country": "IN", "line1": "room no 101", "line2": "patel nagar", "postalCode": "462022", "state": "MP"}, "email": "vk@gmail.com", "name": "vikash", "phone": "+1234567890"}, "createdAt": "1698607024000", "currency": "inr", "id": "pi_3O6eTsSEzMLO0wLK0pOH9U0h", 
      // "items": [
      //   {"category": "men's clothing", "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "id": 1, "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "isLike": false, "price": 1090, "qty": 1, "rating": 4, "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
      // },
      // ], "paymentMethodType": "Card", "paymentStatus": "Succeeded"} ,
  },
  reducers: {
    orderItem(state, action) {
      state.data.push(action.payload);
      
      firestore().collection('users').doc(user.uid).update({  orders:  state.data
      })
      .then(()=>console.log('updated'))
      .catch((error) => { console.error('Error updating profile and Firestore:', error); });
    },
    setOrder(state,action){
      state.data = action.payload
    }
  },
});
export const {orderItem , setOrder} = OrderSlice.actions;
export default OrderSlice.reducer;

// {"amount": 1090, "billingDetails": {"address": {"city": "Bhopal", "country": "IN", "line1": "room no 101", "line2": "patel nagar", "postalCode": "462022", "state": "MP"}, "email": "vk@gmail.com", "name": "vikash", "phone": "+1234567890"}, "createdAt": "1698607024000", "currency": "inr", "id": "pi_3O6eTsSEzMLO0wLK0pOH9U0h", "items": [{"category": "men's clothing", "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "id": 1, "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "isLike": false, "price": 1090, "qty": 1, "rating": [Object], "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"}], "paymentMethodType": "Card", "paymentStatus": "Succeeded"}
