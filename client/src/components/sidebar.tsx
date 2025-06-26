import React from "react";
import { useState, useEffect } from "react";
import snippetlogo from "../assets/snippetlogo.svg";
import { Category } from '../types/category'
import moon from "../assets/moon.svg";
import { Link } from "react-router-dom";
import { deleteCategory, fetchCategories, saveCategory } from "../storage";

export default function Sidebar() {
  const [showCategories, setShowCategories] = useState(false);
  const [showcatForm, setShowCatForm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
  }



  useEffect(() => {
    const loadCategories = async () => {
        try {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error("Failed to load categories:", error);
        }
    };
    loadCategories();
}, []);

  const handleAddCategory = async() => {
    
    if (newCategory.trim() && !categories.some(cat => cat.name === newCategory.trim()) ){
      await saveCategory(newCategory.trim());
      const categories = await fetchCategories();
      setCategories(categories);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = async(id: string) => {
    await deleteCategory(id);
    setCategories(prev => prev.filter(cat => cat._id !== id));
  };

  

  return (
    <div className="sidebar sticky top-0 left-0 flex flex-col h-screen w-[18vw] bg-white  ">
      <div className="logo flex items-center w-[18vw] justify-center gap-2 mt-2 mb-20">
        <img src={snippetlogo} className="w-8" alt="" />
        <p className="text-[#8B5CF6] text-2xl font-montserrat">SnippetHub</p>
      </div>
      <div className="navigation text-lg font-montserrat flex flex-col gap-2 items-start text-gray800">
        <Link to="/u/:username/home">
          <div className="home text-lg font-montserrat w-[18vw] p-3 pl-4 flex justify-start hover:bg-slate-400 hover:cursor-pointer">
            Home
          </div>
        </Link>
        <Link to="/pinned">
          {" "}
          <div className="pinned w-[18vw] p-3 pl-4 flex justify-start hover:bg-slate-400 hover:cursor-pointer">
            Pinned
          </div>
        </Link>
        <div className="categories w-[18vw] p-3 pl-4 flex flex-col items-start justify-start hover:bg-slate-400 hover:cursor-pointer">
          <button onClick={() => setShowCategories((prev) => !prev)}>
            Categories
          </button>
          {showCategories && (
            <ul className="ml-4 mt-2">
              {categories.length === 0 ? (
                <li className="text-gray-300 italic">No categories</li>
              ) : (
                categories.map((cat) => (
                  <li
                    key={cat._id}
                    className="flex justify-between items-center hover:underline"
                  >
                    <Link
                      to={`/category/${encodeURIComponent(cat.name)}`}
                      className="flex-1 text-black"
                    >
                      {cat.name}
                    </Link>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(cat._id!)}}
                      className="text-red-400 hover:text-red-600 ml-2 font-bold"
                      title={`Delete ${cat.name}`}
                    >
                      &times;
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
        <button className="w-[18vw] p-3 pl-4 flex justify-start hover:bg-slate-400 hover:cursor-pointer">
          {!showcatForm ? (
            <div
              onClick={() => setShowCatForm(true)}
              className="bg-white text-indigo500 p-2 w-full rounded hover:bg-gray-200"
            >
              Create New Category
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                className="text-black p-1 rounded"
              />
              <div className="flex gap-2">
                <div
                  onClick={() => {
                    setShowCatForm(false);
                    handleAddCategory();
                  }}
                  className="bg-white text-indigo500 p-2 rounded hover:bg-gray-200 flex-1"
                >
                  Add Category
                </div>
                <div
                  onClick={() => {
                    setShowCatForm(false);
                    setNewCategory("");
                  }}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex-1"
                >
                  Cancel
                </div>
              </div>
            </div>
          )}
        </button>
        <div onClick={logout} className="logout text-lg font-montserrat w-[18vw] p-3 pl-4 flex justify-start hover:bg-slate-400 hover:cursor-pointer">Logout</div>
      </div>
    </div>
  );
}
