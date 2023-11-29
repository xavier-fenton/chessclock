import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const five_minutes = 5 * 60
  const [whiteTime, setWhiteTime] = useState(five_minutes)
  const [blackTime, setBlackTime] = useState(five_minutes)

  const [isActive, setIsActive] = useState(false)
  const [activeTimer, setActiveTimer] = useState(null) // 'white' or 'black'

  useEffect(() => {
    let interval

    if (isActive) {
      interval = setInterval(() => {
        if (activeTimer === 'white') {
          setWhiteTime((prevWhiteTime) => prevWhiteTime - 1)
        }
        if (activeTimer === 'black') {
          setBlackTime((prevBlackTime) => prevBlackTime - 1)
        }
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, activeTimer])

  function handleTimerClick(timer) {
    if (!isActive) {
      setIsActive(true)
      setActiveTimer(timer)
    } else {
      setIsActive(false)
      setActiveTimer('active')
    }
  }

  const whitesMinutes = Math.floor(whiteTime / 60)
  const whitesRemainingSeconds = whiteTime % 60

  const blacksMinutes = Math.floor(blackTime / 60)
  const blacksRemainingSeconds = blackTime % 60

  return (
    <div className="timer-wrapper">
      <div
        className={`white-timer ${activeTimer === 'white' ? 'active' : ''}`}
        onClick={() => handleTimerClick('white')}
      >
        <div>
          {whitesMinutes} : {whitesRemainingSeconds}
          <br />
        </div>
      </div>

      <div
        className={`black-timer ${activeTimer === 'black' ? 'active' : ''}`}
        onClick={() => handleTimerClick('black')}
      >
        <div>
          {blacksMinutes} : {blacksRemainingSeconds}
          <br />
        </div>
      </div>
      {/* Additional UI components or actions based on your requirements */}
    </div>
  )
}

export default App
