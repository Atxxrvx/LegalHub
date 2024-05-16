const router = require('express').Router();
const caseControllers = require('../controllers/caseController');
const userControllers = require("../controllers/userController");
const lawyerControllers = require("../controllers/lawyerController");

router.post("/new", caseControllers.newCase);

router.get("/get", caseControllers.getCases);

router.get("/getById", caseControllers.getCase);

router.post("/del", caseControllers.delCase);

router.get("/users", userControllers.getUsers);

router.get("/lawyers", userControllers.getLawyers);

router.post("/createDetails", lawyerControllers.newDetails);

router.get("/getDetails", lawyerControllers.getDetails);

router.get("/judges", userControllers.getJudges);

module.exports = router;