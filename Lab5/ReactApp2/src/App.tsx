import { useState } from 'react'
import Licznik from "./Components/Licznik";

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        {
          <Licznik></Licznik>
        }
      </>
  )
}

export default App
