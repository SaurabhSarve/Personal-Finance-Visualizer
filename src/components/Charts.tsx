'use client';

import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

interface Transaction {
  amount: string;
  date: string;
  description: string;
  category: string;
}

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#4f46e5', '#22c55e', '#facc15', '#ef4444', '#14b8a6', '#e879f9'];

const Charts: React.FC<ChartsProps> = ({ transactions }) => {

  const categoryTotals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + parseFloat(tx.amount);
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const monthlyTotals = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + parseFloat(tx.amount);
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.entries(monthlyTotals).map(([month, value]) => ({
    month,
    value,
  }));

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-xl shadow border">
        <h3 className="text-lg font-semibold mb-4 text-center text-blue-700">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border">
        <h3 className="text-lg font-semibold mb-4 text-center text-green-700">Monthly Expenses</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
