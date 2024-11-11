import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    thumbnail:"null"

}

const YoutubeSlice = createSlice({


    name:"downloader",

    initialState,

    reducers:{

        saveThumbnail:(state)=>{

            state.thumbnail = action.payload

        },

        removeThumbnail:(state)=>{

            state.thumbnail = null

        }

    }


})


export const { saveThumbnail,removeThumbnail } = YoutubeSlice.reducer;


export default YoutubeSlice