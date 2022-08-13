import { createContext, useEffect, useState } from 'react'

import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { getCookie } from 'react-use-cookie'

// config
axios.defaults.withCredentials = true

export const api = 'http://localhost:5001'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    // Props
    const { children } = props
    const hasCookie = !!getCookie('refreshToken')

    // State
    const [user, setUser] = useState(false)
    const [token, setToken] = useState(false)
    const [expire, setExpire] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [shouldRefresh, setShouldRefresh] = useState(hasCookie)

    const axiosJWT = axios.create({
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    axiosJWT.interceptors.request.use(
        async (config) => {
            // if (expire * 1000 < new Date().getTime()) {
                const response = await axios.get(`${api}/token`)
                config.headers.Authorization = `Bearer ${response.data.accessToken}`
                setToken(response.data.accessToken)
                const decoded = jwtDecode(response.data.accessToken)
                setExpire(decoded.exp)
            // }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // Add a request interceptor

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

    const login = async (credential) => {
        if (loading) return
        setLoading(true)
        try {
            const res = await axios.post(`${api}/login`, credential)
            setToken(res.data.accessToken)
            setShouldRefresh(true)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    const logout = async () => {
        if (loading) return
        setLoading(true)
        try {
            const res = await axios.delete(`${api}/logout`)
            if (!res.data) throw new Error('Could not log out properly')
            setToken(false)
            setUser(false)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

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

    useEffect(() => {
        if (shouldRefresh) {
            refreshToken()
            setShouldRefresh(false)
        }
        return () => refreshToken()
    }, [shouldRefresh]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (error) {
            if (error.response.data.message) {
                const { status, data } = error.response
                alert(`Error (${status}): ${data.message}`)
                console.error(`Error (${status}): ${data.message}`)
            }
            setError(false)
        }
    }, [error])

    // Return
    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                setToken,
                expire,
                setExpire,
                error,
                register,
                login,
                logout,
                refreshToken,
                axiosJWT,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
