import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/UserSlice'

export const store = configureStore({
  reducer: {
      user:userReducer
  },
})