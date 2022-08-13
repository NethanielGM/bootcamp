import { useState, useEffect, useContext } from 'react'

import cubeRunLogo from '../../textures/cuberun-logo.png'

import '../../styles/gameMenu.css'

import { useStore } from '../../state/useStore'

import axios from 'axios'
import { ScoreContext } from '../../context/ScoreContext'
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true

const GameOverScreen = () => {
    const [shown, setShown] = useState(false)
    const [opaque, setOpaque] = useState(false)

    const { addScore } = useContext(ScoreContext)

    const gameOver = useStore((s) => s.gameOver)
    const score = useStore((s) => s.score)

    const navigate = useNavigate()

    const handleGameOver = async () => {
        await addScore(score)
    }

    useEffect(() => {
        let t
        if (gameOver !== opaque) t = setTimeout(() => setOpaque(gameOver), 500)
        return () => clearTimeout(t)
    }, [gameOver, opaque])

    useEffect(() => {
        if (gameOver) {
            setShown(true)
        } else {
            setShown(false)
        }
    }, [gameOver])

    useEffect(() => {
        if (gameOver) handleGameOver()
        return () => handleGameOver()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameOver])

    const handleRestart = () => {
        navigate(0)
    }
    const handleEnd = () => {
        navigate('/')
    }
    
    return shown ? (
        <div
            className="game__container"
            style={{
                opacity: shown ? 1 : 0,
                background: opaque ? '#141622FF' : '#141622CC',
            }}
        >
            <div className="game__menu">
                <img
                    className="game__logo-small"
                    width="512px"
                    src={cubeRunLogo}
                    alt="Cuberun Logo"
                />
                <h1 className="game__score-gameover">GAME OVER</h1>
                <div className="game__scorecontainer">
                    <div className="game__score">
                        <h1 className="game__score-title">SCORE</h1>
                        <h1 className="game__score">{score.toFixed(0)}</h1>
                    </div>
                </div>
                <button onClick={handleRestart} className="game__menu-button">
                    RESTART
                </button>
                <button onClick={handleEnd} className="game__menu-button mb-5">
                    {'QUI>T'}
                </button>
            </div>
        </div>
    ) : null
}

export default GameOverScreen
