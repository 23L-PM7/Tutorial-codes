import axios from "axios";

export async function fetcher(path: string) {
  const response: any = await axios.get(`http://localhost:4000/${path}`, {
    headers: {
      "access-token": localStorage.getItem("accessToken") || "",
    },
  });

  return response.data;
}

export async function mutator(path: string, postData: {}) {
  const response: any = await axios.post(`http://localhost:4000/${path}`, postData, {
    headers: {
      "access-token": localStorage.getItem("accessToken") || "",
    },
  });

  return response.data;
}
