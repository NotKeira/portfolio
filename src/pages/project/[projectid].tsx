import React from "react";
import { Layout } from "@/components";
import { GetServerSideProps } from "next";
import { getProjectById } from "@/utils/getter";
import Link from "next/link";

const ProjectDetail: React.FC<{ project: any }> = ({ project }) => {
  return (
    <Layout>
      <section className="section">
        <div className="project-info">
          <h1 className="title">{project.title}</h1>
          <p className="project-info desc">{project.description}</p>
          <div>
            <h2>Technologies Used</h2>
            <ul>
              {project.technologies.map((tech: string) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
          <Link
            href={project.link || "https://github.com/NotKeira"}
            className="github-link"
          >
            Github Repository
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { projectid } = context.params || {};
  let project: any = null;
  if (projectid) {
    try {
      project = await getProjectById(projectid as unknown as number);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }

    return {
      props: {
        project,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default ProjectDetail;
