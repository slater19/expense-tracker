
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import ExpenseForm from "../Forms/ExpenseForm";
import styles from "./TransactionList.module.css";

// import Pagination from "../Pagination/Pagination"
import BarChart from "../../components/BarChart/BarChart";
import PieChart from "../../components/PieChart/PieChart";


const TransactionList = ({transactions,title,editTransaction,balance,setBalance}) => {
   
    const [id,setId]=useState(0)
    const [isDisplay,setIsdisplay]=useState(false)
    const [currTransaction,setCurrtransaction]=useState([])
    const [currPage,setCurrpage]=useState(1)
    const [totalPage,setTotalpage]=useState(0)
    const maxRecords=3

    const handleEdit = (id) => {
      
      setId(id);
      setIsdisplay(true);
        }
      
    
      const handleDelete = (id) => {
        const item = transactions.find(i => i.id === id);
        const price =Number(item.price)
        setBalance(prev => prev+price)

        editTransaction(prev => (prev.filter(item => item.id !== id)))}

       
      
      useEffect(() => {
        const stIndex=(currPage-1)*maxRecords
        const enIndex=Math.min(currPage*maxRecords,transactions.length)
        setCurrtransaction([...transactions].slice(stIndex,enIndex))
        setTotalpage(Math.ceil(transactions.length/maxRecords))
      }, [currPage, transactions]);
    
      useEffect(() => {
        if(totalPage<currPage&&currPage>1){setCurrpage(prev => prev-1)}
      }, [totalPage]);

  return (
    <div className={styles.transactionWrapper}>
     {title &&<h2>{title}</h2>} 
     {transactions.length>0?
     <div className={styles.list}>
      <div>
      {currTransaction.map(transaction =>{
       <TransactionCard handleEdit={()=>handleEdit(transaction.id)} handleDelete={()=>handleDelete(transaction.id)} details={transaction} key={transaction.id} />  
      })}

      
       </div>
    
    </div>:(
      <div className={styles.emptytransactionWrapper}>
        <p>No Transaction</p>
        </div>
    )}

{/* <Modal
    isOpen={isDisplay}
    setIsOpen={setIsdisplay}>
 <ExpenseForm  editId={id} setIsOpen={setIsdisplay} expenseList={transactions} setExpenseList={editTransaction} balance={balance} setBalance={setBalance}/> 
  </Modal> */}
  </div>
  )}

export default TransactionList
