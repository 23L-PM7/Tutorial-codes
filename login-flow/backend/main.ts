import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/foods", (req: Request, res: Response) => {
  res.json(["Lasagna", "Burger"]);
});

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log({ email, password });

  // TODO
  const loggedIn = true;

  if (loggedIn) {
    const accessToken = jwt.sign({ email: email }, "secret_string123");
    res.json({ accessToken });
  }

  res.sendStatus(401);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
