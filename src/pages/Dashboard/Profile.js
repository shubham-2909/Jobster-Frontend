import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormRow } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { toast } from 'react-toastify'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, location, lastName } = userData
    if (!name || !email || !location || !lastName) {
      toast.error('Please fill all the fields')
      return
    }
    dispatch(updateUser({ name, email, location, lastName }))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({ ...userData, [name]: value })
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className='form-center'>
          <FormRow
            name={`name`}
            type={`text`}
            value={userData.name}
            onChange={handleChange}
          />
          <FormRow
            name={`email`}
            type={`email`}
            value={userData.email}
            onChange={handleChange}
          />
          <FormRow
            labelText={`last name`}
            name={`lastName`}
            type={`text`}
            value={userData.lastName}
            onChange={handleChange}
          />
          <FormRow
            name={`location`}
            type={`text`}
            value={userData.location}
            onChange={handleChange}
          />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
