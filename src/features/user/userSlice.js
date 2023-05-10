import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
} from '../../utils/localStorage'

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
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
      console.log(resp.data)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)
const userSlice = createSlice({
  name: 'user',
  initialState,
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
      console.log(user)
      addUserToLocalStorage({ user, token })
      toast.success(`Welcome back ${user.name}`)
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export default userSlice.reducer