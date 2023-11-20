import { createSlice  } from '@reduxjs/toolkit'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const user = auth().currentUser;


const CartListSlice = createSlice({
    name: 'cartList',
    initialState: {
      data: [] ,
    },
    reducers: {
      addItemToCartList : (state , action) => {
        
      let isExist = false ;

      state.data.map( item => {

        if(item.id == action.payload.item.id  ){
          isExist =   true ;
          item.qty += 1 ;
        }
      })
       if(!isExist){
          state.data.push( action.payload.item)
        }

        // db.collection('users').doc(user.uid).set({
        //   cartList:  state.data,
        // })
        // .then(()=>console.log('updated'))
        // .catch((error) => { console.error('Error updating profile and Firestore:', error); });
      },


      reduceItemFromCartList : (state , action) => {
        
        state.data.map( item => {
          if(item.id == action.payload.item.id  ){
              if(item.qty > 1){
                item.qty -= 1 ;
              }
              else{
                state.data.splice( item , 1);
              } 
          }
        })
      },

      
      removeItemFromCartList(state, action) {
        let tempData = state.data;
        tempData.splice(action.payload, 1);
        state.data = tempData;
      },

      emptyCart(state, action) {
        state.data = action.payload;
      },

    }
  })

export const {addItemToCartList ,reduceItemFromCartList ,  removeItemFromCartList , emptyCart} = CartListSlice.actions
export default CartListSlice.reducer 