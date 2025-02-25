import React from "react";
import { Layout, Name } from "@/components/index";

const Home: React.FC = () => {
  return (
    <Layout>
      <section className="section">
        <Name name="Keira Hopkins" />
        <p className="description">
          Hi! I'm Keira, an 18-year-old self-taught programmer from Hampshire,
          England.
          <br />
          I started programming when I was around seven years old, using
          Scratch. Between the ages of 9 and 11, I moved on to Python, and since
          then, I've been continuously working to expand my knowledge and
          improve my programming skills.
          <br />
          My main focus is web development, but I also have experience in game
          development, software engineering, and more.
        </p>
      </section>
    </Layout>
  );
};

export default Home;
