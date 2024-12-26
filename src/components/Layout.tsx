import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Keira Hopkins - Portfolio</title>
        <meta
          name="description"
          content="Keira Hopkins' personal portfolio website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="layout">
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
