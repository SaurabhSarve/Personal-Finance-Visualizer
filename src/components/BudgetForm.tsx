'use client';

import React, { useState, FormEvent } from 'react';

interface Budget {
  category: string;
  month: string;
  amount: string;
}

interface BudgetFormProps {
  onSubmit: (budget: Budget) => void;
}

function BudgetForm({ onSubmit }: BudgetFormProps): React.JSX.Element {
  const [form, setForm] = useState<Budget>({
    category: 'Food',
    month: '',
    amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ category: 'Food', month: '', amount: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>Food</option>
        <option>Rent</option>
        <option>Transport</option>
        <option>Utilities</option>
        <option>Entertainment</option>
      </select>

      <input
        name="month"
        type="month"
        value={form.month}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Budget Amount"
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Budget
      </button>
    </form>
  );
}

export default BudgetForm;
