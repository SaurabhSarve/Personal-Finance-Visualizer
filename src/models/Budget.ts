import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: String,
  month: String, 
  amount: Number,
}, { timestamps: true });

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
