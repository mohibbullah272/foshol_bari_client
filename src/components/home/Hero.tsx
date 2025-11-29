import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import Link from "next/link";
export const dynamic = "force-static";

const Hero = () => {


  return (
    <section className="dark relative flex h-svh max-h-[1400px] w-svw overflow-hidden bg-[url('https://i.ibb.co.com/RTkKWNqS/561301201-122149535006629334-6672374294351864672-n.jpg')] bg-cover bg-center bg-no-repeat font-sans after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:bg-black/20 after:content-[''] md:h-svh">
      <div className="relative z-30 m-auto flex max-w-[46.25rem] flex-col items-center justify-center gap-6 px-5">
        <div>
        <TextGenerateEffect className="text-foreground text-center font-serif text-4xl leading-tight md:text-6xl xl:text-[4.4rem]" words="স্মার্ট ইনভেস্টমেন্ট, স্মার্ট এগ্রিকালচার"></TextGenerateEffect>
        </div>
        <div>
     <TextGenerateEffect className="text-foreground text-center font-semibold text-base" words="AI ও ডেটা-চালিত কৃষি ব্যবস্থায় বিনিয়োগ করে নিশ্চিত করুন আপনার মুনাফা ও কৃষকের উন্নয়ন — একসাথে এগিয়ে চলুন সবুজ ভবিষ্যতের পথে।"></TextGenerateEffect>
        </div>
    <Link href={'/projects'}>
    <Button className="h-fit w-fit rounded-full px-7 py-4 font-medium text-white leading-tight">
         see all projects
        </Button>
    </Link>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-[url('https://i.ibb.co.com/RTkKWNqS/561301201-122149535006629334-6672374294351864672-n.jpg')] bg-repeat opacity-1" />
    </section>
  );
};

export { Hero };
