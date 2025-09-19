import React, { useState, useEffect} from "react";
import { MdModeEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import DeleteBlogModal from "./DeleteBlogModal.tsx";
import EditBlog from "./EditBlog.tsx";
import Form from "./Form.tsx";
import { fetchArticles } from "../config/firebaseBlogDataConfig.ts";
import { Article } from "../type/Article.ts";
import { useTheme } from "../context/themeContext.tsx";

interface ListBlogProps {
  userLoggedIn: boolean;
  blogTitle: string
}

const ListBlog: React.FC<ListBlogProps> = ({ userLoggedIn, blogTitle }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogId, setBlogId] = useState("");
  const { darkMode } = useTheme();

  useEffect(() => {
    let isMounted = true; 
    const loadArticles = async () => {
      setLoading(true);
      try {
        const { articles, blogId } = await fetchArticles(blogTitle);
        if (!isMounted) return ;

        setBlogId(blogId);
        setArticles(articles);
      } catch (error) {
        console.error("Error loading articles:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadArticles();

    return () => { isMounted = false };
  }, [blogTitle]);

  const handleArticleAdded = (newArticle: Article) => {
    setArticles((prev) => [ newArticle, ...prev,]);
  }

  const handleDeleteSuccess = (articleId: string) => {
    setArticles((prev) => prev.filter(article=> article.id !== articleId));
  };

  const handleEditSuccess = (articleId: string, newTitle: string, newContent: string) => {
    setArticles((prev) => 
      prev.map((article) =>
        article.id === articleId
        ? {...article, title: newTitle, content: newContent}
        : article
      )
    );
  };

  if (loading) {
    return <div>Loading article...</div>;
  }

  return(
    <div>
      {userLoggedIn && <Form onArticleAdded={handleArticleAdded} blogId={blogId} />}
      <div className={`container ${darkMode ? "container-dark" : "container-light"}`}>
        {articles.length === 0 ? (
          <p >No articles found.</p>
        ) : (
          articles.map((article, index) => (
            <div key={article.id}>
              <div className="title-box">
                <h3 className={darkMode ? "dark-color" : ""}>{article.title}</h3>
                  {userLoggedIn && (
                    <div className="icons">
                      <div className="icon-box">
                        <DeleteBlogModal
                          children={<HiTrash
                            className={`icon1 icon ${darkMode ? "icon-dark": ""}`} 
                            />}
                          blogId={blogId}
                          articleId={article.id}
                          onDeleteSuccess={(handleDeleteSuccess)}
                        />
                      </div>
                      <div className="icon-box">
                        <EditBlog
                          blogId={blogId}
                          articleId={article.id}
                          currentTitle={article.title}
                          currentContent={article.content}
                          onEditSuccess={handleEditSuccess}
                        >
                          <MdModeEdit className={`icon1 icon ${darkMode ? "icon-dark": ""}`} />
                        </EditBlog>
                      </div>
                    </div>
                  )}
              </div>

              <p className={darkMode ? "dark-color" : ""}>{article.content}</p>
              <p className={`date ${darkMode ? "dark-color" : ""}`}>
                {new Date(article.date).toLocaleString()}
              </p>
              {index !== articles.length - 1 && <hr className={darkMode ? "dark-hr" : "light-hr"}/>}
            </div>
          ))
        )}
      </div>
    </div>
   
  )

};

export default ListBlog;