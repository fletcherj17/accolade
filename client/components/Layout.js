import React from "react";
import Head from "next/head";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Accolade</title>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link 
        href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" 
        rel="stylesheet" 
        integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM=" 
        crossOrigin="anonymous" />
      </Head>

      <Header />
      <main className="mt-10">{children}</main>
    </>
  );
};

export default Layout;
