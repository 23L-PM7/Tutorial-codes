import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { Schema, connect, model } from "mongoose";
import { nanoid } from "nanoid";

// type ICategory = {
//   name: string;
//   description: string;
//   position: number;
// };

interface ICategory {
  _id: string;
  name: string;
  description: string;
  position: number;
  color: string;
  image: string;
  createdAt: number | string;
}

const categorySchema = new Schema<ICategory>({
  _id: String,
  name: { type: String, required: true },
  description: String,
  position: { type: Number },
  color: String,
  image: String,
  createdAt: Date,
});

const Category = model<ICategory>("Category", categorySchema);

async function startServer() {
  await connect(`${process.env.MONGODB_STRING}`);

  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT || 4000;

  app.use(express.json());
  app.use(cors());

  // read many
  app.get("/categories", async (req: Request, res: Response) => {
    const categories = await Category.find();
    res.json(categories);
  });

  // read one
  app.get("/categories/:id", async (req: Request, res: Response) => {
    const one = await Category.findById(req.params.id);
    res.json(one);
  });

  // create one
  app.post("/categories", async (req: Request, res: Response) => {
    const form = req.body;
    await Category.create({
      _id: nanoid(),
      ...form,
      createdAt: Date.now(),
    });
    res.sendStatus(201);
  });

  // update one
  app.put("/categories/:id", async (req: Request, res: Response) => {
    const updates = req.body;
    await Category.updateOne({ _id: req.params.id }, updates);
    res.sendStatus(204);
  });

  // delete one
  app.delete("/categories/:id", async (req: Request, res: Response) => {
    await Category.deleteOne({ id: req.params.id });
    res.sendStatus(204);
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

startServer().catch((err) => console.error(err));
