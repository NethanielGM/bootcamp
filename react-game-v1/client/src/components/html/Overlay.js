import { useProgress } from '@react-three/drei'
import { useState, useEffect } from 'react'
import Loader from './CustomLoader'
import '../../styles/gameMenu.css'
import { useStore } from '../../state/useStore'

const Overlay = () => {


  const [shown, setShown] = useState(true)
  const [opaque, setOpaque] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const { active, progress } = useProgress()

  const gameStarted = useStore(s => s.gameStarted)
  const gameOver = useStore(s => s.gameOver)
  const setGameStarted = useStore(s => s.setGameStarted)
  const musicEnabled = useStore(s => s.musicEnabled)
  const enableMusic = useStore(s => s.enableMusic)
  const setHasInteracted = useStore(s => s.setHasInteracted)
  useEffect(() => {
    if (gameStarted || gameOver) {
      setShown(false)
    } else if (!gameStarted) {
      setShown(true)
    }
  }, [gameStarted, active, gameOver])

  useEffect(() => {
    let t
    if (hasLoaded === opaque) t = setTimeout(() => setOpaque(!hasLoaded), 300)
    return () => clearTimeout(t)
  }, [hasLoaded, opaque])

  useEffect(() => {
    localStorage.setItem('musicEnabled', JSON.stringify(musicEnabled))
  }, [musicEnabled])

  useEffect(() => {
    if (progress >= 100) {
      setHasLoaded(true)
    }
  }, [progress])

  const handleStart = () => {
    setGameStarted(true)
  }
  const handleEnd = () => {
    window.location.replace("/")
  }

  const handleMusic = () => {
    enableMusic(!musicEnabled)
  }

  return shown ? (
    <div onClick={() => setHasInteracted()} className={`game__container`} style={{ opacity: shown ? 1 : 0, background: opaque ? '#141622FF' : '#141622CC' }}>
      <div className="game__menu">
        <img className="game__logo" src="cuberun-logo.png" alt="Cuberun Logo" />
        <div className="game__subcontainer">
          {!hasLoaded ? (
            <Loader active={active} progress={progress} />
          ) : (
            <>
              <button onClick={handleStart} className="game__menu-button">{'STA>RT'}</button>
              <button onClick={handleEnd} className="game__menu-button">{'QUI>T'}</button>
              <div className="game__menu-options">
                <button onClick={handleMusic} className="game__menu-button game__menu-button-music">{`TURN MUSIC ${musicEnabled ? 'OF>F' : 'O<N'}`}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div >
  ) : null
}

export default Overlay