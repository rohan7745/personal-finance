import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Cards from '../components/Cards/Cards'
import AddIncome from '../components/Modals/AddIncome'
import AddExpense from '../components/Modals/AddExpense'
import { addDoc,collection, query,deleteDoc} from 'firebase/firestore'
import { auth, db } from '../firebase'
import { toast } from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDocs } from 'firebase/firestore'
import TransactionTable from '../components/TransactionTable/TransactionTable'
import Loder from '../components/Loader/Loader'
import Charts from '../components/Charts/Chart'
import NoTransaction from '../components/NoTransaction/NoTransaction'




const Dashboard = () => {
  const[user]=useAuthState(auth);
  const[isexpensemodal,setIsExpenseModal] = useState(false);
  const[isincomemodal,setIsIncomeModal] = useState(false);
  const[transaction,setTransaction] = useState([]);
  const[loading,setLoading] = useState(false);  
  const[income,setIncome] = useState(0);
  const[expense,setExpense] = useState(0);
  const[balance,setBalance] = useState(0);

  const handleExpenseModal = () => {
    setIsExpenseModal(true);
  }
  
  const handleIncomeModal = () => {
    setIsIncomeModal(true);
  }

  const handleExpenseModalClose = () => {
    setIsExpenseModal(false);
  }
  const handleIncomeModalClose = () => {
    setIsIncomeModal(false);
  }


  const onFinish = (values,type) => {
    const newTransaction={
      type:type,
      date:values.date.format("YYYY-MM-DD"),
      amount:parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    }
    setTransaction([...transaction,newTransaction]);
    setIsExpenseModal(false);
    setIsIncomeModal(false);
    addTransaction(newTransaction);
    calculateBalance();
  }

  const addTransaction = async (transaction,many) => {
    try{
      const docRef = await addDoc(collection(db, `users/${user.uid}/transaction`), transaction);
      console.log("Document written with ID: ", docRef.id);
      if(!many)toast.success("Transaction added successfully");
    }
    catch(e){
        console.log(e);
      if(!many)  toast.error("Transaction add failed");
    }
  }
  
  const resetBalance = async () => {
    try {
      // Reset local state
      setIncome(0);
      setExpense(0);
      setBalance(0);
  
      // Remove all data from the Firestore collection
      const collectionRef = collection(db, `users/${user.uid}/transaction`);
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
  
      toast.success("Balance reset successfully");
    } catch (error) {
      console.error("Error resetting balance:", error);
      toast.error("Failed to reset balance. Please check console for details.");
    }
  };
  useEffect(() => {
    fetchTransaction();
  },[user]);

  const fetchTransaction = async () => {
    setLoading(true);
   if(user){
    const q = query(collection(db, `users/${user.uid}/transaction`));
    const querySnapshot = await getDocs(q); 
    let transactionArray=[];
    querySnapshot.forEach((doc) => {
      transactionArray.push(doc.data());
    });
    setTransaction(transactionArray);
    toast.success("Transaction fetched successfully");
   }
   setLoading(false);
  }

  useEffect(() => {
    calculateBalance();
  },[transaction]);

  const calculateBalance = () => {
    let incomeAmount=0;
    let expenseAmount=0;
    transaction.forEach((item) => {
      if(item.type==="income"){
        incomeAmount+=item.amount;
      }
      else{
        expenseAmount+=item.amount;
      }
    });
    setIncome(incomeAmount);
    setExpense(expenseAmount);
    setBalance(incomeAmount-expenseAmount);
  }

  let sortedTransaction = [...transaction].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  

  return (
    <div>
      <Header/>
      {loading ? (<Loder/>) : (<><Cards handleExpenseModal={handleExpenseModal}
        handleIncomeModal={handleIncomeModal} resetBalance={resetBalance} income={income} expense={expense} balance={balance}
      />
      {transaction.length !==0  ? <Charts sortedTransaction={sortedTransaction}/> : <NoTransaction/>}
      <AddIncome isincomemodal={isincomemodal} handleIncomeModalClose={handleIncomeModalClose} onFinish={onFinish}/>
      <AddExpense isexpensemodal={isexpensemodal} handleExpenseModalClose={handleExpenseModalClose} onFinish={onFinish}/>
      <TransactionTable transaction={transaction} addTransaction={addTransaction}/>
      </>)}
      
    </div>
  )
}

export default Dashboard