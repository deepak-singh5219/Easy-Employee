const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    team:{
        leader:null,
        information:{
            employee:0
        }
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
        setTeamLeader : (state,action) =>
        {
            state.team.leader = action.payload;
        },
        setTeamInformation:(state,action) =>
        {
            state.team.information = action.payload;
        },
        updateEmployeeCount : (state,action) =>
        {
            if(action.payload==='INCREMENT')
                state.team.information.employee = state.team.information.employee+1;
            else if(action.payload==='DECREMENT')
            {
                state.team.information.employee = state.team.information.employee-1;
            }
            else
                console.log('No Matching Action Found');
        }
    }
})


export const {setTeam,setTeamInformation,updateEmployeeCount,setTeamLeader} = teamSlice.actions;
export default teamSlice.reducer;