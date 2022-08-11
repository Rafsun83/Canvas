import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    formdata:[
    //     {
    //     shapeType:'Rectangle',
    //     width:'150',
    //     height:'100',
    //     xaxis:'20',
    //     yaxis:'30',
    //     color:'blue'
    // },
    // {
    //     shapeType:'Triangle',
    //     width:'250',
    //     height:'100',
    //     xaxis:'50',
    //     yaxis:'80',
    //     color:'green'
    // }
],
    
   
    
}

export const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        getformdata: (state, action) => {
            const data = action.payload
            state.formdata.push(data)
        },
   
    },
})



// Action creators are generated for each case reducer function
export const { getformdata } = formDataSlice.actions
export default formDataSlice.reducer
