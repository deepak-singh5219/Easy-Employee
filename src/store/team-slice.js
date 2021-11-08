const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    team:null
}

export const teamSlice = createSlice({
    name:'teamSice',
    initialState,
    reducers:{
        setTeam:(state,action) =>
        {
            state.team = action.payload;
        }
    }
})


export const {setTeam} = teamSlice.actions;
export default teamSlice.reducer;