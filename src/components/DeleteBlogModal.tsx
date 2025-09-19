import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { deleteArticle } from "../config/firebaseBlogDataConfig";


interface ModalProps {
  blogId: string;
  articleId: string;
  onDeleteSuccess: (articleId: string) => void;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ blogId, articleId, onDeleteSuccess, children }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }
  
  const handleDelete = async (blogId: string, articleId: string) => {
    console.log(blogId, articleId);
    try {
      await deleteArticle(blogId, articleId);
      onDeleteSuccess(articleId);
      toggleModal();
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  }

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
         <div className="container modal-content">
           <h2>Attention</h2>
           <p>Do you want to delete this blog:?</p>
           <button 
             className="close-modal"
             onClick={toggleModal}
           >
            <IoMdClose />
           </button>

           <div className="btn-box">
            <button
              onClick={() => handleDelete(blogId, articleId)}
              className="btn btn-red"
            >
              Delete
            </button>
            <button
              onClick={toggleModal}
              className="btn btn-outline btn-right"
            >
              Cancel
            </button>
           </div>

     
         </div>
 
       </div>
      )}
     
    </>
  )
}

export default Modal;