const express = require("express");
// const cors = require("cors");
const app = express();
const port = "5000";
const cors = require("cors");
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow GET and POST methods
    allowedHeaders: "Content-Type", // Allow Content-Type headers
  })
);

app.use(express.json());

// const testRoutes = require("./routes/test");

// app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.post("/search", async (req, res) => {
  try {
    const { searchQuery } = req.body;
    console.log("Search query:", searchQuery); // Log the search query
    // console.log("Request body:", req.body);
    res.status(201).send("Searched");
  } catch (e) {
    console.log("Error occurred:", e);
    res.status(500).send("Error occurred");
  }
});

app.listen(port, () => {
  console.log("Listening to port");
});
