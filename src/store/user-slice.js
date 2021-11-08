import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    freeEmployees:null,
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
        }
    }
})

export const {setFreeEmployees,setTeamMembers} = userSlice.actions;
export default userSlice.reducer;