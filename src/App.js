import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Landing, Register, Error, ProtectedRoute } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  SharedLayout,
  Profile,
  Stats,
  AddJob,
  AllJobs,
} from './pages/Dashboard'
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='register' element={<Register />} />
        <Route path='landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </Router>
  )
}

export default App
