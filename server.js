const express = require("express"); // Including the express module in this file
const mongoose = require("mongoose"); // For MongoDB
const cors = require("cors");
require("dotenv").config();

// Set up express
const app = express();
app.use(express.json()); // Using the JSON body parser
app.use(cors());

// Setting up mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// Setting up routes middleware
const users = require("./routes/userRouter");
app.use("/users", users);

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
