const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const mongoose = require("mongoose"); // Import mongoose
const { Console } = require("console");

const templatePath = path.join(__dirname, "../templates");
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));

// Establish connection to MongoDB database
mongoose.connect("mongodb://0.0.0.0:27017/LOGINSIGNUP")
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Define Mongoose model
const logInSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role:{type: String, require:true},
  dateofjoining:{type: String, required:true},
  address:{type: String, require:true},
  dateofbirth:{type: String, required:true},
  email:{type: String, required:true },
  password: { type: String, required: true }
});

const LogInCollection = mongoose.model("LogInCollection", logInSchema);

// Routing and handling requests
app.get("/", (req, res) => {
  res.render("login")
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/edit", (req, res) => {
  res.render("edit");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
app.get("/preedit", (req, res) => {
  res.render("preedit");
});



app.post('/signup',async (req, res) => {
  const { name, role, dateofjoining, address, dateofbirth, email, password } = req.body;
  // Check if name and password are present and not empty
  if (!name || !password ||!role||!dateofjoining||!dateofbirth||!address||!email) {
    return res.status(400).send({ error: "Missing required fields" });
  }
  const data = {
    name,
    password,
    role,
    dateofjoining,
    address,
    dateofbirth,
    email,
  };

  // Insert data into MongoDB using Mongoose model
  try {
    await LogInCollection.insertMany([data]);
    try {
      const { email } = req.body; // Extract email from request body
  
      // Fetch the specified user data from the database based on email
      const specificUser = await LogInCollection.findOne({ email });
  
      if (specificUser) {
        // Render the dashboard.hbs template, passing the specified user data
        res.render("dashboard", { specificUser });
      } else {
        res.send("User not found");
      }
    } catch (e) {
      res.send("Wrong details");
      console.log(e);
    }
  }
  catch (error) {
    console.error("Failed to save user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

  app.post("/login", async (req, res) => {
    try {
      const { email } = req.body; // Extract email from request body
  
      // Fetch the specified user data from the database based on email
      const specificUser = await LogInCollection.findOne({ email });
  
      if (specificUser) {
        // Render the dashboard.hbs template, passing the specified user data
        res.render("dashboard", { specificUser });
      } else {
        res.send("User not found");
      }
    } catch (e) {
      res.send("Wrong details");
      console.log(e);
    }
  });
  app.post("/preedit", async (req, res) => {
    try {
      const { email } = req.body; // Extract email from request body
  
      // Fetch the specified user data from the database based on email
      const specificUser = await LogInCollection.findOne({ email });
  
      if (specificUser) {
        // Render the dashboard.hbs template, passing the specified user data
        res.render("edit", { specificUser });
      } else {
        res.send("User not found");
      }
    } catch (e) {
      res.send("Wrong details");
      console.log(e);
    }
  });
  app.post('/edit',async (req, res) => {
    const { name, role, dateofjoining, address, dateofbirth, email, password } = req.body;
    // Check if name and password are present and not empty
    if (!name || !password ||!role||!dateofjoining||!dateofbirth||!address||!email) {
      return res.status(400).send({ error: "Missing required fields" });
    }
    const data = {
      name,
      password,
      role,
      dateofjoining,
      address,
      dateofbirth,
      email,
    };
  
    // Insert data into MongoDB using Mongoose model
    try {
      await LogInCollection.insertMany([data]);
      try {
        const { password } = req.body; // Extract email from request body
    
        // Fetch the specified user data from the database based on email
        const specificUser = await LogInCollection.findOne({ password });
    
        if (specificUser) {
          // Render the dashboard.hbs template, passing the specified user data
          res.render("dashboard", { specificUser });
        } else {
          res.send("User not found");
        }
      } catch (e) {
        res.send("Wrong details");
        console.log(e);
      }
    }
    catch (error) {
      console.error("Failed to save user:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  });

app.listen(3000, () => {
  console.log("Port connected at http://localhost:3000");
});
