import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import postContext from "../context/posts/postContext";
import Post from "../components/Post";
import authContext from "../context/auth/authContext";
import NewPost from "../components/NewPost";

const Posts = () => {
  // define context
  const PostContext = useContext(postContext);
  const {  getPosts, message, filterPost, postsfiltered } = PostContext;
  // Define auth context
  const AuthContext = useContext(authContext);
  const { user, autenticatedUser } = AuthContext;

  // get posts when component is loaded
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      autenticatedUser();
    }
    // if there is an error
    if (message) {
      //mostrarAlerta(mensaje.msg, mensaje.categoria);
      console.log(message);
    }

    getPosts();
    // eslint-disable-next-line
  }, [message]);

  // Function to filter posts
  const filter = (e) => {
    e.preventDefault();
    filterPost(e.target.value); // filter posts
  };

  //  check if there are posts
  if (postsfiltered.length === 0)
    return (
      <Layout>
        <div className="text-center font-semi-bold">
          <h1 className="mb-10">There aren't posts </h1>

          {user ? <NewPost /> : null}
          <div className="flex justify-center">
            <select name="type" onChange={filter} default="default">
              <option value="default">Select a type...</option>
              <option value="Looking for actors">Looking for actors</option>
              <option value="Looking for dancers">Looking for dancers</option>
              <option value="Looking for influencers">
                Looking for influencers
              </option>
              <option value="Looking for photographers or videographers">
                Looking for photographers or videographers
              </option>
            </select>
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      {user ? (
        <>
          <NewPost />
          <div className="flex justify-center">
            <select name="title" onChange={filter} default="default">
            <option value="default" disabled={true}>Select a type...</option>
              <option value="Looking for actors">Looking for actors</option>
              <option value="Looking for dancers">Looking for dancers</option>
              <option value="Looking for influencers">
                Looking for influencers
              </option>
              <option value="Looking for photographers or videographers">
                Looking for photographers or videographers
              </option>
            </select>
          </div>
        </>
      ) : null}
      <ul className="m-20 pl-20 pr-20">
        {postsfiltered.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </ul>
    </Layout>
  );
};

export default Posts;
