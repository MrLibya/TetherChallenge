import { configureStore } from '@reduxjs/toolkit'

import WebSocketReducer from './slice/WebSocketSlice'

export default configureStore({
  reducer: {
    webSocket: WebSocketReducer,
  }
})