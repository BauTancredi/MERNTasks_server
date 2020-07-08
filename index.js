const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Create server
const app = express();

// Connect to DB
connectDB();

// Enable CORS
app.use(cors());

//Enable express.json
app.use(express.json({ extended: true }));

// App port
const port = process.env.PORT || 4000;

// Import routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));

// Start app
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is working on the port ${port}`);
});
