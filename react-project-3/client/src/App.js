import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import React from 'react'
import { AuthProvider } from './context/AuthContext'
import Profile from './components/pages/user/Profile'
import Pets from './components/pages/user/Pets'
import Home from './components/pages/user/Home'
import Background from './styles/Background.jsx'


import { PetProvider } from './context/PetContext'
import Restricted from './routes/Restricted'
import Search from './components/pages/user/Search'
import UsersDashboard from './components/pages/admin/UsersDashboard'
import PetsDashboard from './components/pages/admin/PetsDashboard'
import AddPet from './components/pages/admin/AddPet'
import PetInfo from './components/cards/PetInfo'

import './styles/App.css'
import './styles/index.css'
import './styles/background.css'
import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => {
    return (
        <Router>
            <AuthProvider>
                <PetProvider>
                    <Background />
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route
                            path="/profile"
                            element={
                                <Restricted>
                                    {<Profile />}
                                </Restricted>
                            }
                        />
                        <Route
                            path="/pets"
                            element={
                                <Restricted>
                                    {<Pets />}
                                </Restricted>
                            }
                        />
                        <Route
                            path="/admin/add"
                            element={
                                <Restricted>
                                    {<AddPet />}
                                </Restricted>
                            }
                        />

                        <Route
                            path="/info/:id"
                            element={
                                <Restricted>
                                    {<PetInfo />}
                                </Restricted>
                            }
                        />
                        <Route
                            path="/admin/users"
                            element={
                                <Restricted>
                                    {<UsersDashboard />}
                                </Restricted>
                            }
                        />
                        <Route
                            path="/admin/pets"
                            element={
                                <Restricted>
                                    {<PetsDashboard />}
                                </Restricted>
                            }
                        />
                    </Routes>
                </PetProvider>
            </AuthProvider>
        </Router>
    )
}
export default App
