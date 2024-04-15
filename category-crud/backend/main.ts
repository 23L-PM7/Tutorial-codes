import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { Schema, connect, model } from "mongoose";

interface ICategory {
  name: string;
  description: string;
  position: number;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
});

const Category = model<ICategory>("Category", categorySchema);

async function startServer() {
  await connect(`${process.env.MONGODB_STRING}`);

  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT || 4000;

  app.use(express.json());
  app.use(cors());

  app.get("/categories", async (req: Request, res: Response) => {
    const categories = await Category.find();
    res.json(categories);
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

startServer().catch((err) => console.error(err));
