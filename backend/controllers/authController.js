const userCollection = require('../models/userModel');
const bcrypt = require('bcryptjs');

module.exports.newUser = async (req, res) => {
    try {
        let newUser = {
            userName: req.body.userName,
            password: req.body.password,
            emailId: req.body.emailId,
            // address: req.body.address,
            // mobileNo: req.body.mobileNo,
            role: req.body.role
        }
        const check1 = await userCollection.findOne({ userName: newUser.userName });
        const check2 = await userCollection.findOne({ emailId: newUser.emailId });

        if (!check1 && !check2) {
            const user = await userCollection.create(newUser);
            return res.status(200).json({ message: "Successfully created new user" });
        }

        else {
            return res.status(400).json({ message: "Error, user with those details already exists" });
        }
    }
    catch (e) {
        console.log("Error occured\n", e);
        return res.status(500).json({ message: "Internal server error at new user creation" });
    }
}

module.exports.loginUser = async (req, res) => {
    console.log(req);
    try{
        let credentials = {
            emailId: req.body.emailId,
            password: req.body.password
        }
        const check = await userCollection.findOne({emailId: credentials.emailId});
        if(!check) {
            return res.status(404).json({message: "User does not exist"});
        }
        else{
            if(await bcrypt.compare(credentials.password, check.password)){
                return res.status(200).json({message: "Successfull login", user: check});
            }
            else{
                return res.status(400).json({message: "Invalid password"});
            }
        }
    }
    catch(e){
        console.log("Error occured\n", e);
        return res.status(500).json({message: "Internal server error at login user"});
    }
}