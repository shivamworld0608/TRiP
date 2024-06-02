import Transaction from "../model/transaction.model.js";
import Trip from "../model/trip.model.js";
import express from "express";
/* import User from "../model/user.model.js"; */
import { transaction } from "../controller/transaction.controller.js";
import { whopays } from "../controller/whopays.controller.js";
const router = express.Router();

router.post("/transaction", transaction);
router.get("/whopays", whopays);

  //i was getting issue that response was not array and i have to use map fuction and that apply only on array
  router.get('/finalise', async (req, res) => {
    const { tripcode } = req.query;
    try {
      const transactionlog = await Transaction.find({ tripcode: tripcode }).lean().exec();
      const tripp = await Trip.findOne({ tripcode });
      if (!tripp) {
        return res.status(404).json({ error: 'Trip not found' });
      }

      // Use .lean() and .exec() to ensure transactionlog is an array of plain JavaScript objects
      console.log(Array.isArray(transactionlog)); 
      console.log(typeof transactionlog);
      if (!transactionlog || !Array.isArray(transactionlog)) {
        return res.status(404).json({ error: 'No transactions found for this tripcode' });
      }
  
      res.json({transactionlog,tripp});
    } catch (error) {
      console.error('Error fetching trips:', error);
      res.status(500).json({ error: 'Error fetching transaction log' });
    }
  });
  
export default router;
