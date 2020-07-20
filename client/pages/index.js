import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import { useContext, useEffect } from "react";
import eventContext from "../context/events/eventContext";
import postContext from "../context/posts/postContext";
import moment from "moment";

export default function Index() {
  // Get autenticated user from Storage
  const AuthContext = useContext(authContext);
  const { autenticatedUser } = AuthContext;

  const EventContext = useContext(eventContext);
  const { events, getEvents, message, spinnerevent } = EventContext;

  const PostContext = useContext(postContext);
  const { posts, getPosts, spinnerpost } = PostContext;

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
    getEvents();
    getPosts();
  }, [message]);

  return (
    <Layout>
      <div className="mt-10 p-32 bg-gray-400 font-semibold text-xl rounded overflow-hidden shadow-lg my-2">
        {events.length === 0 && !spinnerevent ? (
          <>
            <h1>There aren't uncoming events</h1>
            <Link href="/events">
              <a>Go and add a new one!</a>
            </Link>
          </>
        ) : (
          <>
            {spinnerevent ? (
              <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                <span className="text-teal-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                  <i className="fas fa-circle-notch fa-spin fa-5x" />
                </span>
              </div>
            ) : null}
            <h1 className="text-center mb-10 text-3xl">Upcoming Events:</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3">
              {events.slice(0, 3).map((event) => {
                return (
                  <div key={event._id}>
                    <div className="p-4 text-center mx-0 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded ">
                      <div className="md:text-3xl">
                        {" "}
                        {moment(event.date).format("MMMM")}
                      </div>
                      <div className="md:text-6xl">
                        {" "}
                        {moment(event.date).format("D")}
                      </div>
                      <div className="md:text-xl">
                        {moment(event.date).format("LT")}
                      </div>
                    </div>
                    <div className="font-bold leading-none text-center text-gray-800">
                      {" "}
                      {event.title}
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/events">
              <a className="block mt-12 text-center text-gray-800 hover:text-gray-600 underline">
                All Events
              </a>
            </Link>
          </>
        )}
      </div>
      <div className="mt-20 p-32 bg-yellow-400 text-center font-semibold text-xl rounded overflow-hidden shadow-lg my-2">
        {posts.length === 0 && !spinnerpost ? (
          <>
            <h1> By the moment, projects aren't searching for talents</h1>
            <Link href="/posts">
              <a className="block mt-4 text-gray-800 hover:text-gray-600 underline">
                Go and post your need!
              </a>
            </Link>
          </>
        ) : (
          <>
            {spinnerpost ? (
              <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                <span className="text-teal-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                  <i className="fas fa-circle-notch fa-spin fa-5x" />
                </span>
              </div>
            ) : null}
            <h1 className="mb-10 text-3xl">Talent needed! </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3">
              {posts.slice(0, 3).map((post, index) => {
                return (
                  <div
                    className="h-auto mx-auto w-48 bg-yellow-200 rounded flex items-center justify-center text-gray-700 text-base font-semibold shadow"
                    key={post._id}
                  >
                    {" "}
                    <p className="text-center">
                      Project {index} is {post.title} in {post.city}
                    </p>
                  </div>
                );
              })}
            </div>
            <Link href="/posts">
              <a className="block mt-12 text-center text-gray-800 hover:text-gray-600 underline text-left">
                All Posts
              </a>
            </Link>
          </>
        )}
      </div>
      <div className="mt-20 p-32 bg-teal-400 text-center font-semibold text-xl rounded overflow-hidden shadow-lg my-2">
        <Link href="/">
          <a className="text-3xl">Weekly Creative Spotlight</a>
        </Link>
        <img
          className="mt-10 mx-auto h-auto w-4/5"
          src="/spotlight.jpeg"
          alt="spotlight"
        />
        <p className="mt-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus
          vehicula tellus, a volutpat justo accumsan et. Donec sollicitudin
          vulputate semper. Proin posuere non tortor ullamcorper cursus.
          Suspendisse sed velit tincidunt, gravida sem et, pellentesque sem.
          Morbi facilisis augue ex, nec euismod nisi aliquet sit amet. In
          pellentesque leo vitae libero efficitur placerat. Morbi a tempor arcu,
          sit amet scelerisque libero. In hendrerit tincidunt dictum. Sed quam
          enim, tempor ac magna nec, molestie ullamcorper diam. Pellentesque
          bibendum lorem eu eros tincidunt volutpat. In sed est vitae risus
          egestas gravida eu quis nunc. Ut accumsan malesuada nulla, at placerat
          arcu. Integer et arcu et tortor mollis congue at non quam.
        </p>
      </div>
      <div className="mt-20 p-32 bg-green-400 text-center font-semibold text-xl justify-center rounded overflow-hidden shadow-lg my-2">
        <p>Keep up with Us!</p>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          <div className="py-4">
            <div className="shadow-lg group container  rounded bg-white  max-w-sm flex justify-center items-center  mx-auto content-div">
              <div>
                <div className="py-8 px-4 bg-white  rounded fd-cl group-hover:opacity-25">
                  <img src="/post.jpg" />
                </div>
              </div>
            </div>
          </div>
          <div className="py-4">
            <div className="shadow-lg group container  rounded bg-white  max-w-sm flex justify-center items-center  mx-auto content-div">
              <div>
                <div className="py-8 px-4 bg-white  rounded fd-cl group-hover:opacity-25">
                  <img src="/post.jpg" />
                </div>
              </div>
            </div>
          </div>
          <div className="py-4">
            <div className="shadow-lg group container  rounded bg-white  max-w-sm flex justify-center items-center  mx-auto content-div">
              <div>
                <div className="py-8 px-4 bg-white  rounded fd-cl group-hover:opacity-25">
                  <img src="/post.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-20">Follow us on social media...</p>
        <div className="pt-12 items-center">
          <button className="bg-transparent mx-8 hover:bg-green-300 text-white font-bold py-2 px-2 rounded-full">
            <img className="h-10 w-10" src="/twitter.svg" />
          </button>
          <button className="bg-transparent mx-8 hover:bg-green-300 text-white font-bold py-2 px-2 rounded-full">
            <img className="h-10 w-10" src="/facebook.svg" />
          </button>
          <button className="bg-transparent  mx-8 hover:bg-green-300 text-white font-bold py-2 px-2 rounded-full">
            <img className="h-10 w-10" src="/instagram.svg" />
          </button>
        </div>
      </div>
    </Layout>
  );
}
