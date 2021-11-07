import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import mainSlice from './main-slice';

const store = configureStore({
    reducer:{
        authSlice,
        mainSlice
    }
})


export default store;