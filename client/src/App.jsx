import React,{ useState } from 'react';
import Auth from './components/Auth';
import Student from './components/Student';
import Faculty from './components/Faculty';
import "./App.css";
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [faculty, setFaculty] = useState(true);


  return (
    <>
      {!loggedIn && <Auth allowLogin={()=>setLoggedIn(true)} faculty = {()=>{setFaculty(true)}}/>}
      {faculty ? <Faculty /> : <Student />}
    </>
  )
}

export default App
