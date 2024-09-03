const express = require("express");
const cors = require("cors");
const app = express();
const port = "5000";

app.use(express.json());
app.use(cors());

const testRoutes = require("./routes/test");

app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen(port, () => {
  console.log("Listening to port");
});
