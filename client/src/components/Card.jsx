import React from 'react'
import styles from './Card.module.css' // Import the CSS module

const Card = ({ info, id, onDelete,onDownload, styling, child, mode })=> {
  return (
    <div className={child}>
      <div className={styles.card}>
        <img src={info.src} className={styles.cardImgTop} alt="preview" />
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{info.title}</h5>
          <p className={styles.cardText}>{info.tags.map((tag, index) => (
            <span key={index}>
              {tag}
              {index < info.tags.length - 1 && <span className={styling}> | </span>}
            </span>
          ))}</p>
          {mode === "edit" && <button onClick={() => { onDelete(id) }} className={`${styles.btn} ${styles.customButton}`}>Delete</button>}
          <button onClick={() => {onDownload}} className={`${styles.btn} ${styles.down}`}>Download</button>
        </div>
      </div>
    </div>
  )
}

export default Card