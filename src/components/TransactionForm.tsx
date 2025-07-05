'use client';

import React, { useState, FormEvent } from 'react';

interface Transaction {
  amount: string;
  date: string;
  description: string;
  category: string;
}

interface Props {
  onAdd: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAdd }: Props) {
  const [form, setForm] = useState<Transaction>({
    amount: '',
    date: '',
    description: '',
    category: 'Food',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm({ amount: '', date: '', description: '', category: 'Food' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="description"
        type="text"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Rent</option>
        <option>Utilities</option>
        <option>Entertainment</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
}
