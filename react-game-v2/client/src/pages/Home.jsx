import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ScoreContext } from '../context/ScoreContext'

axios.defaults.withCredentials = true

const Home = () => {
    const { user } = useContext(AuthContext)
    const { topScores, lastScore } = useContext(ScoreContext)

    const navigate = useNavigate()

    const handleGame = () => {
        navigate('/games')
    }

    return (
        <>
            {user ? (
                <div className="app mt-5">
                    <h1 className="text-center mt-5">Hello {user.nickname}</h1>
                    <div className="game__score-highscore">
                        <h2 className="game__score-number">previous score</h2>
                        <h2 className="game__score-score">
                            {lastScore ? lastScore : '-'}
                        </h2>
                    </div>
                    <h1 className="text-center mt-2 ">Best Scores:</h1>
                    {topScores &&
                        topScores.map((topScore, i) => (
                            <div
                                key={topScore.scoreId}
                                className="game__score-highscore"
                            >
                                <h2 className="game__score-number">{i + 1}</h2>
                                <h2 className="game__score-score">
                                    {topScore.score > 0 ? topScore.score : '-'}
                                </h2>
                            </div>
                        ))}

                    <button
                        onClick={handleGame}
                        className="game__menu-button mt-5 mb-5"
                    >
                        {'Start Cub>erun'}
                    </button>
                    <span className="game__menu-controls">
                        <h1>TUTORIAL:</h1>
                        <h2 className="mb-5">
                            GET THE HIGHEST SCORE WITHOUT CRASHING INTO
                            OBSTACLES
                        </h2>
                        <h1>CONTROLS:</h1>
                        <h1 className="mb-5">← a / d →</h1>
                    </span>
                </div>
            ) : (
                <div className="mx-auto p-2 w-50 text-center">
                    <img
                        className="game__logo"
                        src="cuberun-logo.png"
                        alt="Cuberun Logo"
                    />
                    <br />
                    (made by{' '}
                    <a
                        style={{ fontSize: '24px' }}
                        href="https://github.com/akarlsten/cuberun"
                    >
                        akarlsten
                    </a>
                    )<br />
                    <span>In his words:</span>
                    <br />
                    <div
                        style={{
                            color: '#CCC',
                            fontSize: 'initial',
                            lineHeight: 'initial',
                            fontFamily: 'sans-serif',
                        }}
                    >
                        "The game is inspired by an old flash game I used to
                        play in the late 2000s called Cubefield.
                        <br />
                        My version is in full 3D and built with React, THREE.js
                        and react-three-fiber to glue them together. I went for
                        a synthwave aesthetic, including some self-composed
                        music, which the visual effects are synced to (so turn
                        the music on!). Also features high scores stored
                        locally. The development process will be detailed on my
                        website."
                    </div>
                </div>
            )}
        </>
    )
}
export default Home
