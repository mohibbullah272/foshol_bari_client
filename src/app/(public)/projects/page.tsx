import ProjectComponent from '@/SubPage/ProjectComponent';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project',
}


export const runtime = "edge";




const Projects = () => {
  return (
    <div>
      <ProjectComponent></ProjectComponent>
    </div>
  );
};

export default Projects;