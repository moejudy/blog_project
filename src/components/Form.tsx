import { NewBlog } from "../type/Blog.ts";
import React, { useState } from "react";
import { addNewArticle } from "../config/firebaseBlogDataConfig.ts";
import { useTheme } from "../context/themeContext.tsx";

interface FormProps {
  blogId: string;
  onArticleAdded: (newArticle: {id: string; title: string; content: string; date: string}) => void;
}

const Form: React.FC<FormProps> = ({ blogId, onArticleAdded }) =>{
  const [article, setArticle] = useState<NewBlog>({
    title: '',
    content: '',
    date: Date.now(),
  });

  const { darkMode } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setArticle((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!article.title || !article.content) {
      alert("Please enter a title and content.");
      return;
    }
  
    const newArticle = await addNewArticle(blogId, {
      title: article.title,
      content: article.content,
    });

    if (newArticle) {
      console.log("new article added:", newArticle);
      onArticleAdded(newArticle);
    }
    
    setArticle({
      title: '',
      content: '',
      date: new Date().toISOString(), // Set new date properly
    })
  };

  return (
    <div className={`container ${darkMode ? "container-dark" : "container-light"}`}>
      <p className={darkMode ? "dark-color" : ""}>
        You can write your post here!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label className={`input-label ${darkMode ? "dark-color" : ""}`}>
            Title:
          </label>
          <input
            onChange={handleChange}
            name="title"
            type="text"
            value={article.title}
            className={`input ${darkMode ? "input-dark" : ""}`}
          />
        </div>
        <div className="input-box">
          <label className={`input-label ${darkMode ? "dark-color" : ""}`}>
            Content:
          </label>
          <textarea
            onChange={handleChange}
            name="content"
            value={article.content}
            rows={10}
            className={`input ${darkMode ? "input-dark" : ""}`}
          />
        </div>
        <div className="btn-box">
          <button className="btn btn-blue" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Form;