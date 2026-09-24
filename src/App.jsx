import { useState } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router'
import Login from './pages/login.jsx'
import Home from './pages/Home.jsx'
import Posts from './pages/Posts.jsx'
function App() {
  const [usuario, setUsuario] = useState(() => {
    return localStorage.getItem('usuario')
  }
)
  const navigate = useNavigate()
  function fazerLogin(email){
    localStorage.setItem('usuario', email)
    setUsuario(email)
    navigate('/home')
  }
  function fazerLogout(){
    localStorage.removeItem('usuario')
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
        element={usuario ? <Navigate to="/home" replace/> : <Login onLogin={fazerLogin} />}
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
      <Route
        path="/posts"
        element={
          usuario ? <Posts /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  )
}

export default App
