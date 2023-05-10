import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Landing, Register, Error, Dashboard } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='register' element={<Register />} />
        <Route path='landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </Router>
  )
}

export default App
