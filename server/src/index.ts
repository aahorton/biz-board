import express from "express";
import processRouter from "./routes/process";
import blockRouter from "./routes/block";

const app = express();

app.use(express.json());

app.use("/processes", processRouter);
app.use("/blocks", blockRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
