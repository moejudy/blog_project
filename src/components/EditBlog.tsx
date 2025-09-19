import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { editArticle } from "../config/firebaseBlogDataConfig.ts";

interface EditBlogProps {
  children: React.ReactNode;
  blogId: string,
  articleId: string,
  currentTitle: string,
  currentContent: string,
  onEditSuccess:(articleId: string, newTitle: string, newContent: string) => void;

}

const EditBlog: React.FC<EditBlogProps> = ({ children, blogId, articleId, currentTitle, currentContent, onEditSuccess}) => {
  const [editedArticle, setEditedArticle] = useState({
    title: currentTitle,
    content: currentContent
  })
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    setEditedArticle({
      title: currentTitle,
      content: currentContent
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> 
  ) => {
    const { name, value } = e.target;
    setEditedArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await editArticle(blogId, articleId, { title: editedArticle.title, content: editedArticle.content });
      onEditSuccess(articleId, editedArticle.title, editedArticle.content);
      setModal(false);

    } catch (error) {
      console.error("Failed to edit article:", error);
    }
  };

  return (
    <>
    <button
      onClick={toggleModal}
      className="btn-modal"
    >
      { children }
    </button>

    {modal && (
       <div className="modal">
       <div className="overlay"></div>
       <div className="modal-content edit">
         <h2>Edit my blog</h2>
         <form>
          <div className="input-box">
            <label className="input-label">Title:</label>
            <input
              className="input"
              onChange={handleChange}
              name="title"
              value={editedArticle.title}
            />
            <label className="input-label edit-inputLabel-content">Content:</label>
            <textarea
              rows={7}
              name="content"
              value={editedArticle.content}
              className="input "
              onChange={handleChange}
            />
          </div>
          <button 
            className="close-modal"
            onClick={toggleModal}
          >
            <IoMdClose />
          </button>

          <div className="btn-box">
            <button
            onClick={handleSubmit}
            className="btn btn-blue"
            >
              {loading? "Saving..." : "Submit"}
            </button>
            <button
              onClick={toggleModal}
              className="btn btn-outline btn-right"
            >
              Cancel
            </button>
          </div>
         </form>
        
       </div>

     </div>
    )}
   
  </>
  )
};

export default EditBlog;