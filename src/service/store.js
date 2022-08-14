import { configureStore } from '@reduxjs/toolkit'
import AddShapeReducer from './slice/addShape'
import formDataReducer from './slice/formData';

//Redux Store declear
export const store = configureStore({
    reducer: {
        addShape: AddShapeReducer,
        formData: formDataReducer,
    },
    devTools: true,
})
