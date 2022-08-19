import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shape:'',
    createShape: '',
    shapedata:{}
    
}
//create Slice And Reducer
export const addShapeSlice = createSlice({
    name: 'addShape',
    initialState,
    reducers: {
        // /defauld add shape function
        AddShape: (state, action) => {
            state.shape = action.payload        
        },
        //create shape function
        creteShape: (state, action) => {
            state.createShape = action.payload
        },
        shapeData:(state, action) => {
            state.shapedata=action.payload
        }
        
   
    },
})
// Action creators are generated for each case reducer function
export const { AddShape,creteShape,shapeData } = addShapeSlice.actions
export default addShapeSlice.reducer
