import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './projectsSlice'
import aiReducer from './aiSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    ai: aiReducer,
    ui: uiReducer,
  },
})
