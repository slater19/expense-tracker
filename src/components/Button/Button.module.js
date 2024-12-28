import React from 'react'
import styles from "./Button.module.css";
import { IoMdCloseCircle } from 'react-icons/io'

const Button = ({children,handleClick,  style="primary", shadow =false,type='button' }) => {
  return (
    <div>
     <button  type={type} className={styles.button} onClick={handleClick}><IoMdCloseCircle/ >{children}</button>  
    </div>
  )
}

export default Button
