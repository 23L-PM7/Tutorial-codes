import { dbRequest } from "./dbRequest";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  console.log({ id });

  const { documents } = await dbRequest("categories", "find");
  return Response.json(documents);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description } = body;

  console.log({ body });

  const data = await dbRequest("categories", "insertOne", {
    document: {
      name: name,
      description: description,
    },
  });
  return Response.json(data);
}
