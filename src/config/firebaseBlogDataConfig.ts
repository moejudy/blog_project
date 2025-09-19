import { db } from "./firebaseConfig";
import { 
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc
 } from "firebase/firestore";
import { BlogData } from "../type/BlogData";
import { Article } from "../type/Article";

/**************** BLOG ******************/
export async function fetchBlogData(blogTitleParam: string): Promise<BlogData | null> {
  try {
    const blogRef = collection(db, "blogs");
    const querySnapshot = await getDocs(blogRef);

    let foundData: BlogData | null = null;
    const normalizedQuery = blogTitleParam.replace(/\s+/g, "").toLowerCase();

    querySnapshot.forEach((doc) => {
      const data = doc.data() as BlogData;
      const normalizedStoredTitle = data.blog_title.replace(/\s+/g, "").toLowerCase();

      if (normalizedStoredTitle === normalizedQuery) {
        foundData = data;
      }
    });

    return foundData;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export async function fetchUserDataByEmail(email: string) {
  const userRef = collection(db, "users");
  const q = query(userRef, where("email", "==", email));

  const querySnapShot = await getDocs(q);
  if (querySnapShot.empty) {
    console.log("No matching documents");
    return null;
  }

  let userData = null;
  querySnapShot.forEach((doc) => {
    userData = doc.data();
  });
  return userData;
}

export  async function getBlogDocId(title: string): Promise<string | null> {
    const blogRef = collection(db, "blogs");

    const q = query(blogRef, where("blog_title", "==", title));
    const snapshot =await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      console.log(`BLog ID for "${title}: ${doc.id}`);
      return doc.id;
    }
    return null;
  }

  export async function getBlogTitleByEmail(email: string): Promise<string | null> {
    if (!email) return null;
  
    const blogRef = collection(db, "blogs");
    const q = query(blogRef, where("email", "==", email));
    const snapshot = await getDocs(q);
  
    if (!snapshot.empty) {
      const doc = snapshot.docs[0].data();
      return doc.blog_title; 
    }
    
    return null;
  }


/**************** ARTICLE ******************/
  export async function fetchArticles(blogTitle: string): Promise<{ articles: Article[], blogId: string }> {
    try {
      const blogDocId = await getBlogDocId(blogTitle);
      if (!blogDocId) return { articles: [], blogId: "" };

      const articleRef = collection(db, "blogs", blogDocId, "articles");
      const q = query(articleRef, orderBy("date", "desc"));
      const snapshot = await getDocs(q);

      const fetched: Article[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date().toISOString(),
      })) as Article[];

      return { articles: fetched, blogId: blogDocId };

     } catch(error) {
      console.error("Error fetching articles:", error);
      return { articles: [], blogId: "" };
     }
  }

  export async function addNewArticle(blogId: string, article: {title: string; content: string;}) {
    try {
      if (!blogId) {
        throw new Error("Blog Id is required to add an article");
      }

      const blogDocRef = doc(db, "blogs", blogId);
      const articleRef = collection(blogDocRef, "articles");

      const docRef = await addDoc(articleRef, {
        ...article,
        date: serverTimestamp(),
      });

      const newArticle = {
        id: docRef.id,
        title: article.title,
        content: article.content,
        date: new Date().toISOString(),
      }

      console.log("Article added with ID", newArticle.id);

      return newArticle;

    } catch (error) {
      console.error("Error adding blog: ", error);
      return null;
    }
  }

  export async function deleteArticle(blogId: string, articleId: string): Promise<void> {
    try {
      if (!blogId || !articleId) {
        throw new Error("Blog ID and Article Id are required");
      }

      const articleDocRef = doc(db, "blogs", blogId, "articles", articleId);
      await deleteDoc(articleDocRef);
      console.log("Article deleted successdully");
    } catch (error) {
      console.error("Error deleting article:", error)
    }
  }

  export async function editArticle(
    blogId: string, articleId: string, updatedData: { title: string, content: string }
    ): Promise<void> { 
    
      try {
        if (!blogId || !articleId) {
          throw new Error("Blog ID and Article ID are required to edit the article");
        }

        const articleDocRef = doc(db, "blogs", blogId, "articles", articleId);
        await updateDoc(articleDocRef, updatedData);
        console.log("Article updated successfully");
        
      } catch (error) {
        console.error("Error updating article:", error);
      }
  }