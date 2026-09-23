import { useState } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router'
import Login from './pages/login.jsx'
import Home from './pages/Home.jsx'
function App() {
  const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate()
  function fazerLogin(email){
    setUsuario(email)
    navigate('/home')
  }
  function fazerLogout(){
    setUsuario(null)
    navigate('/login')
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={usuario ? '/home' : '/login'}
            replace
          />
        }
      />

      <Route
        path="/login"
        element={<Login onLogin={fazerLogin} />}
      />

      <Route
        path="/home"
        element={
          usuario
            ? <Home email={usuario} onLogout={fazerLogout} />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}

export default App
