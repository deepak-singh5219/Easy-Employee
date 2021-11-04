import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth-slice';

const store = configureStore({
    reducer:{
        authSlice
    }
})


export default store;