import User from "../model/user.model.js";
import Verify from "../model/verify.model.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

const sendverifymail=async(fullname,email,otp,retries=5)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            requireTLS:true,
            auth: {
              user: "trip.06teams@gmail.com",
              pass: "ooboznziujkbdiam",
    }
        });

       const mailOptions = {
    from: "trip.06teams@gmail.com",
    to: email,
    subject: "TRiP: OTP for Verification",
    text: `
Hello ${fullname},
Your OTP: ${otp}`,
};

 for (let attempt = 1; attempt <= retries; attempt++) {
      /*   await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email has been sent: " + info.response);
            } }); */
 try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent successfully on attempt ${attempt}`);
            return;
        } catch (error) {
            console.error(`Error sending email on attempt ${attempt}: ${error.message}`);
            if (attempt === retries) {
                throw new Error("Failed to send email after multiple attempts");
            }
        }
        };

    }catch(error){
        console.log("Error: " + error.message);
        throw new Error("Technical error in sending OTP");
       /*  res.status(500).json({ message: "Technical Error in sending OTP" }); */ 
    }
}

export const signup = async(req, res) => {
    try {
        const { fullname, email, password, username } = req.body;
        console.log(fullname);
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already used" });
        }
        const usern = await User.findOne({ username });
        if (usern) {
            return res.status(400).json({ message: "This Username is not available" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            username: username,
            password: hashPassword,
        });
        const userdata=await createdUser.save();
        console.log("data aa gya");
        const otp = Math.floor(100000 + Math.random() * 900000);
if(userdata){
    await sendverifymail(fullname, email, otp);
    //generate a otp and save a document in verify model 
    const createdOtp = new Verify({
        otp: otp,
        user_id: createdUser._id
    });
    await createdOtp.save();
    console.log("verify wala model create ho gya")

    res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                username: createdUser.username,
                email: createdUser.email,
            },
        });
    }

    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    username: user.username,
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const profile = async(req, res) => {
    try {
        const { username } = req.query;
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    username: user.username,
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const verifymail=async(req,res)=>{
    const {user_id,otp}=req.body;
    const Userr=await User.findOne({_id:user_id});
    const userr=await Verify.findOne({user_id:user_id});
    if(userr.otp===otp){
        await User.updateOne({_id:user_id},{$set:{isverified:true}});
        await Verify.deleteOne({user_id:user_id});
        res.status(201).json({message:"Email Verified successfully",
        user: {
            _id: Userr._id,
            fullname: Userr.fullname,
            username: Userr.username,
            email: Userr.email,
        },
        });
    }
    else{
        res.status(400).json({message:"Invalid OTP"});
    }

}
