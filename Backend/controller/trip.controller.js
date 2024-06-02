import Trip from "../model/trip.model.js";
/* import bcryptjs from "bcryptjs"; */
export const createtrip = async(req, res) => {
    try {
        const { tripname,tripcode,username} = req.body;
 
        const tripp = await Trip.findOne({ tripcode });
        if (tripp) {
            return res.status(400).json({ message: "Tripcode is not unique!!" });
        }
        /* const hashPassword = await bcryptjs.hash(tripcode, 10); */
        const createdTrip = new Trip({
            tripname: tripname,
            tripcode: tripcode,
            usernames: [username],
            overallExpenditure: 0,
            individualExpenditures: [],
            expenditurePerPerson: [],
        });
        await createdTrip.save();
        const trip = await Trip.findOne({ tripcode });
        await trip.addUserWithZeroExpenditure(username);
        await trip.addUserWithZeroExpenditureper(username);
        await trip.save();
        console.log(trip);
        res.status(201).json({
            message: "Trip created successfully",
            trip: {
                _id: createdTrip._id,
                tripname: createdTrip.tripname,
                tripcode: createdTrip.tripcode,
                usernames: createdTrip.usernames,
                overallExpenditure: createdTrip.overallExpenditure,
                individualExpenditures: trip.individualExpenditures,
                expenditurePerPerson: createdTrip.expenditurePerPerson,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const jointrip = async(req, res) => {

       const {tripcode,username} = req.body;

       const tripw=await Trip.findOne({tripcode:tripcode});
       if(!tripw){
        return res.status(400).json({ message: "Tripcode is not correct" });
       }
       const trip=await Trip.findOne({tripcode:tripcode, usernames: { $in: [username]}});
       if(trip){
        return res.status(400).json({ message: "Trip already joined" });
       }


       const updateTrip = async (tripcode,username) => {
        try {
          const trip = await Trip.findOne({tripcode});
          if (!trip) {
            throw new Error('Trip not found');
          }
          await trip.addUserWithZeroExpenditure(username);
          await trip.addUserWithZeroExpenditureper(username);
          await trip.save();
          const tripp = await Trip.findOne({tripcode});
          console.log(tripp);
          console.log('Trip updated successfully:', trip);
        } catch (error) {
          console.error('Error updating trip:', error.message);
        }
      };
      
      // Call the updateTrip function with appropriate parameters
      updateTrip(tripcode,username);



      await Trip.findOneAndUpdate(
          { tripcode: tripcode}, // Search condition
          { $push: { usernames: username } }, // Update operation to add to the array
          { new: true }, // Options: return the updated document
        )
        .then(updatedTrip => {
          if (!updatedTrip) {
            console.log("Tripcode is not correct");
          } else {
            console.log('Updated trip:', updatedTrip);
          }
          res.status(201).json({
              message: "Trip created successfully",
              trip: {updatedTrip},
          });
      })
      .catch(err => {
          console.error('Error updating trip:', err);
          res.status(500).json({ message: "Internal server error" });
      });




};

export const finaltrip = async(req, res) => {
       const {tripcode} = req.body;
       const tripp=await Trip.findOne({tripcode:tripcode});
       if (!tripp) {
           console.log(tripcode);
        return res.status(404).json({ message: "Trip not found" });
      }
       console.log(tripp.tripcode);
       res.status(201).json({
        message: "Trip created successfully",
        trip: {
            _id:tripp._id,
            tripname: tripp.tripname,
            tripcode: tripp.tripcode,
            usernames:tripp.usernames,
            overallExpenditure:tripp.overallExpenditure,
            individualExpenditures: tripp.individualExpenditures,
            expenditurePerPerson:tripp.expenditurePerPerson,
        },
    });
};
export const finaltripp = async(req, res) => {
  try{
       const {tripcode} = req.query;
       const tripp=await Trip.findOne({tripcode:tripcode});
       if (!tripp) {
        return res.status(404).json({ message: "Trip not found" });
      }
       console.log(tripp.tripcode);
       res.status(201).json({
        message: "Trip created successfully",
        trip: {
            _id:tripp._id,
            tripname: tripp.tripname,
            tripcode: tripp.tripcode,
            usernames:tripp.usernames,
            overallExpenditure:tripp.overallExpenditure,
            individualExpenditures: tripp.individualExpenditures,
            expenditurePerPerson:tripp.expenditurePerPerson,
        },
    });}
  catch(error){
    console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
  }
};


export const deletetrip = async(req, res) => {
const {tripcode,username} = req.body;
try {
  await Trip.updateOne(
      { tripcode: tripcode },
      { $pull: { usernames: username } }
  );
  console.log('Username removed successfully');

  res.status(200).json({ message: 'Username removed successfully' });
}
catch(error){
  console.log("Error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
}

};