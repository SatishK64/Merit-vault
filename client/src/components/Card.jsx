// import React from 'react'

// const Card = ({info,id,onDelete,styling,btn,child,mode}) => {
//   return (
//     <div className={child}>
//       <div className="card" style={{ width: '18rem'}}>
//           <img src={info.src} className="card-img-top" alt="preview"/>
//           <div className="card-body">
//               <h5 className="card-title">{info.title}</h5>
//               <p className="card-text">{info.tags.map((tag, index) => (
//                 <span key={index}>
//                     {tag}
//                     {index < info.tags.length - 1 && <span className={styling}> | </span>}
//                   </span>
//                 ))}</p>
//               {mode==="edit" &&<button onClick={()=>{onDelete(id)}} className={`btn btn-outline-success ${btn}`} >Delete</button>}
//           </div>
//       </div>
//     </div>
//   )
// }

// export default Card


import React from 'react'
import styles from './Card.module.css' // Import the CSS module

const Card = ({ info, id, onDelete,onDownload, styling, btn, child, mode })=> {
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