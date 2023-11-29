import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const five_minutes = 5 * 60
  const [whiteTime, setWhiteTime] = useState(five_minutes)
  const [blackTime, setBlackTime] = useState(five_minutes)

  const [isActive, setIsActive] = useState(false)
  const [isWhite, setIsWhite] = useState(null) // 'white'
  const [isBlack, setIsBlack] = useState(null) // 'white'

  useEffect(() => {
    let interval

    if (isActive) {
      interval = setInterval(() => {
        if (isWhite === 'active') {
          setWhiteTime((prevWhiteTime) => prevWhiteTime - 1)
        }
        if (isBlack === 'active') {
          setBlackTime((prevBlackTime) => prevBlackTime - 1)
        }
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, isWhite, isBlack])

  function handleTimerClick(timer) {
    if (timer === 'black') {
      setIsActive(true)
      setIsWhite('')
      setIsBlack('active')
    }
    if (timer === 'white') {
      setIsActive(true)
      setIsWhite('active')
      setIsBlack('')
    }
  }

  const whiteMinutes = Math.floor(whiteTime / 60)
  const whiteRemainingSeconds = whiteTime % 60

  const blackMinutes = Math.floor(blackTime / 60)
  const blackRemainingSeconds = blackTime % 60

  return (
    <div className="timer-wrapper">
      <div
        className={`white-timer ${isWhite === '' ? 'white' : 'active'}`}
        onClick={() => handleTimerClick('white')}
      >
        <div>
          {whiteMinutes} : {whiteRemainingSeconds}
          <br />
        </div>
      </div>

      <div
        className={`black-timer ${isBlack === '' ? 'black' : 'active'}`}
        onClick={() => handleTimerClick('black')}
      >
        <div>
          {blackMinutes} : {blackRemainingSeconds}
          <br />
        </div>
      </div>
    </div>
  )
}

export default App
