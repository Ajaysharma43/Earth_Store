import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const GetData = createAsyncThunk('FetchData' , async({Limit,currentPage}) => {
    const Response = await axios.get(`${URL}/Data/data?limit=${Limit}&currentPage=${currentPage}`)
    console.log(Response.data.Data);
    return Response.data
})

const initialState  = {
    isLoading : true,
    data : [],
    totalpages : null,
    initialpage : 1,
    isError : false
}

const Reducer = createSlice({
    name:"DataFetch",
    initialState ,
    reducers : {
        increament : (state , action) => {
            if(state.initialpage == state.totalpages)
            {
            state.initialpage = state.totalpages;
            }
            else
            {
                state.initialpage = state.initialpage + 1;
            }
        },
        decreament : (state , action) => {
            if(state.initialpage == 1)
            {
                state.initialpage = 1
            }
            else
            {
                state.initialpage  = state.initialpage - 1
            }
        },
        custom : (state , action) => {
            state.initialpage = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(GetData.fulfilled , (state , action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.data = action.payload.Data;
            state.totalpages = action.payload.totalpages
        })
    }
})

export const {increament , decreament , custom} = Reducer.actions;

export default Reducer.reducer;