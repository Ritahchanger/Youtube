import { configureStore } from "@reduxjs/toolkit"


import FileFormatSlice from "./Features.jsx/FileFormatSlice";

import YoutubeSlice from "./Features.jsx/YoutubeSlice";


const Store = configureStore({

    reducer:{

        downloader:YoutubeSlice.reducer,

        downloadFormat:FileFormatSlice.reducer,


    }

})


export default Store;