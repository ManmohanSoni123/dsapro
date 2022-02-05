import { createSlice } from "@reduxjs/toolkit";

const initialState = {Dsasheet:new Array}

const sheetDataSlice = createSlice({
    name:"Dsa450",
    initialState,
    reducers:{
        setDsaData(state,action){
        const temp = action.payload;
        console.log(temp);
        state.Dsasheet = temp;
        },


    },
});

const sheetDataActions =  sheetDataSlice.actions;
export {sheetDataActions};
export default sheetDataSlice;