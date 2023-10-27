import express from "express";
import axios from "axios";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.post("https://secsers.com/api/v2,");
app.get("/", (req, res) => {
  res.send("Hello, this is the root of the application.");
});

app.get("/jokes/random", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secsers.com/api/v2?key=34cdf3fc90e8331d5a727978619bfb09&action=balance"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
});

const PORT = 3000;
// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
