import React, { useState } from 'react'
import './Faculty.css'

// separate styles and figure out glass
const Faculty = () => {
  const [searchItem,setSearchItem] = useState("");
  const [apiStudents, setApiStudents ]= useState([]);
  const [filteredStudents,setFilteredStudents] = useState(apiStudents);

  const users = [
    { firstName: "John", id: 1 },
    { firstName: "Emily", id: 2 },
    { firstName: "Michael", id: 3 },
    { firstName: "Sarah", id: 4 },
    { firstName: "David", id: 5 },
    { firstName: "Jessica", id: 6 },
    { firstName: "Daniel", id: 7 },
    { firstName: "Olivia", id: 8 },
    { firstName: "Matthew", id: 9 },
    { firstName: "Sophia", id: 10 }
  ]
  
  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
  }

  function updateList(){
    
  }

  return (
    <div className='fac-container'>
      <input type='text' onChange = {handleInputChange} placeholder='Type to search' className='glassMorphism'/>
      
    </div>

  )
}

export default Faculty