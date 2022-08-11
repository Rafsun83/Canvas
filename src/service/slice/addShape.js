import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shape:'',
}

export const addShapeSlice = createSlice({
    name: 'addShape',
    initialState,
    reducers: {
        AddShape: (state, action) => {
            state.shape = action.payload
        },
   
    },
})

// Action creators are generated for each case reducer function
export const { AddShape } = addShapeSlice.actions
export default addShapeSlice.reducer
