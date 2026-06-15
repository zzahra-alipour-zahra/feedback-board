const express = require("express");
const cors = require("cors");
require("dotenv").config();
const feedbackRoutes = require("./routes/feedbackRoutes");
const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");


const app = express();

app.use(cors({
  origin: "http://localhost:3001"
}));
app.use(express.json());
app.use(express.static("public"));


app.use("/auth", authRoutes);
app.use("/feedback", feedbackRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Feedback Board API is running...");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});