const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://PersonalProjects:${process.env.PASSWORD}@cluster0.svnoz0e.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

const run = async () => {
  try {
    app.get("/", async (req, res) => {
      res.send(
        "Hello, I am test-vercel-deploy-mongo-express-server.I am Ready To Serve...."
      );
    });

    // Read get all
    app.get("/data", async (req, res) => {
      try {
        const usersDB = client.db("testMDB").collection("users");
        const query = {};
        const curser = usersDB.find(query);
        const data = await curser.toArray();
        res.send(data);
      } catch (error) {
        console.log("Server Get All Error: ", error);
      }
    });
    // Read get one
    app.get("/data/:id", async (req, res) => {
      try {
        const usersDB = client.db("testMDB").collection("users");
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const curser = usersDB.find(query);
        const data = await curser.toArray();
        res.send(data);
      } catch (error) {
        console.log("Server Get One Error: ", error);
      }
    });
    // Create one
    app.post("/create-one", async (req, res) => {
      try {
        const usersDB = client.db("testMDB").collection("users");
        const rawData = req.body;
        const data = await usersDB.insertOne(rawData);
        res.send(data);
      } catch (error) {
        console.log("Server Get One Error: ", error);
      }
    });
    // Create many
    app.post("/create-many", async (req, res) => {
      try {
        const usersDB = client.db("testMDB").collection("users");
        const rawData = req.body;
        const options = { ordered: false };
        const data = await usersDB.insertMany(rawData, options);
        res.send(data);
      } catch (error) {
        console.log("Server Get One Error: ", error);
      }
    });
    // Create many
    app.delete("/delete/:id", async (req, res) => {
      try {
        const usersDB = client.db("testMDB").collection("users");
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const data = await usersDB.deleteOne(query);
        res.send(data);
      } catch (error) {
        console.log("Server Get One Error: ", error);
      }
    });
    // Update one
    app.patch("/update/:id", async (req, res) => {
      try {
        const usersDB = client.db("testMDB").collection("users");
        const { id } = req.params;
        const rawData = req.body;
        const doc = {
          $set: rawData,
        };
        const query = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const data = await usersDB.updateOne(query, doc, options);
        res.send(data);
      } catch (error) {
        console.log("Server Get One Error: ", error);
      }
    });
  } catch (error) {
    console.log("mongodb error: ", error);
  }
};
run();
