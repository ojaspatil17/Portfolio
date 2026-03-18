import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

/* Fallback Data */
const fallbackProjects = [
  {
    id: 1,
    title: 'HireHub',
    subtitle: 'Online Hiring Platform',
    description: 'A full-stack hiring platform with smart matching and real-time updates.',
    techStack: ['Java', 'Spring Boot', 'React', 'MySQL', 'Redux'],
    githubLink: 'https://github.com/ojaspatil17/hirehub',
    liveLink: null,
    featured: true,
    color: '#00D4FF',
  },
  {
    id: 2,
    title: 'MedTracker',
    subtitle: 'Medicine Tracker',
    description: 'Medication reminder and tracking system with alerts.',
    techStack: ['React', 'Spring Boot', 'MySQL'],
    githubLink: 'https://github.com/ojaspatil17/shopmed',
    liveLink: null,
    featured: true,
    color: '#8B5CF6',
  },
  {
    id: 3,
    title: 'LibraryOS',
    subtitle: 'Library System',
    description: 'Library management system with search and admin panel.',
    techStack: ['Java', 'Spring MVC', 'MySQL'],
    githubLink: 'https://github.com/ojaspatil17/librarymanagement',
    liveLink: null,
    featured: false,
    color: '#06FFC8',
  },
]

/* Async Thunk */
export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/api/projects`)
      return res.data
    } catch (err) {
      return rejectWithValue('API failed, using fallback data')
    }
  }
)

/* Slice */
const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload

        // ✅ Use fallback here (correct place)
        state.items = fallbackProjects
      })
  }
})

export default projectsSlice.reducer