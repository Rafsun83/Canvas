import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../service/slice/counter'
import AddShapeReducer from './slice/addShape'
import formDataReducer from './slice/formData';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        addShape: AddShapeReducer,
        formData: formDataReducer
        
    },
    devTools: true,
})
