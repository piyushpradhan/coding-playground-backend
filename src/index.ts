import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();

const app = express();
const router = require("./routes");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
