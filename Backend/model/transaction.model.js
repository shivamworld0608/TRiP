import mongoose from "mongoose";
const transactionSchema = mongoose.Schema({
  tripcode: {
    /* type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip', */
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  entry_by: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  whopaid: [{
    username: {
      type: String,
      required: true,
    },
    amount:{
      type: Number,
      required: true,
    }
  }],
  split: [{
    username: {
      type: String,
      required: true,
    },
    amount:{
      type: Number,
      required: true,
    }
  }],
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
