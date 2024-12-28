
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button.module";
import { SnackbarProvider, useSnackbar } from "notistack";

import styles from "./ExpenseForm.module.css";

// import Pagination from "../Pagination/Pagination"

const ExpenseForm = (setIsOpen ,expenseList,setExpenseList,editId,balance,setBalance) => {
    const [formData, setFormData] = useState({
        price: "",
        title: "",
        date: "",
        category: "",
        });
        const { enqueueSnackbar} = useSnackbar()

        const handleInputChange = (event) => {
            const { name } = event.target.name;
        
            setFormData((prev) => 
              ({ ...prev, [name]: event.target.value }))
              }
        const handleAdd  = (event) => {
        event.preventDefault();
       
        if(balance<Number(formData.price)){
            enqueueSnackbar("price should be less than Wallet Balance ", { variant: "warning" })
            setIsOpen(false)
            return}

            setBalance(prev => prev-Number(formData.price))
            
            const lastId=expenseList.length>0?expenseList[0].id: 0
            setExpenseList(prev =>[{...formData,id:lastId+1},...prev] );

            setFormData({  price: "",
              title: "",
              date: "",
              category: "",})

            setIsOpen(false)
    }

    const handleEdit = (e) => {
      e.preventDefault();
        const updated  = expenseList.map(item =>{
          if(item.id === editId){
          const priceDiff  = item.price-Number(formData.price)

        if(priceDiff<0 && Math.abs(priceDiff)>balance){
          enqueueSnackbar("User should not be able to spend more than his available wallet balance", { variant: "warning" })
          setIsOpen(false)
          return {...item}

        }
        setBalance(prev => prev+priceDiff)
        return {...formData,id:editId}
        }
      else{return item}})
      setExpenseList(updated)
      setIsOpen(false)}
        
return (
    <div className={styles.formsWrapper}>
     <h3>{editId?"Edit Expense ":" Add Expense "}</h3>
     <form  onSubmit={editId?handleEdit:handleAdd}>
      <input placeholder="Title" type="text" name="title" value={formData.title} onChange={handleInputChange} required/>
      <input placeholder="Price" type="number" name="price" value={formData.price} onChange={handleInputChange} required/>
      <select name="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="" disabled >Select</option>
                  <option value="food" >food</option>
                  <option value="entertaintment"> entertaintment</option>
                  <option value="travel">travel</option>
               </select>
               <input placeholder="date" type="date" name="date" value={formData.date} onChange={handleInputChange} required/>
               <Button type="submit" style="primary" shadow>AddBalance</Button>
               <Button  style="secondary" shadow handleClick={()=>setIsOpen(false)}>Cancel</Button>

      </form>
     
    </div>
  )
}

export default ExpenseForm
