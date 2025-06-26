import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import './input.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Pinned from "./pages/pinned";
import { Snippet } from "./types/snippet";
import { Category } from './types/category';
import {fetchSnippets, saveSnippet, deleteSnippet, updateSnippet, fetchCategories, saveCategory, deleteCategory} from "./storage"
import SnippetView from './pages/SnippetView';
import CategoryPage from './pages/category';
import LandingPage from './pages/LandingPage';



function App() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);



  
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


  const handletogglePin = (id: string) => {
    setSnippets((prev) =>
      prev.map((e) =>
        e._id === id ? { ...e, pinned: !e.pinned } : e
      )
    );
  };





  return (
    <div className="App bg-slate-300 h-screen " id="root">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="/u/:username/home" element={<Home categories={categories} setCategories={setCategories} snippets={snippets} setSnippets={setSnippets} togglePin={handletogglePin}/>} />
          <Route path="/u/:username/pinned" element={<Pinned categories={categories} togglePin={handletogglePin} snippets={snippets} setSnippets={setSnippets} />} />
          <Route path="/snippet/:id" element={<SnippetView categories={categories} snippets={snippets} setSnippets={setSnippets} />} />
          <Route path="/u/:username/category/:name" element={<CategoryPage snippets={snippets} setSnippets={setSnippets} togglePin={handletogglePin} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
