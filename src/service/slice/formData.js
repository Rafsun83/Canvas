import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    formdata:[],
canvasRemove: {},   
}
//create slice and reducer
export const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        //create shape form data action
        getformdata: (state, action) => {
            const data = action.payload
            state.formdata.push(data)
        },
        //delete shape reducer action
        deleteformdata: (state, action) => {
           return {
            ...state,
            formdata: state.formdata.filter(({id}) => id!==action.payload)
            };
        },
        //canvas drwn image remove
        canvasRemove: (state, action) => {
            const canvas = action.payload
            state.canvasRemove = canvas

        }
   
    },
})

// Action creators are generated for each case reducer function
export const { getformdata,deleteformdata, canvasRemove } = formDataSlice.actions
export default formDataSlice.reducer
