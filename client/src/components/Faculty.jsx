import React, { useState } from 'react'
import styles from './Faculty.module.css'

const Faculty = ({name,setStudent,show}) => {
  const [searchItem, setSearchItem] = useState("");
  const [apiStudents, setApiStudents] = useState([]);
  
  const users = [
    { username: "John", id: 1, tags: ['Artificial Intelligence', "Cyber Security"] },
    { username: "Emily", id: 2, tags: ['Artificial Intelligence', "Data Science"] },
    { username: "Michael", id: 3, tags: ['Artificial Intelligence', "Data Science"] },
    { username: "Sarah", id: 4, tags: ['Artificial Intelligence', "Cloud"] },
    { username: "David", id: 5, tags: ['Artificial Intelligence', "Sports"] },
    { username: "Jessica", id: 6, tags: ['Artificial Intelligence', "Data Science", "Club", "Sports"] },
    { username: "Daniel", id: 7, tags: ['Artificial Intelligence', "Data Science", "Club", "Intern","Balls"] },
    { username: "Olivia", id: 8, tags: ['Artificial Intelligence', "Data Science", "Club", "Sports"] },
    { username: "Matthew", id: 9, tags: ['IOT', "Data Science", "Club", "Sports"] },
    { username: "Sophia", id: 10, tags: ['Artificial Intelligence', "Hello", "Club", "Sports"] },
    { username: "John", id: 1, tags: ['Artificial Intelligence', "Cyber Security"] },
    { username: "Emily", id: 2, tags: ['Artificial Intelligence', "Data Science"] },
    { username: "Michael", id: 3, tags: ['Artificial Intelligence', "Data Science"] },
    { username: "Sarah", id: 4, tags: ['Artificial Intelligence', "Cloud"] },
    { username: "David", id: 5, tags: ['Artificial Intelligence', "Sports"] },
    { username: "Emily", id: 2, tags: ['Artificial Intelligence', "Data Science"] },
    { username: "Michael", id: 3, tags: ['Artificial Intelligence', "Data Science"] },
    { username: "Sarah", id: 4, tags: ['Artificial Intelligence', "Cloud"] },
    { username: "David", id: 5, tags: ['Artificial Intelligence', "Sports"] },
    { username: "Emily", id: 2, tags: ['Artificial Intelligence', "Data Science"] },
    { username: "Michael", id: 3, tags: ['Artificial Intelligence', "Data Science"] },
    { username: "Sarah", id: 4, tags: ['Artificial Intelligence', "Cloud"] },
    { username: "David", id: 5, tags: ['Artificial Intelligence', "Sports"] },
    { username: "Jessica", id: 6, tags: ['Artificial Intelligence', "Data Science", "Club", "Sports"] },
    { username: "Daniel", id: 7, tags: ['Artificial Intelligence', "Data Science", "Club", "Intern","Balls"] },
    { username: "Olivia", id: 8, tags: ['Artificial Intelligence', "Data Science", "Club", "Sports"] },
    { username: "Matthew", id: 9, tags: ['IOT', "Data Science", "Club", "Sports"] },
    { username: "Sophia", id: 10, tags: ['Artificial Intelligence', "Hello", "Club", "Sports"] }
  ]


  const [filteredStudents, setFilteredStudents] = useState(users);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    
    const filteredItems = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
      setFilteredStudents(filteredItems);
  }

  function handleClick(student){
    setStudent(student);
    show();
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
              <tr key={index} onClick={()=>{handleClick(user)}}>
                <td className={styles.name}>{user.username}</td>
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