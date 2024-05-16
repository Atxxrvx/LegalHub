const userCollection = require('../models/userModel');
const lawyerCollection = require('../models/lawyerModel');

module.exports.newDetails = async (req, res) => {
    console.log(req)
    const details = {
        barId: req.body.barId,
        userName: req.body.userName,
        preferredType: req.body.preferredType,
        yoe: req.body.yoe,
        fees: req.body.fees,
        age: req.body.age,
        feeStructure: req.body.feeStructure,
        dob: new Date(req.body.dob)
    }
    const check = await lawyerCollection.findOne({ userName: details.userName });
    if (check) {
        res.status(400).json({ messaage: "Lawyer already exists", user: check });
    }
    else {
        let lawyer = await lawyerCollection.create(details);
        return res.status(200).json({ message: "Lawyer details created", lawyer: lawyer });
    }

}

module.exports.getDetails = async (req, res) => {
    const details = req.query.userName;

    const check = await lawyerCollection.findOne({userName: details});
    if(!check){
        return res.status(404).json({message: "Lawyer not found"});
    }
    else{
        return res.status(200).json({message: "Details found", lawyer: check});
    }
}