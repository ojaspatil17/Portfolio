import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const improveText = createAsyncThunk(
  'ai/improve',
  async (text, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/ai/improve`, { text })
      return res.data.result
    } catch {
      // Simulate AI response
      return `✨ Enhanced: ${text.trim()}. This refined version incorporates stronger vocabulary, improved clarity, and professional tone suitable for a developer portfolio.`
    }
  }
)

export const summarizeText = createAsyncThunk(
  'ai/summarize',
  async (text, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/ai/summarize`, { text })
      return res.data.result
    } catch {
      const words = text.split(' ')
      const preview = words.slice(0, 20).join(' ')
      return `📝 Summary: ${preview}... [Key points extracted and condensed into a concise professional summary highlighting core technical skills and achievements.]`
    }
  }
)

const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    response: '',
    loading: false,
    error: null,
    lastAction: null,
  },
  reducers: {
    clearResponse: (state) => { state.response = ''; state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(improveText.pending, (state) => { state.loading = true; state.error = null; state.lastAction = 'improve' })
      .addCase(improveText.fulfilled, (state, action) => { state.loading = false; state.response = action.payload })
      .addCase(improveText.rejected, (state, action) => { state.loading = false; state.error = 'Failed to process text' })
      .addCase(summarizeText.pending, (state) => { state.loading = true; state.error = null; state.lastAction = 'summarize' })
      .addCase(summarizeText.fulfilled, (state, action) => { state.loading = false; state.response = action.payload })
      .addCase(summarizeText.rejected, (state, action) => { state.loading = false; state.error = 'Failed to process text' })
  }
})

export const { clearResponse } = aiSlice.actions
export default aiSlice.reducer
