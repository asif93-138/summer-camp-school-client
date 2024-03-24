import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CampContext } from '../ContextProvider';


function App() {
  const [classes, setClasses] = useState([]);
  const [Instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/classes')
    .then(res => res.json())
    .then(data => {
      data.sort(function(a, b) {return b.enrolled - a.enrolled});
      setClasses(data.slice(0, 6));
      const filteredIns = [];
      data.forEach(x => {
        if (filteredIns.find(y => y.insID == x.insID) == undefined) {
            filteredIns.push(x);
        }
    });
    setInstructors(filteredIns.slice(0, 6));
    })
  }, [])

  return (
    <>
    {classes.map(x => (<div key={x._id}>
      <img src={x.cImgURL} />
      <p>Class Name : {x.cN}</p>
      <p>Instructor Name : {x.insName}</p>
    </div>))}
    {Instructors.map(x => (<div key={x._id}>
      <img src={x.insImgURL} />
      <p>Instructor Name : {x.insName}</p>
      <p>Email : {x.insEmail}</p>
    </div>))}
    </>
  )
}

export default App
