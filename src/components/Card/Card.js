import React from 'react'
import styles from "./Card.module.css";
import Button from "../Button/Button.module";

const Card = ( {title, money, buttonText, buttonType,handleClick,success=true}) => {
  return (
    
    <div className={styles.card}>
    <h3 className={styles.cardTitle}>
      {`${title}:`}
        <span className={success?styles.success:styles.failure}>{`${money}`}</span>
        
        </h3>  
    <Button  style={buttonType} shadow handleClick={handleClick}>{buttonText}</Button>
    </div>
  )
}

export default Card
  