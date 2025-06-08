import { Category } from "./types/category";
import { Snippet } from "./types/snippet";
import axios from "axios";

export async function fetchSnippets(): Promise<Snippet[]> {
  const response = await axios.get("http://localhost:5000/api/snippets");
  return response.data;
}

export async function saveSnippet(snippet: Snippet): Promise<Snippet> {
  const response = await axios.post("http://localhost:5000/api/snippets", snippet);
  return response.data;
}

export async function deleteSnippet(id: string) {
  await axios.delete(`http://localhost:5000/api/snippets/${id}`);
}

export async function updateSnippet(id: string, snippet: Partial<Snippet>) {
  const response = await axios.put(`http://localhost:5000/api/snippets/${id}`, snippet);
  return response.data;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await axios.get("http://localhost:5000/api/categories");
  return res.data;
}

export async function saveCategory(name: string) {
  return axios.post("http://localhost:5000/api/categories", { name });
}

export async function deleteCategory(id: string) {
  return axios.delete(`http://localhost:5000/api/categories/${id}`);
}
