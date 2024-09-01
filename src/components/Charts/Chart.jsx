import { Line, Pie } from '@ant-design/charts'
import React from 'react'
import './Chart.css'


const Charts = ({sortedTransaction}) => {
  const data = sortedTransaction.map((item) =>{
    return {
      date: item.date,
      amount: item.amount
    }
  } )

  const Spending = sortedTransaction.filter((transaction)=> {
    if(transaction.type === "expense"){
    return {
      tag:transaction.tag,
      amount: transaction.amount
    }}});

    const FinalSpending = Spending.reduce((acc, obj) => {
      let key =obj.tag;
      if(!acc[key]){
        acc[key]={tag:obj.tag,amount:obj.amount}
      }
      else{
        acc[key].amount+=obj.amount
      }
      return acc;
    }, {});
  
  const config={
    data:data,
    width:550,
    height:350,
    autoFit: false,
    xField: 'date',
    yField: 'amount',
  }
  const Sepndingconfig={
    data:Object.values(FinalSpending),
    width:210,
    height:280,
    angleField: "amount",
    colorField: "tag",
  }

  
  let chart,Piechart;
  return (
    
    <div className='chart-wrapper'>
      <div className='chart'>
        <h2>Your Analytics</h2>
        <Line {...config} onReady={(chartInstance)=>(chart=chartInstance)}/>
      </div>
      <div className='pie-chart'>
        <h2>Your Spending</h2>
        <div className='chart-2'>
        <Pie {...Sepndingconfig} onReady={(chartInstance)=>(Piechart=chartInstance)} className='daigram' />
        </div>
      </div>
    </div>
  )
}

export default Charts