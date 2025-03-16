import React, { useEffect, useState } from 'react'
import styles from './Faculty.module.css'
import { set } from 'mongoose';

const Faculty = () => {
  const [searchItem, setSearchItem] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/alldata");
      const data = await response.json();
      const api = data.data;
      setUsers(api);
      setFilteredStudents(api);
    }
      fetchData();
  }, []);



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

  }

  return (
    <div className={styles.facContainer}>
      <input type='text' onChange={handleInputChange} value={searchItem} placeholder='Type to search' className={styles.glassMorphism} />
      <div className={styles.tableContainer}>
      {filteredStudents.length === 0 ? <p className={styles.errorMsg}>No users found</p>: 
        <table className={styles.table}>
          <tbody>

            {filteredStudents.map((user,index) => (
              <tr key={index} onClick={()=>{handleClick(user.username)}}>
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
  )
}

export default Faculty