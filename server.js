import express from "express";
import axios from "axios";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/balance", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secsers.com/api/v2?key=14f1aa3a1d3e6872069740f71c3a2468&action=balance"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
});

const PORT = 3000;
// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
// "https://secsers.com/api/v2?key=14f1aa3a1d3e6872069740f71c3a2468&action=balance";
