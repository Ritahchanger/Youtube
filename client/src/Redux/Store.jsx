import { configureStore } from "@reduxjs/toolkit"


import YoutubeSlice from "./Features.jsx/YoutubeSlice";


const Store = configureStore({

    reducer:{

        downloader:YoutubeSlice.reducer,


    }

})


export default Store;