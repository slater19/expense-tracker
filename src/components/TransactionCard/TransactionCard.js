import { BsSuitcase2 } from "react-icons/bs";

import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineMode } from "react-icons/md";
import styles from "./TransactionCard.module.css";

const TransactionCard = ({handleEdit,handleDelete,details}) => {
  return (
    
    <div className={styles.card}>
        <div className={styles.cardInner}>
        <div className={styles.cardIcon}>
      {details.category =="food" &&<BsSuitcase2/>}
      {details.category =="entertaintment" &&<BsSuitcase2/>}
      {details.category =="travel" &&<BsSuitcase2/>}
        </div>
        <div className={styles.cardInfo}>
    <h5>{details.title}</h5>
    <p>{details.date}</p>
        </div></div>
        <div className={styles.cardInner}>
        <div className={styles.cardInfo}>
    <h5>{details.title}</h5>
    <p>{details.date}</p>
        </div></div>
        <div className={styles.cardInner}>
            <p className={styles.cardPrice}>{details.price}</p>
            <div className={styles.cardButtonWrapper}>
            <button  className={styles.cardDelete} onClick={handleDelete}><IoMdCloseCircle /></button>
            <button  className={styles.cardEdit} onClick={handleEdit}><MdOutlineMode /></button>
    </div></div></div>
  )
}

export default TransactionCard
