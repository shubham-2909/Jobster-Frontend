import customFetch from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { clearStore, logoutUser } from './userSlice'
import { clearAllJobs } from '../allJobs/allJobsSlice'
import { clearValues } from '../job/jobSlice'
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
      thunkAPI.dispatch(clearStore())
      return thunkAPI.rejectWithValue('Session expired Please login again...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    //clear all jobs
    thunkAPI.dispatch(clearAllJobs())
    // clear job values in job Slice
    thunkAPI.dispatch(clearValues())
    // logging out the user
    thunkAPI.dispatch(logoutUser(message))

    return Promise.resolve()
  } catch (error) {
    console.log(error)
    return Promise.reject()
  }
}
