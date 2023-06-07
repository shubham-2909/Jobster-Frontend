import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import customFetch from '../../utils/axios'
import { logoutUser } from '../user/userSlice'
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice'
const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
}

export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    try {
      const { token } = getUserFromLocalStorage().user
      const resp = await customFetch.post('/api/v1/jobs', job, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      thunkAPI.dispatch(clearValues())
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue('Unauthorized user!')
      }

      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => {
    const { token } = getUserFromLocalStorage().user
    thunkAPI.dispatch(showLoading())
    try {
      const resp = await customFetch.delete(`/api/v1/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      thunkAPI.dispatch(getAllJobs())
      return resp.data
    } catch (error) {
      thunkAPI.dispatch(hideLoading())
      thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const editJob = createAsyncThunk(
  'job/editJob',
  async ({ jobId, job }, thunkAPI) => {
    const { token } = getUserFromLocalStorage().user
    try {
      const resp = await customFetch.patch(`/api/v1/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      thunkAPI.dispatch(clearValues())
      return resp.data
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
)
const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },

    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage().user?.location || '',
      }
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      toast.success('Job Created')
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [deleteJob.fulfilled]: () => {
      toast.success('Job Removed Successfully!')
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload)
    },
    [editJob.pending]: (state) => {
      state.isLoading = true
    },
    [editJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      toast.success('Job Edited')
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions
export default jobSlice.reducer