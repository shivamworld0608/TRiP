import express from "express";
/* import User from "../model/user.model.js"; */
import { signup, login ,profile,verifymail} from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", profile);
router.post("/verify",verifymail);


/* router.get('/un', async (req, res) => {
    const { email } = req.query; // Assuming username is passed as a query parameter
    try {
      const user = await User.findOne({ email: email });
      res.json({ user });
    } catch (error) {
      console.error('Error fetching trips:', error);
      res.status(500).json({ error: 'Error fetching trips' });
    }
  }); */
export default router;

