import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    navOpen: false,
    activeSection: 'home',
    loading: false,
  },
  reducers: {
    toggleNav: (state) => { state.navOpen = !state.navOpen },
    closeNav: (state) => { state.navOpen = false },
    setActiveSection: (state, action) => { state.activeSection = action.payload },
  }
})

export const { toggleNav, closeNav, setActiveSection } = uiSlice.actions
export default uiSlice.reducer
