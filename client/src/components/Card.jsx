import React from 'react'
import styles from './Card.module.css' // Import the CSS module

const Card = ({ username,info, id,link, onDelete,onDownload, styling, child, mode })=> {

  function downloadFile(username, filename, customFilename) {
    // If no custom filename is provided, use the original
    const displayFilename = customFilename || filename;
    const downloadUrl = `${link}file/download/${username}/${filename}`;
    
    // Using fetch API to control the download filename
    fetch(downloadUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        // Create a blob URL and trigger download with custom filename
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = displayFilename; // Set the custom download filename here
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      })
      .catch(error => {
        console.error('Download failed:', error);
        // Handle the error appropriately
      });
  }
  return (
    <div className={child}>
      <div className={styles.card}>
        <img src={`${link}file/view/${username}/${info.previewImage}`} className={styles.cardImgTop} alt="preview" loading='eager'/>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{info.title}</h5>
          <p className={styles.cardText}>{info.tags.map((tag, index) => (
            <span key={index}>
              {tag}
              {index < info.tags.length - 1 && <span className={styling}> | </span>}
            </span>
          ))}</p>
          {mode === "edit" && <button onClick={() => { onDelete(id) }} className={`${styles.btn} ${styles.customButton}`}>Delete</button>}
          <button onClick={() => {downloadFile(username,info.fileName,info.title)}} className={`${styles.btn} ${styles.down}`}>Download</button>
        </div>
      </div>
    </div>
  )
}

export default Card