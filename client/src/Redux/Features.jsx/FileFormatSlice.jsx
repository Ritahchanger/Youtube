import { createSlice } from "@reduxjs/toolkit";


const initialState={

    format:'video'

}


const FileFormatSlice=createSlice({

    name:'downloadFormat',

    initialState,
    
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