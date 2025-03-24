import React,{ use, useState, useEffect } from 'react';
import Auth from './components/Auth';
import Student from './components/Student';
import Faculty from './components/Faculty';
import "./App.css";
import { details} from './assets/StudentDetails';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [faculty, setFaculty] = useState(false);
  const [showStudent,setShowStudent] = useState(false);
  const[username,setUsername]=useState('');
  const[data,setData]=useState(details);
  const [toggle,setToggle] = useState(false);
  const link = 'https://fpszl91p-3000.inc1.devtunnels.ms/'
  // The edit can be a separate variable that can be changed form somewhere esle
  function updateDetails(data){
    const student=data;
    setData(student);
  }
  useEffect(()=>{
    async function student(){
      console.log("deets update in aPP" + username); 
      const res = await fetch(`/api/deets/${username}`);
      if(res.status === 200){
          const data = await res.json();
          setData(data);
      }else{
          alert('User not found');
      }   
    }
    if (username !== '' && (!data || data.username !== username)) {
      fetchStudentData();
    }

  }
  ,[username,toggle]);
  function handleDelete() {
    setToggle((prev)=>{return !prev});
  }
  function updateUsername(det){
    setUsername(det); 
  }
  return (
    <>
      {!loggedIn && <Auth allowLogin={()=>setLoggedIn(true)} faculty = {()=>{setFaculty(true)}} username={updateUsername} />}
      {/* {loggedIn && faculty ? (showStudent? <Faculty name ="Admin"/> : <Student details={details} mode={false&&"edit"}/>):<Student details={details} mode={true&&"edit"}/>} */}
      {loggedIn && faculty ? (showStudent? <Student details={data} ondelete={handleDelete}  link = {link} back = {()=>{setShowStudent(false)}} mode={false&&"edit"}/>:<Faculty name ={username} setStudent = {(updateDetails)} show={()=>{setShowStudent(true)}}/>) :<Student details={data} ondelete={handleDelete} link = {link} mode={true&&"edit"}/>}

    </>
  )
}

export default App
