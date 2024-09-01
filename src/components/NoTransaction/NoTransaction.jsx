import React from 'react';
import './NoTransaction.css';  // Import the CSS file
import transs from '../../assets/expenseease-logo.png';

const NoTransaction = () => {
  return (
    <div className="no-transaction-container">
      <img src={transs} className="no-transaction-image" alt="No Transactions"/>
      <p className="no-transaction-text">You Have No Transaction Currently</p>
    </div>
  );
};

export default NoTransaction;
