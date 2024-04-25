import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { Schema, connect, model } from "mongoose";
import multer from "multer";
import { nanoid } from "nanoid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

function getExtension(filename: string) {
  const names = filename.split(".");
  if (names.length > 1) {
    return `.${names.pop()}`;
  }
  return "";
}

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
      const filename = `${nanoid()}${getExtension(file.originalname)}`;
      cb(null, filename);
    },
  }),
});

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

const app: Express = express();
const port = process.env.PORT || 4000;

dotenv.config();

app.use(express.json());
app.use(cors());

app.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
  // req.file

  const filePath = req.file?.path;

  if (filePath) {
    const result = await cloudinary.uploader.upload(filePath);
    console.log(result);
    res.json({ url: result.secure_url });
  }
});

// read many
app.get("/categories", async (req: Request, res: Response) => {
  const categories = await Category.find({}, "_id name description image").collation({ locale: "en" }).sort({ name: 1 });
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

// update one 1
app.put("/categories/:id", async (req: Request, res: Response) => {
  const updates = req.body;
  await Category.updateOne({ _id: req.params.id }, updates);
  res.sendStatus(204);
});

// delete one
app.delete("/categories/:id", async (req: Request, res: Response) => {
  await Category.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

connect(`${process.env.MONGODB_STRING}`).then(() => {
  console.log("MongoDB started");
});
