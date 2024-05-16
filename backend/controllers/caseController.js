const caseCollection = require('../models/caseModel');
const userCollection = require('../models/userModel');
const mongoose = require('mongoose');

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function get_random(list) {
    return list[Math.floor((Math.random() * list.length))];
}


module.exports.getCase = async (req, res) => {
    const caseId = new mongoose.Types.ObjectId(req.query.caseId);
    const check = await caseCollection.findById(caseId);
    if (!check) {
        return res.status(404).json({ message: "Case not found" });
    }
    else {
        return res.status(200).json({ message: "Case found", case: check });
    }
}

function randomInRange(start,end){
    return Math.floor(Math.random() * (end - start + 1) + start);
}

module.exports.newCase = async (req, res) => {
    try {
        randnum = 3;

        randnum = randomInRange(12, 30);
        let date = new Date();
        let newCase = {
            defendant: req.body.defendant,
            plaintiff: req.body.plaintiff,
            plaintiffLawyer: "Paras Churi",
            defendantLawyer: req.body.defendantLawyer,
            judge: req.body.judge,
            caseType: req.body.caseType,
            description: req.body.description,
            nextDate: date.addDays(randnum)
        };
        let judges = await userCollection.find({role: "Judge"});
        let lawyers = await userCollection.find({ role: "Lawyer" });
        let lawyer = get_random(lawyers);
        let judge = get_random(judges);
        while (lawyer.userName == newCase.defendantLawyer) {
            lawyer = get_random(lawyers);
        }
        while(judge.userName == newCase.judge){
            judge = get_random(judges);
        }
        newCase.plaintiffLawyer = lawyer.userName;
        newCase.judge = judge.userName;

        for (let user of [newCase.defendant, newCase.plaintiff, newCase.judge, newCase.defendantLawyer]) {
            console.log(user);
            let check1 = await userCollection.findOne({ userName: user });
            console.log(check1);
            if (!check1) {
                return res.status(404).json({ message: "Error: names provided do not exist" });
            }
        }

        let check = await caseCollection.findOne({ defendant: newCase.defendant, plaintiff: newCase.plaintiff, judge: newCase.judge });
        if (check) {
            return res.status(400).json({ message: "Error: Case with the same details already exists" });
        }

        let caseObj = await caseCollection.create(newCase);
        for (let user of [newCase.defendant, newCase.plaintiff, newCase.judge, newCase.lawyer]) {
            await userCollection.updateOne({ userName: user }, { $push: { userCases: caseObj._id } });
        }

        return res.status(200).json({ case: newCase, message: "Success: New case created successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "Error: Internal server error in creating new case" });
    }
}


module.exports.delCase = async (req, res) => {
    let caseId = new mongoose.Types.ObjectId(req.body.caseId);
    console.log(caseId);
    if (!(await caseCollection.findById(caseId))) {
        return res.status(404).json({ message: "No such case exists" });
    }
    let check = await userCollection.find({ userCases: caseId });
    // console.log(check);
    check.forEach(async (user) => {
        await userCollection.findOneAndUpdate({ userName: user.userName }, { $pull: { userCases: caseId } });
    });

    await caseCollection.deleteOne({ _id: caseId });
    return res.status(200).json({ message: "Case deleted successfully" });
}

module.exports.getCases = async (req, res) => {
    try {
        console.log(req);
        const userName = req.query.userName;
        const cases1 = await caseCollection.find({ defendant: userName });
        console.log(cases1);
        const cases2 = await caseCollection.find({ plaintiff: userName });
        console.log(cases2);
        const cases3 = await caseCollection.find({ judge: userName });
        console.log(cases3);
        const cases4 = await caseCollection.find({ plaintiffLawyer: userName });
        console.log(cases4);
        const cases5 = await caseCollection.find({ defendantLawyer: userName });
        console.log(cases5);
        let cases = cases1.concat(cases2).concat(cases3).concat(cases4).concat(cases5);
        let uniqueArray = cases.filter(function(item, pos) {
            return cases.indexOf(item) == pos;
        })
        return res.status(200).json({ message: "fetched cases", cases:  uniqueArray});
    }
    catch (e) {
        console.log("Error occured\n", e);
        return res.status(500).json({ message: "Internal server error in fetching cases" });
    }
}