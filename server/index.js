// const express = require("express");
// // const cors = require("cors");
// const app = express();
// const port = "5000";
// const cors = require("cors");

// const bodyParser = require("body-parser");
// const path = require("path");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// app.use(bodyParser.json());

// require("dotenv").config();

// app.use(
//   cors({
//     origin: "*", // Allow all origins
//     methods: ["GET", "POST"], // Allow GET and POST methods
//     allowedHeaders: "Content-Type", // Allow Content-Type headers
//   })
// );

// app.use(express.json());

// // const testRoutes = require("./routes/test");

// // app.use("/api/test", testRoutes);

// app.get("/", (req, res) => {
//   res.send("HELLO");
// });

// app.post("/search", async (req, res) => {
//   try {
//     const { searchQuery } = req.body;
//     console.log("Search query:", searchQuery); // Log the search query
//     // console.log("Request body:", req.body);
//     res.status(201).send("Searched");
//   } catch (e) {
//     console.log("Error occurred:", e);
//     res.status(500).send("Error occurred");
//   }
// });

// app.listen(port, () => {
//   console.log("Listening to port");
// });

// // app.use(express.static(path.join(__dirname, "public")));

// // app.get("/", (req, res) => {
// //   res.sendFile(path.resolve(__dirname, "public", "index.html")); // Ensure correct file path
// // });

// // app.post("/", async (req, res) => {
// //   try {
// //     // const { i } = req.body;
// //     // const result = await gen("From the text provided, " + i); // Calling the gen function
// //     // res.send({ result });
// //   } catch (e) {
// //     console.error(e);
// //     res.status(500).send("Internal Server Error");
// //   }
// // });

const express = require("express");
const app = express();
const port = "5000";
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(bodyParser.json());
require("dotenv").config();

// CORS setup
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow GET and POST methods
    allowedHeaders: "Content-Type", // Allow Content-Type headers
  })
);

app.use(express.json());

// Simple GET route
app.get("/", (req, res) => {
  res.send("HELLO");
});

const GEMINI = "AIzaSyDO3qcW52EXdNQlRAtGw8ihPUr9qaCiDww";

// Search route
app.post("/search", async (req, res) => {
  try {
    const { searchQuery } = req.body;
    console.log("Search query:", searchQuery); // Log the search query

    // Call the gen function with the search query
    const result = await gen(searchQuery);
    res.status(201).send(result);
  } catch (e) {
    console.log("Error occurred:", e);
    res.status(500).send("Error occurred");
  }
});
// Initialize the generative AI client
const genAI = new GoogleGenerativeAI(GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "5 businesses near me in hyderabad, bachupally";

const generate = async () => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (e) {
    console.log(e);
  }
};

generate();

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
