import React from "react";
import { useState , useEffect} from "react";
import { Snippet } from "../types/snippet";
import { v4 as uuidv4 } from "uuid";
import { saveSnippet , fetchCategories ,fetchSnippets } from "../storage";
import { Category } from "../types/category";

interface Props {
  snippets: Snippet[];
  setSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
  categories: Category[];
  setCategories : React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function SnippetForm({ setSnippets, categories , setCategories }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileview, setFileView] = useState<string | null>(null);

   useEffect(() => {
      const load = async () => {
        const snippets = await fetchSnippets();
        const categories = await fetchCategories();
        setSnippets(snippets);
        setCategories(categories);
      };
      load();
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newSnippet: Snippet = {
    title,
    content,
    category,
    tags,
    pinned: false,
    type: "text",
    fileName: file?.name,
    fileUrl: fileview ?? undefined,
  };

  if (file) {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const snippetWithFile = { ...newSnippet, fileUrl: reader.result as string };
      try {
        const created = await saveSnippet(snippetWithFile);
        setSnippets((prev) => [created, ...prev]);
      } catch (err) {
        console.error("Failed to save snippet", err);
      }

      clearForm();
    };

    reader.readAsDataURL(file);
  } else {
    try {
      const created = await saveSnippet(newSnippet);
      setSnippets((prev) => [created, ...prev]);
    } catch (err) {
      console.error("Failed to save snippet", err);
    }

    clearForm();
  }
};


const clearForm = () => {
  setTitle("");
  setContent("");
  setCategory("");
  setTags("");
  setFile(null);
  setFileView(null);

}


  

  const handlefile = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
    if (file) {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFileView(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[72vw] gap-2 p-4 m-2 mb-6 bg-white rounded-md"
    >
      <h1 className="text-2xl rounded-md font-montserrat w-fit mb-3 text-white bg-indigo500 p-2">
        Add a Snippet...
      </h1>
          <input
            className="text-lg p-3 rounded-md h-10 bg-gray200"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="text-lg p-3 pt-2 rounded-md h-40 bg-gray200 resize-none"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full text-lg text-gray400 p-2 rounded-md h-10 bg-gray200"
          >
            <option value="" selected className="bg-gray200">
              Choose a Category
            </option>
            {categories.map((cat) => (
    <option key={cat._id} value={cat.name}>
      {cat.name}
    </option>
  ))}
          </select>
          <input
            className="text-lg p-3 rounded-md h-10 bg-gray200"
            type="text"
            placeholder="Tags(comma-separated)"
            onChange={(e) => setTags(e.target.value)}
          />
          <input type="file" name="" id="" onChange={handlefile}/>
      <button className="w-fit text-lg p-3 rounded-md h-10 bg-indigo500 flex items-center text-white hover:bg-indigo600 scale-96">
        Add
      </button>
    </form>
  );
}
