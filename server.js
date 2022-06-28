const express = require("express");
const mongoose = require("mongoose");
const { port,mongoURI,db } = require("./config");
const employee = require("./services/employee/employee");
const middleware = require("./middleware");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));

mongoose
  .connect(mongoURI+"/"+db)
  .then(() => console.log(`${db} database Connected`))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/signUp", async (req, res) => {
  try {
    const { msg, status, data } = await employee.registerEmployee(req.body);
    res.status(status).send({msg,data});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/login/:email/:password",async (req,res)=>{
  try {
    const {msg,status,data} = await employee.login(req.params);
    res.status(status).send({msg,data});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/dashboard",middleware,async(req,res)=>{
  try {
    const {msg,status,data} = await employee.fetchProjects(req);
    res.status(status).send({msg,data});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => console.log(`server listening on port ${port}`));
