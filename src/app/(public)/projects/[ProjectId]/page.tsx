import { authOptions } from "@/helpers/authOption";
import ProjectDetails from "@/SubPage/ProjectDetails";
import { getServerSession } from "next-auth";

export async function generateMetadata({
    params,
  }: {
    params: Promise<{ ProjectId: string }>
  }) {
    const ProjectId = (await params).ProjectId
   
    // fetch post information
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/details/${ProjectId}`)
const project = await res.json()
   
    return {
      title: project?.data?.name,
      description: project?.data?.description,
    }
  }
   
const ProjectDetailsPage =async ({
    params,
  }: {
    params: Promise<{ ProjectId: string }>
  }) => {
const {ProjectId}= await params
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/details/${ProjectId}`)

const project = await res.json()
const solidUser =await getServerSession(authOptions)

    return (

        <div>
       <ProjectDetails user={{id:solidUser?.user.id}} project={project?.data}></ProjectDetails>
        </div>
    );
};

export default ProjectDetailsPage;