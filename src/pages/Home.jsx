import { useEffect } from "react";
import CreatePostForm from "../posts/CreatePostForm";
import Posts from "../posts/Posts";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CreatePostForm />
      <Posts />
    </>
  );
}

export default Home;
