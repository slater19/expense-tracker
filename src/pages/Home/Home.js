
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";

import ExpenseForm from "../../components/Forms/ExpenseForm";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";

import BarChart from "../../components/BarChart/BarChart";
import PieChart from "../../components/PieChart/PieChart";
import TransactionList from "../../components/TransactionList/TransactionList";

import AddBalance from "../../components/Forms/AddBalance";

const Home = () => {
  
    const [ismounted,setisMounted]=useState(false)
    const [expense,setExpense]=useState(0)
    const [expenseList,setExpenseList]=useState([])
    const [balance,setBalance]=useState(0)
        
    const [isopenexpense,setIsOpenExpense]=useState(false)
    const [isopenBalance,setIsopenbalance]=useState(false)

    const [categoryExpense, setCategoryexpense] = useState({
      food: 0,
      entertaintment: 0,
      travel: 0,
      });
      const [categoryCount, setCategoryCount] = useState({
        food: 0,
        entertaintment: 0,
        travel: 0,
        });

        useEffect(() => {
          const localbalance = localStorage.getItem("balance")

          if(localbalance)setBalance(Number(localbalance));
          else{setBalance(5000);localStorage.setItem("balance",5000);}

          const items = JSON.parse( localStorage.getItem("expenses"));
          setExpenseList(items||[])
          setisMounted(true)},[])




        useEffect(() => {
          if(expenseList.length>0||ismounted){localStorage.setItem("expense", JSON.stringify(expenseList));}
       
          if(expenseList.length>0){
            setExpense (expenseList.reduce(
              (accumulator, currentValue) => accumulator + Number(currentValue.price),
              0,
            ));

          }
          else{setExpense(0)}

          let foodExpense=0,entertaintmentExpense=0,travelExpense=0;

          let foodCount=0,entertaintmentCount=0,travelCount=0;

          expenseList.forEach((item) => {
            if(item.category =="food")foodExpense+=Number(item.price);foodCount++
              if(item.category =="entertaintment")entertaintmentExpense+=Number(item.price);entertaintmentCount++
                if(item.category =="travel")travelExpense+=Number(item.price);travelCount++


           })
           setCategoryexpense({
            food: foodExpense,
            entertaintment: entertaintmentExpense,
            travel: travelExpense,
           })
           setCategoryCount({
            food: foodCount,
            entertaintment: entertaintmentCount,
            travel: travelCount,
           })
       
       
        }, [expenseList]);
    
        useEffect(() => {
          if(ismounted)localStorage.setItem("balance",balance);  
        },[balance])
    

 return (
    
    <div className={styles.container}>
    <h1>Expense Tracker</h1>
    <div className={styles.cardsWrapper}>
    
    <Card title="Wallet Balance " money={balance} buttonText="+Add Income"  buttonType="success"  handleClick={()=>setIsopenbalance(true)}/>
    <Card title="Expenses" money={expense} buttonText="+Add Expenses"  buttonType="failure" success={false} handleClick={()=>setIsOpenExpense(true)}/>
    
    <PieChart data={[{ name:"category", value:categoryExpense.food},{name:"entertaintment", value:categoryExpense.entertaintment},{ name:"travel", value:categoryExpense.travel}]}/> 
    </div>
    <div className={styles.transactionWrapper}>
    <TransactionList title="transactions" balance={balance} setBalance={setBalance} transactions={expenseList} editTransaction={setExpenseList} 
    />
    
    
    <BarChart data={[{ name:"category", value:categoryCount.food},{name:"entertaintment", value:categoryCount.entertaintment},{ name:"travel", value:categoryCount.travel}]}/> 
    {/* <Modal isopen ={isopenexpense} setIsOpen={setIsOpenExpense}> */}
         {/* <ExpenseForm setIsOpen={setIsOpenExpense} expenseList={expenseList} setExpenseList={setExpenseList} balance={balance} setBalance={setBalance}/>  */}
        {/* </Modal> */}
        {/* <Modal isopen={isopenBalance} setIsOpen={setIsopenbalance}> */}
        {/* <AddBalance setBalance={setBalance} setIsOpen={setIsopenbalance}/> */}
        {/* </Modal> */}

    </div>  </div>
  )
}

export default Home
