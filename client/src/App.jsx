import React,{ use, useState } from 'react';
import Auth from './components/Auth';
import Student from './components/Student';
import Faculty from './components/Faculty';
import "./App.css";
import { details} from './assets/StudentDetails';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [faculty, setFaculty] = useState(false);
  const [showStudent,setShowStudent] = useState(false);
  const[data,setData]=useState(details);
  // The edit can be a separate variable that can be changed form somewhere esle
  function updateDetails(data){
    const student=data;
    console.log(student)
    setData(student);
  }

  return (
    <>
      {!loggedIn && <Auth allowLogin={()=>setLoggedIn(true)} faculty = {()=>{setFaculty(true)}}/>}
      {/* {loggedIn && faculty ? (showStudent? <Faculty name ="Admin"/> : <Student details={details} mode={false&&"edit"}/>):<Student details={details} mode={true&&"edit"}/>} */}
      {loggedIn && faculty ? (showStudent? <Student details={data} back = {()=>{setShowStudent(false)}} mode={false&&"edit"}/>:<Faculty name ="Admin" setStudent = {(updateDetails)} show={()=>{setShowStudent(true)}}/>) :<Student details={data} mode={true&&"edit"}/>}

    </>
  )
}

export default App
