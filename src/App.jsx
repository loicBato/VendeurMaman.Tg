// import './App.css'
import { AuthProvider } from './Components/Context/AuthContext'
import Router from './Components/Utils/Router'

function App() {

  return (
    <>
    <AuthProvider>
      <Router />
      </AuthProvider>
    </>
  )
}

export default App
