import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import axios from 'axios'

import { api } from './AuthContext'
import { AuthContext } from './AuthContext'

// config
axios.defaults.withCredentials = true

export const ScoreContext = createContext()

export const ScoreProvider = (props) => {
    // Props
    const { children } = props

    // State
    const [error, setError] = useState(false)
    const [topScores, setTopScores] = useState(false)
    const [highScore, setHighScore] = useState(false)
    const [lastScore, setLastScore] = useState(false)
    const [newScore, setNewScore] = useState(false)

    // Context
    const { user, axiosJWT } =
        useContext(AuthContext)

    const addScore = async (score) => {
        try {
            const res = await axiosJWT.post(`${api}/addScore`, {
                userId: user.id,
                score: Math.round(score),
            })
            setNewScore(res)
            return res
        } catch (err) {
            setError(err)
        }
    }

    const getTopScores = async (sort, limit, order) => {
        try {
            const res = await axiosJWT.get(`${api}/topScores/${user.id}`)
            setTopScores(res.data)
            return res
        } catch (err) {
            setError(err)
        }
    }

    const getHighScore = async () => {
        try {
            const res = await axiosJWT.get(`${api}/highScore/${user.id}`)
            setHighScore(res.data.score)
            return res
        } catch (err) {
            setError(err)
        }
    }

    const getLastScore = async () => {
        try {
            const res = await axiosJWT.get(`${api}/lastScore/${user.id}`)
            setLastScore(res.data.score)
            return res
        } catch (err) {
            setError(err)
        }
    }

    const updateScores = async () => {
        if (!user) return
        try {
            await getTopScores()
            await getHighScore()
            await getLastScore()
        } catch (err) {
            setError(err)
        }
    }

    useEffect(() => {
        if (user) updateScores()
    }, [user, newScore]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (error) {
            if (error.response) {
                const { status, data } = error.response
                console.error(`Error (${status}): ${data.message}`)
            }
            setError(false)
        }
    }, [error])

    // Intercept get requests

    // Return
    return (
        <ScoreContext.Provider
            value={{
                error,
                addScore,
                topScores,
                getTopScores,
                highScore,
                getHighScore,
                lastScore,
                getLastScore,
            }}
        >
            {children}
        </ScoreContext.Provider>
    )
}
