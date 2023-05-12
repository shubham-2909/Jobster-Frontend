import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'

let user = null
if (getUserFromLocalStorage()) {
  user = getUserFromLocalStorage().user
}

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user,
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thinkAPI) => {
    try {
      const resp = await customFetch.post('/api/v1/auth/register', user)
      return resp.data
    } catch (error) {
      return thinkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post(`/api/v1/auth/login`, user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser: (state) => {
      state.isSidebarOpen = false
      state.user = null
      removeUserFromLocalStorage()
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user, token } = payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage({ user, token })
      toast.success(`Hello there ${user.name}`)
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },

    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user, token } = payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage({ user, token })
      toast.success(`Welcome back ${user.name}`)
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { toggleSidebar, logoutUser } = userSlice.actions

export default userSlice.reducer
