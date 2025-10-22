"use client";

import ProjectCard from "@/components/project/ProjectCard";
import SearchField from "@/components/ui/SearchField";
import { IProject } from "@/types";

import { useEffect, useState, useCallback } from "react";

const ProjectComponent = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = useCallback(async (signal:any) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/project/all?searchTerm=${searchTerm}`,
        { signal }
      );
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data.data);
    } catch (err:any) {
      if (err.name !== "AbortError") setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const controller = new AbortController();
    const delay = setTimeout(() => {
      handleFetch(controller.signal);
    }, 400); // debounce 400ms

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [searchTerm, handleFetch]);

  return (
    <div className=" max-w-7xl mx-auto p-5">
      <SearchField setSearchTerm={setSearchTerm} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
       {
        projects.map((project:IProject)=><ProjectCard key={project.id} project={project}></ProjectCard>)
       }
      </div>
    </div>
  );
};

export default ProjectComponent;
