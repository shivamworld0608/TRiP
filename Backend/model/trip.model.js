import mongoose from "mongoose";
const tripSchema = mongoose.Schema({
    tripname: {
        type: String,
        required: true,
    },
    tripcode: {
        type: String,
        required: true,
    },
    usernames: [{
        type: String,
        required: true,
    }],
    overallExpenditure: {
        type: Number,
        required: true,
        default: 0,
    },
    individualExpenditures: [{
        username: {
            type: String,
            required: true,
        },
        expenditure: {
            type: Number,
            required: true,
            default: 0,
        },
        balance: {
            type: Number,
            required: true,
            default: 0,
        },
    }],
    expenditurePerPerson: [{
      username: {
        type: String,
        required: true,
    },
    expenditure: {
        type: Number,
        required: true,
        default: 0,
    }
}]
});



//method to add username with 0 expediture
// Update the schema to include a method for adding usernames with 0 expenditure
tripSchema.methods.addUserWithZeroExpenditure = function(username) {
    // Check if the username already exists in individualExpenditures
    const userExists = this.individualExpenditures.some(entry => entry.username === username);
    if (!userExists) {
  /*       this.usernames.push(username); */
        this.individualExpenditures.push({ username, expenditure: 0 });
    }
    
};
tripSchema.methods.addUserWithZeroExpenditureper = function(username) {
    // Check if the username already exists in individualExpenditures
    const userExists = this.expenditurePerPerson.some(entry => entry.username === username);
    if (!userExists) {
  /*       this.usernames.push(username); */
        this.expenditurePerPerson.push({ username, expenditure: 0 });
    }
};



//methods to update the values

tripSchema.methods.updateOverallExpenditure = async function(amount) {
  const Amount = Number(amount);
    this.overallExpenditure += Amount;
    await this.save();
  };

  tripSchema.methods.updateIndividualExpenditure = async function(username, amount) {
    const userExpenditureIndex = this.individualExpenditures.findIndex(
      (expenditure) => expenditure.username === username
    );


    const Amount = Number(amount);

    if (userExpenditureIndex !== -1) {
      this.individualExpenditures[userExpenditureIndex].expenditure += Amount;
    } else {
      this.individualExpenditures.push({ username, expenditure: Amount });
    }

    await this.save();
  };

  tripSchema.methods.updateExpenditurePerPerson = async function(username,amount) {
/*     const numberOfUsers = this.usernames.length;
    if (numberOfUsers > 0) {
      this.expenditurePerPerson.who = this.overallExpenditure / numberOfUsers;
    } else {
      this.expenditurePerPerson = 0;
    } */
/*     this.expenditurePerPerson.forEach(obj => {
      if (obj.username === who) {
          obj.expenditure += amount;
      }
  });
    await this.save(); */






    
    const userExpenditureIndex = this.expenditurePerPerson.findIndex(
      (expenditure) => expenditure.username === username
    );


    const Amount = Number(amount);

    if (userExpenditureIndex !== -1) {
      this.expenditurePerPerson[userExpenditureIndex].expenditure += Amount;
    } else {
      this.expenditurePerPerson.push({ username, expenditure: Amount });
    }

    await this.save();
  };
  







const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
