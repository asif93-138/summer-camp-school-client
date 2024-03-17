import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CampContext } from '../ContextProvider';


function App() {
  const [count, setCount] = useState(0);
  const [initialData, setInitialData] = useState('');
  const {user} = useContext(CampContext);

  useEffect(() => {
    fetch('http://localhost:3000/')
    .then(res => res.text())
    .then(data => setInitialData(data))
  }, [])
  function BETesting() {
    const tstObj = {dName: 'express', dNumber: 3}
    console.log(tstObj);
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json' 
      },
      body: JSON.stringify(tstObj)
    })
    .then(res => res.text())
    .then(data => console.log(data))
  }


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1><h1>{initialData}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> <button type='button' onClick={BETesting}>Send Data</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
 
      
    </>
  )
}

export default App
