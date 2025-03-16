import React,{ useState } from 'react';
import Auth from './components/Auth';
import Student from './components/Student';
import Faculty from './components/Faculty';
import "./App.css";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [faculty, setFaculty] = useState(false);


  return (
    <>
      {!loggedIn && <Auth allowLogin={()=>setLoggedIn(true)} faculty = {()=>{setFaculty(true)}}/>}
      {loggedIn&&faculty ? <Faculty /> : <Student />}
    </>
  )
}

export default App
