import { useReducer, useState } from 'react'

const pinkRGB = `rgb(236, 72, 153)`

const countReducer = (setCurrentColor) => (count, action) => {
  let newCount
  switch(action.type) {
    case 'increment': {
      newCount = count + 1
      break
    }
    case 'decrement': {
      newCount = count - 1
      break
    }
    case 'reset': {
      newCount = 0
      break
    }
    default: {
      throw new Error('Invalid action type in countReducer')
    }
  }
  // I refactored in the useEffect to this reducer.
  // This doesn't seem like a good approach, but it was fun.
  if(newCount === 0) {
    setCurrentColor(pinkRGB)
  } else if (newCount > 0) {
    setCurrentColor(`rgb(52, 211, 153)`)
  } else if (newCount < 0) {
    setCurrentColor(`rgb(239, 68, 68)`)
  }
  return newCount
}

export default function Counter() {
  const [currentColor, setCurrentColor] = useState(pinkRGB)
  const [count, countDispatch] = useReducer(countReducer(setCurrentColor), 0)

  const increment = () => {
    countDispatch({type: 'increment'})
  }

  const decrement = () => {
    countDispatch({type: 'decrement'})
  }

  const reset = () => {
    countDispatch({type: 'reset'})
  }

  return (
    <main className="bg-black bg-opacity-90 min-h-screen flex flex-col items-center justify-center text-4xl text-pink-500">
      <h1 className="mb-5" style={{ color: currentColor }}>
        {count}
      </h1>
      <div className="flex w-1/2 justify-around">
        <button
          className="text-green-400 border-2 border-green-400 p-3"
          type="button"
          onClick={increment}
          aria-label="increment"
        >
          Increment
        </button>
        <button
          className="text-red-500 border-2 border-red-500 p-2"
          type="button"
          onClick={decrement}
          aria-label="decrement"
        >
          Decrement
        </button>
        <button
          className="text-pink-500 border-2 border-pink-500 p-2"
          type="button"
          aria-label="reset"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </main>
  )
}
