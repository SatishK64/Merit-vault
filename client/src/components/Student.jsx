import React from 'react'
import styles from './Student.module.css'
import Card from './Card'

const Student = ({ details, mode }) => {

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

  return (
    <div className={styles.student}>
      <div className={styles.details}>
        <br />
        <h1 className={styles.big}>{details.regdNo}</h1>
        {mode && <h5>{mode}</h5>} {/*to check if mode is edit */}
        <h5>
          {details.tags.map((tag, index) => (
            <span key={index}>
              {tag}
              {index < details.tags.length - 1 && <span className={styles.separator}> | </span>}
            </span>
          ))}
        </h5>
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