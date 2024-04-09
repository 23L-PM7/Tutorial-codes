import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { checkAuth } from "./middlewares/check-auth";

const url = "mongodb+srv://erdenetsogt:UsxHfR9245skEEUG@cluster0.fvejhwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);

async function connectDB(collectionName: string) {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("food-delivery");
  const collection = db.collection(collectionName);
  return collection;
}

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/foods", checkAuth, (req: Request, res: Response) => {
  res.json(["Lasagna", "Burger"]);
});

app.get("/categories", (req: Request, res: Response) => {
  res.json(["Lasagna", "Burger"]);
});

app.post("/sign-up", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const users = await connectDB("users");

  // validate email
  // duplicate email (davhardsan)
  // password weak
  // password encrypt

  const insertResult = await users.insertOne({ email, password });

  console.log({ insertResult });

  res.sendStatus(204);
});

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  // TODO
  // 1. get user from database

  // 2. check user is exist

  // 3. check password

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
