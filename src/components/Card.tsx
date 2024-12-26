import React from "react";
import Link from "next/link";

const Card: React.FC<{ project: any }> = ({ project }) => {
  return (
    <Link className="card" href={`/project/${project.id}`}>
      <h2 className="card-title">{project.title}</h2>
      <p className="card-description">{project.description}</p>
    </Link>
  );
};

export default Card;
