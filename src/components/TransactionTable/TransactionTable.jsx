import React, { useState, useMemo } from 'react';
import { Radio, Select, Table } from 'antd';
import { Option } from 'antd/lib/mentions';
import './TransactionTable.css';
import SearchImg from '../../assets/magnifying-glass-solid.svg';
import Papa from 'papaparse';
import { parse } from 'papaparse';


const TransactionTable = ({ transaction ,addTransaction }) => {
  const [typeFilter, setTypeFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [search, setSearch] = useState('');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const filteredTransactions = useMemo(() => {
    let filtered = transaction.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    if (typeFilter) {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    return filtered;
  }, [transaction, search, typeFilter]);

  const sortedTransactions = useMemo(() => {
    if (sortKey === 'date') {
      return [...filteredTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortKey === 'amount') {
      return [...filteredTransactions].sort((a, b) => b.amount - a.amount);
    } else {
      return filteredTransactions;
    }
  }, [filteredTransactions, sortKey]);

  const exportCSV = () => {
    var csv = Papa.unparse({
      "fields": ["name", "type" ,"tag","date","amount"],
        data:transaction,
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const importCSV = (e) => {
   e.preventDefault();
   try{
    parse(e.target.files[0],{
      header:true,
      complete: async function(results){
       for(const transaction of results.data){
        const newTransation = {
          ...transaction,
          amount:parseFloat(transaction.amount),
        };
        await addTransaction(transaction);
       }
      }
    })
      e.target.files = null;
   }catch(err){
    console.log(err);
  }
  }
  return (
    <div style={{width:"97%" , padding:"0rem 2rem"}}>
      <div className='head'>
      <div className='input-flex'>
        <img src={SearchImg} alt="" width='20px'/>
      <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <Select className="select-input" onChange={(value) => setTypeFilter(value)} value={typeFilter} placeholder="Filter" allowClear>
        <Option value="">All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
      </Select>
      </div>
      <div className='my-table'>
        <div style={{display:'flex',justifyContent:"space-between",alignItems:"center",width:"100%" , marginBottom:"1rem", marginLeft:"25px"}}>
          <h3>My Transaction</h3>
      <Radio.Group className="input-radio" onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
        <Radio.Button value="">NO Sort</Radio.Button>
        <Radio.Button value="date">Sort by Date</Radio.Button>
        <Radio.Button value="amount">Sort by Amount</Radio.Button>
      </Radio.Group>
      <div className='export'>
        <button className='btn' onClick={exportCSV}>Export to CSV</button>
        <label for="file-csv" className='btn btn-blue'>Import from CSV</label>
        <input type="file" id="file-csv" accept=".csv" onChange={importCSV} required style={{display:"none"}}/>
      </div>
      </div>
      <div className='table-container'>
      <Table dataSource={sortedTransactions} columns={columns} />
      </div>
      </div>
      </div>
  );
};

export default TransactionTable;
