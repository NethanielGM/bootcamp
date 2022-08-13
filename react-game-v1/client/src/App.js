import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Signup from './components/authentication/SignUp'
import React from 'react'
import { AuthProvider } from './context/AuthContext'
import Login from './components/authentication/Login'
import Home from './pages/Home'
import './App.css'
import './styles/normalize.css'
import './styles/index.css'
import CubeWorld from './components/CubeWorld'

import { ScoreProvider } from './context/ScoreContext'
import Restricted from './routes/Restricted'

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <ScoreProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route
                            path="/games"
                            element={
                                <Restricted>
                                    <CubeWorld bgColor="#141622" />
                                </Restricted>
                            }
                        />

                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </ScoreProvider>
            </AuthProvider>
        </Router>
    )
}
export default App
