import React from "react";
import { useSearchParams } from "react-router-dom";
import BlogPage from "./BlogPage";

interface BlogWrapperProps {
  userLoggedIn: boolean;
}

const BlogPageWrapper: React.FC<BlogWrapperProps> = ({ userLoggedIn }) => {
  const [searchParams] = useSearchParams();
  const keyValue = searchParams.toString();
  const blogTitle = searchParams.get("blog");

  console.log("current Blog Title from URL", blogTitle);

  return (
    <div>
      <BlogPage key={keyValue} userLoggedIn={userLoggedIn} />
    </div>
  )
};

export default BlogPageWrapper;