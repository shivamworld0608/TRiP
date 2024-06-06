import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./route/user.route.js";
import createtripRoute from "./route/trip.route.js";
import transactionroute from "./route/transaction.route.js";

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ["GET","PUT","PATCH","POST","DELETE","OPTIONS"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;


// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.get("/", (req, res) => {
    res.send("Hello, this is the root!");
});
app.use("/user",userRoute);
app.use("/trip",createtripRoute);
app.use("/transaction", transactionroute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

