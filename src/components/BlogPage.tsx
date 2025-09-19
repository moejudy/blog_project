import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import { BlogData } from "../type/BlogData";
import { fetchBlogData } from "../config/firebaseBlogDataConfig";
import ListBlog from "./ListBlog";
import { useTheme } from "../context/themeContext";

interface BlogPageProps {
  userLoggedIn: boolean;
}

const BlogPage: React.FC<BlogPageProps> = ({ userLoggedIn }) => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { darkMode } = useTheme();

  const blogTitleParam = searchParams.get("blog");

  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      if (blogTitleParam) {
        const foundData = await fetchBlogData(blogTitleParam);

        if (isMounted) {
          setBlogData(foundData);
          setLoading(false);
        }
      } else {
        console.warn("No blog query parameter provided");
        setBlogData(null);
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    }
  }, [blogTitleParam]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!blogData) {
    return <div>Blog Not Found</div>
  }

  return (
    <div>
      <div className={darkMode ? "background-box-dark": "background-box-light"}>
        <h1 className={`title ${darkMode ? "textColor-dark" : "textColor-light"}`}>{blogData.blog_title}</h1>
      </div>
      <div className={darkMode ? "background-box-dark": "background-box-light"}>
        <div className={`introduction ${darkMode ? "textColor-dark" : "textColor-light"}`}>
          <p>{blogData.blog_presentation}</p>

        </div>
      </div>
      <ListBlog userLoggedIn={userLoggedIn} blogTitle={blogData.blog_title}/>
    </div>
  )
}

export default BlogPage;