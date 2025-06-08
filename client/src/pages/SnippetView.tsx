import React, { useState, useEffect } from "react";
import { Snippet } from "../types/snippet";
import { Category  } from "../types/category";
import { useParams, useNavigate } from "react-router-dom";
import { updateSnippet } from "../storage";
import { useSearchParams } from "react-router-dom";

interface Props {
  snippets: Snippet[];
  setSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
  categories: Category[];
}



export default function SnippetView({ snippets , categories , setSnippets }: Props) {


  const { id } = useParams();
  const snippet = snippets.find((e) => e._id === id);
  const navigate = useNavigate();

  const [title, setTitle] = useState(snippet?.title || "");
const [content, setContent] = useState(snippet?.content || "");
const [currentSnippet, setCurrentSnippet] = useState<Snippet | null>(null);
const [category, setCategory] = useState(snippet?.category || "");
const [tags, setTags] = useState(snippet?.tags || "");

useEffect(() => {
    const snippet = snippets.find((s) => s._id === id);
    if (snippet) {
      setCurrentSnippet(snippet);
      setTitle(snippet.title);
      setContent(snippet.content);
      setCategory(snippet.category);
      setTags(snippet.tags);
    }
  }, [snippets, id]);



const handleupdateSnippet = async() => {

  if(!currentSnippet) return;

  const updated: Snippet = {
  _id: snippet!._id!,
  title,
  content,
  category ,    
  tags,
  pinned: snippet!.pinned || false,
  type: snippet!.type || "text",
  fileName: snippet!.fileName,
  fileUrl: snippet!.fileUrl,
};
    try {
      const updatedSnippet = await updateSnippet(currentSnippet._id!, updated);

      // Update in local state
      setSnippets((prev) =>
        prev.map((s) => (s._id === currentSnippet._id ? updatedSnippet : s))
      );

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Update failed", err);
    }
};

  if (!currentSnippet)
    return (
      <div className="h-[90vh] w-[90vw] ml-[10vw] mt-[10vh] text-3xl">
        Loading Snippet...
      </div>
    );

  return (
    <form className="fullpage flex flex-col items-start h-[90vh] w-[95vw] ml-[2vw] mt-[5vh] p-8 bg-white relative font-montserrat rounded-lg text-gray800 ">
      <input className="s-title w-fit p-2 text-4xl text-indigo500 font-CalSans mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <hr className="border-red-400 border-dashed border-[1.5px] mb-4 w-full" />
      <div
        className="close-btn absolute top-1 right-2 rounded-lg p-2 hover:bg-red-400 hover:cursor-pointer"
        onClick={() => {
          if (window.history.state?.idx <= 1) {
    navigate("/");
  } else {
    navigate(-1);
  }
        }}
      >
        ← Back
      </div>
      <div className=" flex gap-4 s-category text-start text-xl text-amber500 mb-4 ml-2">
        <p className="h-fit text-nowrap">Category :</p>
        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full text-xs text-gray400 p-2 rounded-md h-8 bg-gray200"
          >
            <option value="" className="bg-gray200">
              Choose a Category
            </option>
            {categories.map((cat) => (
    <option key={cat._id} value={cat.name}>
      {cat.name}
    </option>
  ))}
          </select>
      </div>
      {snippet!.fileName && (
        <div>
          <p className="flex flex-start hover:cursor-pointer hover:text-indigo500">
            {snippet!.fileName}
          </p>
          {snippet!.fileUrl?.startsWith("data:image") && (
            <img src={snippet!.fileUrl} alt={snippet!.fileName} />
          )}
        </div>
      )}
      <textarea className="content w-[95%] h-[80%] whitespace-pre-wrap text-start text-xl mb-4 mt-3 py-2 px-3 ml-[-0.25rem]"
        value={content} 
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="tags gap-2 flex items-center text-start text-xl mb-4 text-gray-600 ml-2">
        <p>Tags : </p>
        <input type="text" className="text-start text-xl text-gray-600 py-2 px-3" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <button
        onClick={handleupdateSnippet}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Save Changes
      </button>
    </form>
  );
}
