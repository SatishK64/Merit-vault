import React,{ use, useState } from 'react';
import Auth from './components/Auth';
import Student from './components/Student';
import Faculty from './components/Faculty';
import "./App.css";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [faculty, setFaculty] = useState(false);
  const [showStudent,setShowStudent] = useState(false)
  // The edit can be a separate variable that can be changed form somewhere esle
  const details={
    regdNo:"VU22CSEN00113798",
    tags:["Sports","Club","Cloud"],
    edit:true
  }

  return (
    <>
      {!loggedIn && <Auth allowLogin={()=>setLoggedIn(true)} faculty = {()=>{setFaculty(true)}}/>}
      {/* {loggedIn && faculty ? (showStudent? <Faculty name ="Admin"/> : <Student details={details} mode={false&&"edit"}/>):<Student details={details} mode={true&&"edit"}/>} */}
      {loggedIn && faculty ? <Faculty name ="Admin"/> :<Student details={details} mode={details.edit&&"edit"}/>}
    </>
  )
}

export default App
