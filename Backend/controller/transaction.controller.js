import Transaction from "../model/transaction.model.js";
import Trip from "../model/trip.model.js";
export const transaction = async(req, res) => {
  try {
      console.log("function started");
        const {entry_by, amount, comment,tripcode,whopaid,split } = req.body;
        console.log(req.body);
        const createdtransaction = new Transaction({
            entry_by: entry_by,
            amount: amount,
            comment: comment,
            tripcode: tripcode,
            whopaid: whopaid,
            split: split
        });
        await createdtransaction.save();
        console.log("transaction created", createdtransaction);
//its for updating trip values

        // Assuming tripcode, amount, and username are provided from your application
const updateTrip = async (tripcode, amount,whopaid,split) => {
    try {
      const trip = await Trip.findOne({tripcode});
      if (!trip) {
        throw new Error('Trip not found');
      }
  
      // Update overall expenditure
      await trip.updateOverallExpenditure(amount);
  
      // Update individual expenditure for the username
      //start loop for accessing every object in whopaid
      for (let i = 0; i < whopaid.length; i++) {
        await trip.updateIndividualExpenditure(whopaid[i].username, whopaid[i].amount);
      }
  
      // Update expenditure per person
      for(let i=0;i< split.length;i++){
      await trip.updateExpenditurePerPerson(split[i].username,split[i].amount);
    }
  
      console.log('Trip updated successfully:', trip);
    } catch (error) {
      console.error('Error updating trip:', error.message);
    }
  };

  // Call the updateTrip function with appropriate parameters
  updateTrip(tripcode, amount, whopaid,split);
//updation task ended
console.log("ended successfully")

    } catch (error) {
      console.log("fuck you")
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};




