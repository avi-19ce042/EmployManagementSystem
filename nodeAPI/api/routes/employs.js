const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Employ = require("../models/employ");

router.get("/", (req, res, next) => {
  Employ.find()
    .exec()
    .then((emps) => {
      const response = {
        // count: emps.length,
        employs: emps.map((emp) => {
          console.log(emp);
          return {
            id: emp._id,
            name: emp.name,
            emailId: emp.emailId,
            mobileNo: emp.mobileNo,
            dept: emp.dept,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const employ = new Employ({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    emailId: req.body.emailId,
    mobileNo: req.body.mobileNo,
    dept: req.body.dept
  });
  employ
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /employs",
        createdEmploy: employ,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.get("/:empId", (req, res, next) => {
  const id = req.params.empId;
  Employ.findById(id)
    .exec()
    .then((emp) => {
      console.log(emp);
      res.status(200).json(emp);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:empId", (req, res, next) => {
    const id = req.params.empId;
    Employ.remove({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

module.exports = router;

// const employ = {
//     // name: "hello world"
//     name: req.body.name,
//     emailId: req.body.email,
//     mobileNo: req.body.mobileNo,
//     dept: req.body.dept
// };
