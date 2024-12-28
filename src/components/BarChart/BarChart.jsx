import React, { PureComponent } from 'react';
import styles from "./BarChart.module.css";

import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer
  } from "recharts";
  

const BarChartWrapper = ({data}) => {
  return (
    <div className={styles.expenseChart}>
      <h2>Top Expense</h2>
      <div className={styles.barWrapper}>
      <ResponsiveContainer height={280} width ="100%">
      <BarChart layout="vertical" data={data}>
    
    <XAxis type='number' axisLine={false} display="none"  />
    <YAxis type='category' axisLine={false} width={100} dataKey="name" />
    <Tooltip />
    <Legend />
    <Bar dataKey="pv" fill="#8884d8" barSize={25}/>
    
  </BarChart>
      </ResponsiveContainer>
      
    </div>
    </div>
  )
}

export default BarChartWrapper


  
  
