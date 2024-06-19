import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './modules/Landing'
import Login from './modules/Login'
import Disciplines from './modules/Dashboard/Disciplines'
import Teachers from './modules/Dashboard/Teachers'
import Events from './modules/Dashboard/Events'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/disciplines" element={<Disciplines />} />
        <Route path="/dashboard/teachers" element={<Teachers />} />
        <Route path="/dashboard/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
