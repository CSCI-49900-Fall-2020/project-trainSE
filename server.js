require("dotenv").config();
const express = require("express"); // Including the express module in this file
const mongoose = require("mongoose"); // For MongoDB
const cors = require("cors");
const path = require("path"); // For deployment

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
app.use("/api/users", require("./routes/api/userRouter"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/domain", require("./routes/api/domainRouter"));
app.use("/api/upload", require("./routes/api/uploadRouter"));

// Serve static assests (the build folder) if we're in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // Any request that we get that isn't the routes middleware
  // These requests must be wanting to fetch front end react pages instead of accessing backend api routes
  app.get("*", (req, res) => {
    return res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html")
    );
  });
}

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
