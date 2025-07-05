'use client';

import React, { useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import BudgetForm from '@/components/BudgetForm';
import Charts from '@/components/Charts';
import { toast } from 'sonner';


interface Transaction {
  amount: string;
  date: string;
  description: string;
  category: string;
}

interface Budget {
  category: string;
  month: string;
  amount: string;
}

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

const handleAddTransaction = (transaction: Transaction) => {
  const transactionMonth = transaction.date.slice(0, 7); 
  const categoryBudget = budgets.find(
    (b) => b.category === transaction.category && b.month === transactionMonth
  );

  if (categoryBudget) {
    const totalSpent = transactions
      .filter(
        (t) =>
          t.category === transaction.category &&
          t.date.slice(0, 7) === transactionMonth
      )
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const newTotal = totalSpent + parseFloat(transaction.amount);

    if (newTotal > parseFloat(categoryBudget.amount)) {
      toast.error("Budget Limit Reached", {
  description: `You've spent ₹${totalSpent} in '${transaction.category}' for ${transactionMonth}. Budget is ₹${categoryBudget.amount}.`,
  duration: 6000,
});

      return;
    }
  }

  setTransactions((prev) => [...prev, transaction]);
};



  const handleDeleteTransaction = (index: number) => {
    const updated = [...transactions];
    updated.splice(index, 1);
    setTransactions(updated);
  };

  const handleAddBudget = (budget: Budget) => {
    setBudgets((prev) => [...prev, budget]);
  };

  const handleDeleteBudget = (index: number) => {
    const updated = [...budgets];
    updated.splice(index, 1);
    setBudgets(updated);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 p-6 md:p-12 text-gray-800">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-12 drop-shadow-sm">
         Personal Finance Visualizer
      </h1>

      {/* Forms Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-400">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Add Transaction</h2>
          <TransactionForm onAdd={handleAddTransaction} />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-green-400">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Add Budget</h2>
          <BudgetForm onSubmit={handleAddBudget} />
        </div>
      </div>

      {/* Charts Section */}
      <section className="mb-14">
        <Charts transactions={transactions} />
      </section>
      
      {/* Dashboard Summary */}
<section className="mb-14">    
<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Total Expenses */}
  <div className="bg-white border shadow-sm rounded-lg p-5">
    <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
    <p className="text-2xl font-bold text-red-600">
      ₹{transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0).toFixed(2)}
    </p>
  </div>

  {/* Most Recent Transaction */}
  <div className="bg-white border shadow-sm rounded-lg p-5">
    <p className="text-sm text-gray-500 mb-1">Latest Transaction</p>
    {transactions.length > 0 ? (
      <>
        <p className="font-medium">{transactions[transactions.length - 1].description}</p>
        <p className="text-sm text-gray-500">
          ₹{transactions[transactions.length - 1].amount} on {transactions[transactions.length - 1].date}
        </p>
      </>
    ) : (
      <p className="text-gray-400">No transactions yet</p>
    )}
  </div>

  {/* Category Breakdown */}
  <div className="bg-white border shadow-sm rounded-lg p-5">
    <p className="text-sm text-gray-500 mb-1">Top Category</p>
    {(() => {
      const categoryTotals: Record<string, number> = {};
      transactions.forEach((tx) => {
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + parseFloat(tx.amount);
      });
      const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
      const top = sortedCategories[0];
      return top ? (
        <>
          <p className="font-medium">{top[0]}</p>
          <p className="text-sm text-gray-500">₹{top[1].toFixed(2)}</p>
        </>
      ) : (
        <p className="text-gray-400">No data</p>
      );
    })()}
  </div>
</div>
</section>
       
      {/* Transaction List */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <div className="grid gap-4">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-4 shadow-sm border rounded-md"
              >
                <div>
                  <p className="font-medium text-gray-900">{tx.description}</p>
                  <p className="text-sm text-gray-500">
                    ₹{tx.amount} on {tx.date}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {tx.category}
                  </span>
                  <button
                    onClick={() => handleDeleteTransaction(index)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Budget List */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Budgets</h2>
        {budgets.length === 0 ? (
          <p className="text-gray-500">No budgets set yet.</p>
        ) : (
          <div className="grid gap-4">
            {budgets.map((b, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-4 shadow-sm border rounded-md"
              >
                <div>
                  <p className="font-medium text-gray-900">{b.category}</p>
                  <p className="text-sm text-gray-500">
                    ₹{b.amount} for {b.month}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    {b.category}
                  </span>
                  <button
                    onClick={() => handleDeleteBudget(index)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
