import React,{useState,useEffect} from 'react'
import styles from './Student.module.css'
import Card from './Card'
import Upload from './Upload'
const Student = ({ details,back, mode }) => {
  const cards = [
    {
      title: "SIH",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Hello",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Hack",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Quantum",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Cloud",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Cloud",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Cloud",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "SIH",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Hello",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Hack",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Quantum",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Cloud",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Cloud",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Cloud",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
    {
      title: "Cloud",
      src: "https://picsum.photos/200",
      tags: ["AI", "Cloud", "kashdl"]
    },
  ]

  function handleDelete(id) {
    
    console.log(cards[id].title)
  }
  
  function download(id){
    console.log("Download "+cards[id].title)
  }

  const [showUpload,setShowUpload] = useState(false);
  function enable(){
    setShowUpload((prev)=>{return !prev});
  }

  return (
    <div className={styles.student}>
      {showUpload&& <Upload click={enable}/>}
      <div className={styles.details}>
        <br />
        <h1 className={styles.big}>{details.username}</h1>
        {/* {mode && <h5>{mode}</h5>} to check if mode is edit */}
        <h5>
          {details.tags.map((tag, index) => (
            <span key={index}>
              {tag}
              {index < details.tags.length - 1 && <span className={styles.separator}> | </span>}
            </span>
          ))}
        </h5>
        {mode !== "edit"&&<button className="glassy-button" onClick={back}><span><i className="fas fa-arrow-left"></i></span></button>}
        {mode === "edit" && <button onClick={enable} className='circular-upload-button'>+</button>}
      </div>
      <div className={styles.parent}>
        {cards.map((card, index) => (
          <Card 
          key={index} 
          id={index} 
          info={card} 
          onDelete={handleDelete} 
          child = {styles.child} 
          styling={styles.separator} 
          btn={styles.customButton} 
          mode={mode}
          onDownload={download}/>
        ))}
      </div>
    </div>
  )
}

export default Student;