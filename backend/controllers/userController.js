const userCollection = require('../models/userModel');

module.exports.getUsers = async (req, res) => {
    try {
        let users = await userCollection.find({ role: "User" });
        return res.status(200).json({ message: "Users retrieved succesfully", users: users });
    }
    catch (e) {
        console.log("Error occured\n", e);
        return res.status(500).json({ message: "Internal server error while fetching users" });
    }
}

module.exports.getLawyers = async (req, res)=> {
    try {
        let lawyers = await userCollection.find({ role: "Lawyer" });
        return res.status(200).json({ message: "Lawyers retrieved succesfully", lawyers: lawyers });
    }
    catch (e) {
        console.log("Error occured\n", e);
        return res.status(500).json({ message: "Internal server error while fetching lawyers" });
    }
}

module.exports.getJudges = async (req, res)=> {
    try {
        let judges = await userCollection.find({ role: "Judge" });
        return res.status(200).json({ message: "Judges retrieved succesfully", judges: judges });
    }
    catch (e) {
        console.log("Error occured\n", e);
        return res.status(500).json({ message: "Internal server error while fetching judges" });
    }
}