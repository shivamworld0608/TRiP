import express from "express";
import { createtrip,jointrip,finaltrip,finaltripp,deletetrip} from "../controller/trip.controller.js";
import Trip from "../model/trip.model.js";
const router = express.Router();
import {v4} from 'uuid';

router.post("/createtrip", createtrip);
router.post("/jointrip", jointrip);
/* router.get("/check",
           res.send("hello this is working");
); */
router.get("/finaltrip", finaltripp);
router.post("/finaltrip", finaltrip);
router.post("/deletetrip", deletetrip);
router.get("/check", (req, res) => {
    res.send("Hello, you reached here!");
});

// Route to fetch trips by username
router.get('/mytrips', async (req, res) => {
  const { username } = req.query; // Assuming username is passed as a query parameter
  try {
    const trips = await Trip.find({ usernames: username });
    res.json({ trips });
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ error: 'Error fetching trips' });
  }
});
router.get('/autocode', async (req, res) => {
  try {
    const code =v4().substring(0,8);
    console.log(code);
    res.json({ code });
  } catch (error) {
    console.error('Error in finding code:', error);
    res.status(500).json({ error: 'Error in finding the code' });
  }
});

export default router;
