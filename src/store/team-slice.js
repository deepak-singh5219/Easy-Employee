const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    team:null,
    teamInformation:{
        employee:0
    }
}

export const teamSlice = createSlice({
    name:'teamSice',
    initialState,
    reducers:{
        setTeam:(state,action) =>
        {
            state.team = action.payload;
        },
        setTeamInformation:(state,action) =>
        {
            state.teamInformation = action.payload;
        },
        updateEmployeeCount : (state,action) =>
        {
            if(action.payload==='INCREMENT')
                state.teamInformation.employee = state.teamInformation.employee+1;
            else if(action.payload==='DECREMENT')
            {
                state.teamInformation.employee = state.teamInformation.employee-1;
            }
            else
                console.log('No Matching Action Found');
        }
    }
})


export const {setTeam,setTeamInformation,updateEmployeeCount} = teamSlice.actions;
export default teamSlice.reducer;