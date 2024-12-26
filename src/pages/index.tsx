import React from "react";
import { Layout, Name } from "@/components/index";

const Home: React.FC = () => {
  return (
    <Layout>
      <section className="section">
        <Name name="Keira Hopkins" />
        <p className="description">
          Hi! I'm Keira. I'm an 18 year old self taught programmer from
          Hampshire, England.
          <br />
          I very first started programming back when I was around 7 years old, I
          used Scratch and it felt right. I then went on to learn python around
          the age 9 to 11, and ever since I've been trying to improve my
          knowlege and ability to program.
          <br />
          My main focus is on web development, but I also have experience in
          game development, software engineering, and more.
        </p>
      </section>
    </Layout>
  );
};

export default Home;
