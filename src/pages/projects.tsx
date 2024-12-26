import React from "react";
import { Card, Layout } from "@/components/index";
import projects from "@/utils/data";

const Projects: React.FC = () => {
  return (
    <Layout>
      <section className="section">
        <h1 className="title">Projects</h1>
        <div className="projects">
          {projects && projects.length > 0
            ? projects.map((project) => (
                <Card key={project.id} project={project} />
              ))
            : "No Projects Available just yet!"}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
