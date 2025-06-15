import { Category } from "./types/category";
import { Snippet } from "./types/snippet";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;


export async function fetchSnippets(): Promise<Snippet[]> {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${baseURL}/snippets`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
  return response.data;
}

export async function saveSnippet(snippet: Snippet): Promise<Snippet> {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${baseURL}/snippets`, snippet, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
  return response.data;
}

export async function deleteSnippet(id: string) {
  const token = localStorage.getItem("token");
  await axios.delete(`${baseURL}/snippets/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
}

export async function updateSnippet(id: string, snippet: Partial<Snippet>) {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${baseURL}/snippets/${id}`, snippet, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
  return response.data;
}

export async function fetchCategories(): Promise<Category[]> {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${baseURL}/categories`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
  return res.data;
}

export async function saveCategory(name: string) {
  const token = localStorage.getItem("token");
  return axios.post(`${baseURL}/categories`, { name }, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
}

export async function deleteCategory(id: string) {
  const token = localStorage.getItem("token");
  return axios.delete(`${baseURL}/categories/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
}
