import { createSlice  } from '@reduxjs/toolkit'

const WhishListSlice = createSlice({
    name: 'wishList',
    initialState: {
      items: [] ,
    },
    reducers: {
      addItemToWishList : (state , action) => {
        state.items.push( action.payload)
      },
      removeItemFromWishList : (state , action) => {
        if(state.data != []){
          state.items.pop( action.payload);
        } 
      },
    }
  })

export const {addItemToWishList , removeItemFromWishList} = WhishListSlice.actions
export default WhishListSlice.reducer