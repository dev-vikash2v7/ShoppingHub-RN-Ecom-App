import { createSlice  } from '@reduxjs/toolkit'

const ProductSlice = createSlice({
    name: 'products',
    initialState: {
      data: null 
    },
    reducers: {

        //this is action
      addProducts : (state , action) => {
        state.data = action.payload;
      },
    }

  })

export const {addProducts} = ProductSlice.actions
export default ProductSlice.reducer