import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import mainSlice from './main-slice';
import teamSlice from './team-slice';
import userSlice from './user-slice';

const store = configureStore({
    reducer:{
        authSlice,
        mainSlice,
        teamSlice,
        userSlice,
    }
})


export default store;