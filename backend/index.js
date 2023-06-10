// import express, { Express } from "express";
const express = require('express');
const router = require('express-promise-router');
const { createForm } = require('./src/formSubmit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const {uploadIds} = require("./creator.json");
const mongoose = require("mongoose");

const connectDB = require("./src/db");

const { idCollection } = require('./src/formSubmit');

const { SpheronClient, ProtocolEnum } = require('@spheron/storage');

const fs = require('fs');

// const spheronToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJjYmRhZmRmN2YwYzkxODhjNWU2NmMzZjcxYzA5ODY1MGFkODcyMjRiOTY5ZjFjNzE1ZjIyYjUxNDdjZjNlOGE3YjNiNGIzNjlmNmUyYWMyNDY5MmNjYzVmMDU1OTJiMGY1OWVlMjI3MTI5YTYyYmM2ODQ1NjlmMzA1ZDY3YjFkZSIsImlhdCI6MTY4MjMyOTI1MCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.r5AvsUSs1o5HGMe5jonEizBR062yr2uVQ2eG0V64yec";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiI3NWZjMDA3MTFkNzA3MGZmOTc1MDliNGE0OTNmOWZmOWE2N2U5MWFmYjkxODZiMjQ4YTFmMjhhNDg3OTM2ZjdhYmViOTlhNTllZTYwZDJmMWJmYmYxNjU0M2FiZDU3MTliMzAxMzQ3YTJlMDk1MTFjZjRmZDg5NWI4ZTNkZTQzYiIsImlhdCI6MTY4MjUxNjI0NCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.KiJH_8TaOe8--jjJ9fddnPGq2FyC4szbLa-lPe0gWy0";

const client = new SpheronClient({ token });


connectDB();






const route = new router();
const cors = require('cors');
const app = new express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(route);

route.get("/", (req, res) => {
  res.status(200).send("Health Status Okay!");
});

route.post("/createForm", async (req, res) => {

  console.log('req.body = ', req.body);

  console.log('body', req.query.form);

  await createForm(req.body);

  res.status(200).send("Health Status Okay!");

})

//get all the forms uploaded.


route.get("/uploads", (req,res)=>{


  idCollection.find()
  .then((ids) => {
    res.json(ids);
  })
  .catch((err) => {
    res.status(500).json({ error: 'Failed to retrieve ids' });
  });
})

route.delete("/delete/:id", (req,res)=>{
 
  idCollection.findByIdAndDelete(req.params.id)
  .then((id) => {
    if (!id) {
      return res.status(404).json({ error: 'Id not found' });
    }
    res.sendStatus(204);
  })
  .catch((err) => {
    res.status(500).json({ error: 'Failed to delete Id' });
  });
})






route.get('/fetchdata/:id', async (req, res) => {
  const id = req.params.id;
  console.log("uploaded id : here : ", id);
  
  const response = await client.getUpload(id);
  console.log("response : ", response);

  

  const objectToSend = {
    id: id,
    key: response.protocolLink,
 };

 console.log("This is the object to send : ", objectToSend);

  res.send(objectToSend);
});

//login Part started


const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


const logs = new mongoose.Schema({
   email:String,
   password : String,
   user : String,
   name : String
});


const LogAdmin = mongoose.model('logs', logs);

route.post('/login', async (req, res) => {
  const { email, password } = req.body;

 
  const user = await LogAdmin.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
  
});



//register
route.post("/register", async (req, res) => {
  const {  email, password, user, name } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await LogAdmin.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await LogAdmin.create({
   
      email,
      password: encryptedPassword,
      user,
      name
    });
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({status:"error"});
  }
});

//login part end










app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
