import React, { useState } from 'react'
import styles from './Faculty.module.css'

const Faculty = ({name}) => {
  const [searchItem, setSearchItem] = useState("");
  const [apiStudents, setApiStudents] = useState([]);
  
  const users = [
    { firstName: "John", id: 1, tags: ['Artificial Intelligence', "Cyber Security"] },
    { firstName: "Emily", id: 2, tags: ['Artificial Intelligence', "Data Science"] },
    { firstName: "Michael", id: 3, tags: ['Artificial Intelligence', "Data Science"] },
    { firstName: "Sarah", id: 4, tags: ['Artificial Intelligence', "Cloud"] },
    { firstName: "David", id: 5, tags: ['Artificial Intelligence', "Sports"] },
    { firstName: "Jessica", id: 6, tags: ['Artificial Intelligence', "Data Science", "Club", "Sports"] },
    { firstName: "Daniel", id: 7, tags: ['Artificial Intelligence', "Data Science", "Club", "Intern","Balls"] },
    { firstName: "Olivia", id: 8, tags: ['Artificial Intelligence', "Data Science", "Club", "Sports"] },
    { firstName: "Matthew", id: 9, tags: ['IOT', "Data Science", "Club", "Sports"] },
    { firstName: "Sophia", id: 10, tags: ['Artificial Intelligence', "Hello", "Club", "Sports"] },
    { firstName: "John", id: 1, tags: ['Artificial Intelligence', "Cyber Security"] },
    { firstName: "Emily", id: 2, tags: ['Artificial Intelligence', "Data Science"] },
    { firstName: "Michael", id: 3, tags: ['Artificial Intelligence', "Data Science"] },
    { firstName: "Sarah", id: 4, tags: ['Artificial Intelligence', "Cloud"] },
    { firstName: "David", id: 5, tags: ['Artificial Intelligence', "Sports"] },
    { firstName: "Emily", id: 2, tags: ['Artificial Intelligence', "Data Science"] },
    { firstName: "Michael", id: 3, tags: ['Artificial Intelligence', "Data Science"] },
    { firstName: "Sarah", id: 4, tags: ['Artificial Intelligence', "Cloud"] },
    { firstName: "David", id: 5, tags: ['Artificial Intelligence', "Sports"] },
    { firstName: "Emily", id: 2, tags: ['Artificial Intelligence', "Data Science"] },
    { firstName: "Michael", id: 3, tags: ['Artificial Intelligence', "Data Science"] },
    { firstName: "Sarah", id: 4, tags: ['Artificial Intelligence', "Cloud"] },
    { firstName: "David", id: 5, tags: ['Artificial Intelligence', "Sports"] },
    { firstName: "Jessica", id: 6, tags: ['Artificial Intelligence', "Data Science", "Club", "Sports"] },
    { firstName: "Daniel", id: 7, tags: ['Artificial Intelligence', "Data Science", "Club", "Intern","Balls"] },
    { firstName: "Olivia", id: 8, tags: ['Artificial Intelligence', "Data Science", "Club", "Sports"] },
    { firstName: "Matthew", id: 9, tags: ['IOT', "Data Science", "Club", "Sports"] },
    { firstName: "Sophia", id: 10, tags: ['Artificial Intelligence', "Hello", "Club", "Sports"] }
  ]


  const [filteredStudents, setFilteredStudents] = useState(users);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    
    const filteredItems = users.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
      setFilteredStudents(filteredItems);
  }

  function handleClick(student){
    console.log(student)
  }

  return (
    <>
    <div className={styles.details}>
      Welcome {name}
    </div>
    <div className={styles.facContainer}>
      <input type='text' onChange={handleInputChange} value={searchItem} placeholder='Type to search' className={styles.glassMorphism} />
      <div className={styles.tableContainer}>
      {filteredStudents.length === 0 ? <p className={styles.errorMsg}>No Students found</p>: 
        <table className={styles.table}>
          <tbody>

            {filteredStudents.map((user,index) => (
              <tr key={index} onClick={()=>{handleClick(user.firstName)}}>
                <td className={styles.name}>{user.firstName}</td>
                <td className={styles.tags}>
                  {user.tags.slice(0, 4).map((tag, index) => (
                    <span key={index}>
                      {tag}
                      {index < user.tags.slice(0, 4).length - 1 && <span className={styles.separator}> | </span>}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        }
      </div>
    </div>
  </>
  )
}

export default Faculty