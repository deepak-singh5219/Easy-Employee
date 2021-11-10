import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    freeEmployees:null,
    freeLeaders:null,
    teamMembers:null
}

export const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        setFreeEmployees : (state,action) =>
        {
            state.freeEmployees = action.payload
        },
        setTeamMembers : (state,action) =>
        {
            state.teamMembers = action.payload;
        },
        setFreeLeaders:(state,action) =>
        {
            state.freeLeaders = action.payload;
        }
    }
})

export const {setFreeEmployees,setTeamMembers,setFreeLeaders} = userSlice.actions;
export default userSlice.reducer;