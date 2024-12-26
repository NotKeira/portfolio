import React, { useEffect, useRef } from "react";

const Name: React.FC<{ name: string }> = ({ name }) => {
  const nameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.animate(
        [
          { opacity: 0, transform: "translateY(-50px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 1000, fill: "forwards" }
      );
    }
  }, []);

  return (
    <div
      ref={nameRef}
      className="name"
      style={{ opacity: 0, transform: "translateY(-50px)" }}
    >
      {name}
    </div>
  );
};

export default Name;
