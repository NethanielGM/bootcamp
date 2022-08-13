import { createContext, useEffect, useState } from 'react'

import jwtDecode from 'jwt-decode'

import axios from 'axios'

import { getCookie } from 'react-use-cookie'

import { useNavigate } from 'react-router-dom'

export const api = 'http://localhost:5001'

export const AuthContext = createContext()

axios.defaults.withCredentials = true

export const AuthProvider = (props) => {

    // PROPS
    const { children } = props

    // NAVIGATION
    const navigate = useNavigate()

    // COOKIE
    const hasCookie = !!getCookie('refreshToken')

    // LOGIN HANDLER
    const [showLogin, setShowLogin] = useState(false);
    const loginClose = () => setShowLogin(false);
    const handleLogin = () => setShowLogin(true);

    // REGISTER HANDLER
    const [showSignUp, setShowSignUp] = useState(false);
    const signUpClose = () => setShowSignUp(false);
    const handleSignUp = () => setShowSignUp(true);

    // STATES
    const [usersData, setUsersData] = useState([])
    const [user, setUser] = useState(false)
    const [userById, setUserById] = useState([])
    const [token, setToken] = useState(false)
    const [expire, setExpire] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [shouldRefresh, setShouldRefresh] = useState(hasCookie)
    const [userPets, setUserPets] = useState([])
    // AXIOS WITH JWT
    const axiosJWT = axios.create({
        withCredentials: false, headers: { 'Content-Type': 'application/json', },
    })
    axiosJWT.interceptors.request.use(
        async (config) => {
            const response = await axios.get(`${api}/token`)
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setExpire(decoded.exp)
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // REGISTER
    const register = async (newUser) => {
        if (loading) return
        setLoading(true)
        try {
            await axios.post(`${api}/signup`, newUser)
            const { email, password } = newUser
            login({ email, password })
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // LOGIN
    const login = async (credential) => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axios.post(`${api}/login`, credential)
            setToken(response.data.accessToken)
            setShouldRefresh(true)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // LOGOUT
    const logout = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axios.delete(`${api}/logout`)
            if (!response.data) throw new Error('Could not log out properly')
            setToken(false)
            setUser(false)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // TOKEN
    const refreshToken = async () => {
        if (loading && !token) return
        setLoading(true)
        try {
            const response = await axios.get(`${api}/token`)
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setUser(decoded?.user)
            setExpire(decoded?.exp)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // GET USERS
    const getAllUsers = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosJWT.get(`${api}/user`)
            setUsersData(response.data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // GET USER BY ID
    const getUserById = async (userId) => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosJWT.get(`${api}/user/${userId}`)
            setUserById(response.data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // GET FULL USER BY ID
    const getFullUserById = async (userId) => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosJWT.get(`${api}/user/${userId}/full`)
            setUserById(response.data[0])
            setUserPets(response.data[0].pets)
            console.log('FULL USER RESPONSE', response.data[0]);
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // PATCH USER
    const update = async (newUser) => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosJWT.patch(`${api}/user/edit`, newUser)
            alert("Changes saved")
            setUser(response.data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // PATCH ROLE
    const assignRole = async (newRole) => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosJWT.patch(`${api}/user/admin/edit`, newRole)
            setUserById(response.data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // REFRESH TOKEN HANDLER
    useEffect(() => {
        if (shouldRefresh) {
            refreshToken()
            setShouldRefresh(false)
        }
        return () => refreshToken()
    }, [shouldRefresh])

    // ERROR HANDLER
    useEffect(() => {
        if (error) {
            if (error.response.data.message) {
                if (error.response.status === 403) {
                    console.log(`Error ${error.response.status}: ${error.response.data.message}. session expired`)
                    navigate("/")
                    return
                }
                const { status, data } = error.response
                alert(`Error (${status}): ${data.message}`)
            }
            setError(false)
        }
    }, [error])
    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                expire,
                error,
                axiosJWT,
                usersData,
                showLogin,
                showSignUp,
                userById,
                userPets,
                handleLogin,
                loginClose,
                handleSignUp,
                signUpClose,
                setToken,
                setExpire,
                register,
                update,
                login,
                logout,
                refreshToken,
                getAllUsers,
                getUserById,
                assignRole,
                getFullUserById

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
