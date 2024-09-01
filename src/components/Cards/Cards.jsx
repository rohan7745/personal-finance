import React from 'react'
import './Cards.css'
import { Card , Row } from "antd"
import Button from '../Button/Button'

const Cards = ({handleIncomeModal,handleExpenseModal,resetBalance,income,expense,balance}) => {
  return (
    <div>
        <Row className='row'>
            <Card className="card" title="Current Balance">
                <p>{balance}</p>
                <Button text="Reset Balance" blue={true} onClick={resetBalance}/>
            </Card>
            <Card className="card" title="Total Income">
                <p>{income}</p>
                <Button text="Add Income" blue={true} onClick={handleIncomeModal}/>
            </Card>
            <Card className="card" title="Total Expense">
                <p>{expense}</p>
                <Button text="Add Expense" blue={true} onClick={handleExpenseModal}/>
            </Card>
        </Row>
    </div>
  )
}

export default Cards