import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        redirectUrl: "",
    },
    reducers:{
        login:(state, action)=>{
    state.user = action.payload;
    state.redirectUrl = "";
    },
    logout: (state)=> {
        state.user = null;
    },
    setRedirectUrl: (state, action) =>{
        state.redirectUrl = action.payload;
    }

    },
});
export const{login, logout, setRedirectUrl} = userSlice.actions;
export const selectUser =(state) => state.user.user;
export const selectRedirectUrl = (state) =>state.user.redirectUrl;
export default userSlice.reducer;