import { Category } from "./types/category";
import { Snippet } from "./types/snippet";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export async function fetchSnippets(): Promise<Snippet[]> {
  const response = await axios.get(`${baseURL}/snippets`);
  return response.data;
}

export async function saveSnippet(snippet: Snippet): Promise<Snippet> {
  const response = await axios.post(`${baseURL}/snippets`, snippet);
  return response.data;
}

export async function deleteSnippet(id: string) {
  await axios.delete(`${baseURL}/snippets/${id}`);
}

export async function updateSnippet(id: string, snippet: Partial<Snippet>) {
  const response = await axios.put(`${baseURL}/snippets/${id}`, snippet);
  return response.data;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await axios.get(`${baseURL}/categories`);
  return res.data;
}

export async function saveCategory(name: string) {
  return axios.post(`${baseURL}/categories`, { name });
}

export async function deleteCategory(id: string) {
  return axios.delete(`${baseURL}/categories/${id}`);
}
