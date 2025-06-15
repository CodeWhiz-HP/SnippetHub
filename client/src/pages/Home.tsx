import Sidebar from "../components/sidebar";
import SnippetForm from "../components/SnippetForm";
import { Snippet } from "../types/snippet";
import SnippetCard from "../components/SnippetCard";
import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { Category } from "../types/category";
import { fetchSnippets , fetchCategories } from "../storage";

interface Props {
  snippets: Snippet [];
  setSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
  togglePin: (id: string) => void;
  categories: Category[];
  setCategories : React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function Home({ snippets, setSnippets , togglePin, categories, setCategories}: Props) {
  const { username } = useParams();
const loggedInUsername = localStorage.getItem("username");
  useEffect(() => {
    if (username !== loggedInUsername) {
      // optional: redirect or show access denied
      return;
    }
  
    const load = async () => {
      const snippets = await fetchSnippets(); 
      const categories = await fetchCategories();
      setSnippets(snippets);
      setCategories(categories);
    };
  
    load();
  }, [username]);

  return (
    <div className="home flex">
      <Sidebar />
      <div className="main-content ml-4 mt-3 w-[82vw]">
        <div className="addSnippet">
          <SnippetForm setSnippets={setSnippets} setCategories={setCategories} snippets={snippets} categories={categories}/>
        </div>
        <div className="snippetsSection w-full flex gap-[8vw] justify-start items-baseline font-montserrat">
          <div className="heading text-3xl font-montserrat ml-3">
            My Snippets
          </div>
        </div>
        <div className="snippets-container mt-5 ml-3 mb-4">
          <div className="grid gap-x-1 gap-y-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {snippets.map((snippet) => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                setSnippets={setSnippets}
                togglePin={togglePin}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
