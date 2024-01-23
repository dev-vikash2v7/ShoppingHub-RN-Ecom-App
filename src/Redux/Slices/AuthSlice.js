import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice  } from '@reduxjs/toolkit';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const user = auth().currentUser;
const userDocument = user ? firestore().collection('users').doc(user.uid) : null;


const AuthSlice = createSlice({
    name: 'auth',

    initialState: {
       user : null
    },

    reducers: {
      setUser : (state , action) => {
          AsyncStorage.setItem('user_'+action.payload?.id, JSON.stringify(action.payload));
          state.user = action.payload;
      },
      removeUser : (state ) => {
        AsyncStorage.clear();
        state.user = null
      },

      setAddress(state, action) {
        state.user.address = action.payload;
      
      }
      ,
      addAddress(state, action) {
        state.user.address.push(action.payload);
        
        userDocument?.set({
          address:  state.user.address,
        }, { merge: true })
        .then(()=>console.log('added'))
        .catch((error) => {
        console.error('Error updating profile and Firestore:', error);
      });

      },

      deleteAddress(state, action) {
        let newArr = state.user.address.filter(item => {
          return item.id !== action.payload;
        });
        state.user.address = newArr;
      },

      updateAddress(state, action) {

        let temp = state.user.address;

        temp.map(item => {
          if (item.id == action.payload.id) {
            item = action.payload
          }
        });

        state.user.address = temp;

        userDocument?.update({
          address: state.user.address,
        })
        .then(()=>console.log('updated'))
        .catch((error) => { console.error('Error updating profile and Firestore:', error); });
      },
     
    }
  })

export const {setUser , removeUser , updateUser ,setAddress, addAddress , updateAddress , deleteAddress} = AuthSlice.actions;

export default AuthSlice.reducer