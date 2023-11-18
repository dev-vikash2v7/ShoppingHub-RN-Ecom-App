import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice  } from '@reduxjs/toolkit'



const AuthSlice = createSlice({
    name: 'auth',

    initialState: {
    //   user : {
    //     name :'vikash',
    //     email:'vk@gmail.com',
    //     phone : '887956935',
    //     address:[{
    //       id:1,
    //       state : 'MP',
    //       city : 'Bhopal',
    //       type : 'home',
    //       pincode : 450114 ,
    //       currentAddress : true 
    //     },{
    //       id:2,
    //       state : 'Bihar',
    //       city : 'Patna',
    //       type : 'office',
    //       pincode : 23422 ,
    //       currentAddress : false 
    //     },
    //   ],
    //     password : '123'
    // }

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
      addAddress(state, action) {
        state.user.address.push(action.payload);
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
            item.state = action.payload.state;
            item.city = action.payload.city;
            item.pincode = action.payload.pincode;
            item.type = action.payload.type;
            item.currentAddress = action.payload.currentAddress;
          }
        });
        state.user.address = temp;
      },
     
    }
  })

export const {setUser , removeUser , updateUser ,addAddress , updateAddress , deleteAddress} = AuthSlice.actions;

export default AuthSlice.reducer