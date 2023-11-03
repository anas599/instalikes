import express from "express";
import axios from "axios";
import cors from "cors";
import "dotenv/config";
const app = express();
// eslint-disable-next-line no-undef
const key = process.env.API_KEY;
// eslint-disable-next-line no-undef
const baseUrl = process.env.BASE_URL;
const PORT = 3001;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());
app.get("/api/balance", async (req, res) => {
  try {
    const response = await axios.get(
      `https://secsers.com/api/v2?key=${key}&action=balance`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
});

app.post("/api/postLink", async (req, res) => {
  const link = req.body.link;
  const quantity = req.body.quantity;
  const url = `${baseUrl}?key=${key}&action=add&service=4801&link=${link}&quantity=${quantity}`;

  console.log(url);
  try {
    const response = await axios.post(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
