import React from "react";
import AuthState from "../context/auth/authState";
import PostState from "../context/posts/postState";
import EventState from "../context/events/eventState";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      <EventState>
        <PostState>
      <Component {...pageProps} />
      </PostState>
      </EventState>
    </AuthState>
  );
};
export default MyApp;
