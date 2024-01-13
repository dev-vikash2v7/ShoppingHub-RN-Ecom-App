import { createSlice  } from '@reduxjs/toolkit'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const user = auth().currentUser;

const CartListSlice = createSlice({
    name: 'cartList',
    initialState: {
      data: [] ,
      total_amount : 0
    },
    reducers: {
      setCartList : (state , action)=>{
          if(action.payload){
            state.data = action.payload.data
            state.total_amount = action.payload.total
          }
      },

      addItemToCartList : (state , action) => {
        
      state.data?.push( action.payload.item)
      state.total_amount += action.payload.item.price * action.payload.item.qty
     

        firestore().collection('users').doc(user.uid).set({
          cartList:  {
            data : state.data,
            total:  state.total_amount
        }
        },{merge:true})
        .then(()=>console.log('added item'))
        .catch((error) => { console.error('Error updating profile and Firestore:', error); });

      },


      increaseItemToCartList : (state , action) => {
        
        state.data?.map( item => {

          if(item.id == action.payload.item.id  ){
                item.qty += 1 ;
                state.total_amount += action.payload.item.price
          }
        })

        firestore().collection('users').doc(user.uid).set({
          cartList:  {
            data : state.data,
            total:  state.total_amount
        }
        },{merge:true})
        .then(()=>console.log('increase item'))
        .catch((error) => { console.error('Error updating profile and Firestore:', error); });

      },






      reduceItemFromCartList : (state , action) => {
        
        state.data?.map( item => {

          if(item.id == action.payload.item.id  ){
              if(item.qty > 1){
                item.qty -= 1 ;
               state.total_amount -= item.price
              }
              else{
                state.data.splice( item , 1);
                state.total_amount -= action.payload.item.price * action.payload.item.qty
              } 
          }
        })

        firestore().collection('users').doc(user.uid).update({
          cartList:  {
            data : state.data,
            total:  state.total_amount
        }
        })
        .then(()=>console.log('reduceItemFromCartList'))
        .catch((error) => { console.error('Error : ', error); })


      },

      
      removeItemFromCartList(state, action) {

        let tempData = state.data;
        tempData.splice(action.payload, 1);

        state.data = tempData;
        state.total_amount -= action.payload.price * action.payload.qty;

        firestore().collection('users').doc(user.uid).update({
          cartList:  state.data,
          total:  state.total_amount,

        })
        .then(()=>console.log('removeItemFromCartList'))
        .catch((error) => { console.error('Error : ', error); })



      },

      emptyCart(state, action) {
        state.data = [];
        state.total_amount =0;

        firestore().collection('users').doc(user.uid).set({
          cartList:  {
            data : [],
            total:  0
        }
        })
        .then(()=>console.log('emptyCart'))
        .catch((error) => { console.error('Error : ', error); })
      },

    }
  })

export const {addItemToCartList ,increaseItemToCartList,reduceItemFromCartList ,  removeItemFromCartList , emptyCart , setCartList} = CartListSlice.actions

export default CartListSlice.reducer 