import Trip from "../model/trip.model.js";

  export const whopays= async(req, res) => {
    try {
  const{tripcode}=req.query;
  const trip = await Trip.findOne({tripcode});
  // Function to calculate who pays whom and how much
  console.log(trip);
  function calculatePayments(trip) {
   trip.individualExpenditures.forEach(user => {
    let negative_expenditure=0;
    trip.expenditurePerPerson.forEach(obj => {
      if (obj.username === user.username) {
          negative_expenditure = obj.expenditure;
          console.log("info",obj.username,negative_expenditure);
      }
  })
      user.balance = negative_expenditure - user.expenditure;
    });
  
    // Sort users by balance
    trip.individualExpenditures.sort((a, b) => a.balance - b.balance);
  
    // Determine transactions
    let i = 0;
    let j = trip.individualExpenditures.length - 1;
    let transactions = [];
  
    while (i < j) {
      let amount = Math.min(-trip.individualExpenditures[i].balance, trip.individualExpenditures[j].balance);
      transactions.push({
        to: trip.individualExpenditures[i].username,
        from: trip.individualExpenditures[j].username,
        amount: amount.toFixed(2)
      });
  
      trip.individualExpenditures[i].balance += amount;
      trip.individualExpenditures[j].balance -= amount;
  
      if (trip.individualExpenditures[i].balance === 0) {
        i++;
      }
      if (trip.individualExpenditures[j].balance === 0) {
        j--;
      }
    }
  
    return transactions;
  }
  
  // Example usage
  const paymentsList = calculatePayments(trip);
  res.status(201).json({
    message: "Trip created successfully",
    paymentlist: paymentsList,
});
} catch (error) {
  console.log("Error: " + error.message);
  res.status(500).json({ message: "Internal server error" });
  }
  };
  