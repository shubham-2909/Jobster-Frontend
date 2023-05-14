import customFetch from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { logoutUser } from './userSlice'

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user)
    return resp.data
  } catch (error) {
    console.log(error.response)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user)
    return resp.data
  } catch (error) {
    console.log(error.response)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const { token } = getUserFromLocalStorage().user
    const resp = await customFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return resp.data
  } catch (error) {
    console.log(error.response)
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized user! Logging out')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
