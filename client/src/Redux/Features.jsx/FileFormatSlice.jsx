import { createSlice } from "@reduxjs/toolkit";

const FileFormatSlice=createSlice({

    name:'downloadFormat',

    initialState:{

        format:'video'

    },

    reducers:{

        setAudio:(state,action)=>{

            state.format = action.payload

        },

        setVideo:(state,action)=>{

            state.format = action.payload
        }

    }

})

export const { setAudio,setVideo } = FileFormatSlice.actions;


export default FileFormatSlice