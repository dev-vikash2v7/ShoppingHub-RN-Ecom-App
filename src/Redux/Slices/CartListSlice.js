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
      addItemToCartList : (state , action) => {
        
      let isExist = false ;

      state.data.map( item => {

        if(item.id == action.payload.item.id  ){
          isExist =   true ;
          item.qty += 1 ;
          state.total_amount += item.price
        }
      })
       if(!isExist){
         state.data.push( action.payload.item)
         state.total_amount += action.payload.item.price
        }

        firestore().collection('users').doc(user.uid).set({
          cartList:  state.data,
        })
        .then(()=>console.log('updated'))
        .catch((error) => { console.error('Error updating profile and Firestore:', error); });
      },


      reduceItemFromCartList : (state , action) => {
        
        state.data.map( item => {

          if(item.id == action.payload.item.id  ){
              if(item.qty > 1){
                item.qty -= 1 ;
               state.total_amount -= item.price
              }
              else{
                state.data.splice( item , 1);
                state.total_amount -= action.payload.item.price

              } 
          }
        })
      },

      
      removeItemFromCartList(state, action) {
        let tempData = state.data;
        tempData.splice(action.payload, 1);
        state.data = tempData;
        state.total_amount -= action.payload.price

      },

      emptyCart(state, action) {
        state.data = action.payload;
        state.total_amount =0;
      },

    }
  })

export const {addItemToCartList ,reduceItemFromCartList ,  removeItemFromCartList , emptyCart} = CartListSlice.actions
export default CartListSlice.reducer 