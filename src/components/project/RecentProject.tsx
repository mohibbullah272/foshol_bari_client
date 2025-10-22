import ProjectCard from "./ProjectCard";
import { IProject } from '../../types/index';


const RecentProject = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/all?limit=3`)
    const projects= await res.json()
    return (
        <div className="max-w-7xl mx-auto my-20">
            <h3 className="text-4xl text-center my-10 font-bold">চলমান প্রকল্প</h3>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center items-center lg:gap-5 md:gap-10 gap-15 px-5">
                {
                    projects?.data.map((project:IProject)=><ProjectCard project={project} key={project?.id}></ProjectCard>)
                }
            </div>
        </div>
    );
};

export default RecentProject;