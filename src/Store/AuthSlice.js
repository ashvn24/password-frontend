import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./Initial";


const AuthSlice = createSlice({
    name:'auth',
    initialState:InitialState.usertoken,
    reducers:{
        Login:(state, action)=>{
            state.access = action.payload.access,
            state.refresh = action.payload.refresh
            state.is_authenticated = true
        }
    }
})

export const {Login} = AuthSlice.actions

export default AuthSlice.reducer;