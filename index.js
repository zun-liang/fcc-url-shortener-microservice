import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
