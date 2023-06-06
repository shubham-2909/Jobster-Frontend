import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import { loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk'

let user = null
if (getUserFromLocalStorage()) {
  const { name, email, location, lastName } = getUserFromLocalStorage().user
  user = { name, email, lastName, location }
}

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user,
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/api/v1/auth/register', user, thunkAPI)
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/api/v1/auth/login', user, thunkAPI)
  }
)
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('/api/v1/auth/updateUser', user, thunkAPI)
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
      const { user } = payload
      const { name, lastName, location, email } = user
      state.isLoading = false
      state.user = { name, lastName, email, location }
      addUserToLocalStorage({ user })
      toast.success(`Hello there ${name}`)
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },

    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      const { name, lastName, location, email } = user
      state.isLoading = false
      state.user = { name, lastName, email, location }
      addUserToLocalStorage({ user })
      toast.success(`Welcome back ${name}`)
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      const { user } = payload
      const { name, email, lastName, location } = user
      state.user = { name, email, lastName, location }
      addUserToLocalStorage({ user })
      toast.success('User Updated')
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { toggleSidebar, logoutUser } = userSlice.actions

export default userSlice.reducer
