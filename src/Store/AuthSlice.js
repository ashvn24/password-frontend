import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./Initial";


const AuthSlice = createSlice({
    name:'auth',
    initialState:InitialState.usertoken,
    reducers:{
        Login:(state, action)=>{
            state.access = action.payload.access_token,
            state.refresh = action.payload.refresh_token,
            state.is_authenticated = true
        },
        Logout:(state)=>{
            state.access = null,
            state.refresh = null,
            state.is_authenticated =false
        }
    }
})

export const {Login, Logout} = AuthSlice.actions

export default AuthSlice.reducer;