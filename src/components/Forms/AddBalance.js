

import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Grid } from '@mui/material';
import { SnackbarProvider, useSnackbar } from "notistack";

import styles from "./AddBalance.module.css";
import Modal from "../Modal/Modal";
// import Pagination from "../Pagination/Pagination"
import Button from "../Button/Button.module";

const AddBalance = ({setBalance,setIsOpen} ) => {
   
    const [income,setIncome]=useState('')
    const { enqueueSnackbar} = useSnackbar()


    const onSubmitHandler = (event) => {
        event.preventDefault();
       
        if(Number(income)<0){
            enqueueSnackbar("Income should be grater than 0", { variant: "warning" })
            setIsOpen(false)
            return}

            setBalance(prev => prev+Number(income))
            setIsOpen(false)
    }
    
  return (
    <div className={styles.formsWrapper}>
      <h3>AddBalance</h3>
      <form  onSubmit={onSubmitHandler}>
      <input placeholder="Income Amount" type="number" value={income} onChange={(e)=>setIncome(e.target.value)} required/>
      <Button type="submit" style="primary" shadow>AddBalance</Button>
      <Button type="submit" style="secondary" shadow>AddBalance</Button>
      </form>
      
    </div>
  )
}

export default AddBalance
