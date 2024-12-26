import React from "react";
import { Layout, ContactForm } from "@/components/index";

const Contact: React.FC = () => {
  return (
    <Layout>
      <section className="section">
        <h1 className="title">Contact</h1>
        <ContactForm />
      </section>
    </Layout>
  );
};

export default Contact;
