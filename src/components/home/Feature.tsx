"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import feature1image from '../../../asset/feature1.jpg'
import feature2image from '../../../asset/feature2.jpg'
export const dynamic = "force-static";

const Feature = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); 
      }, []);
  return (
    <section className="py-32 px-5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:px-16">
        <div className="lg:max-w-sm">
          <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            
            কেন আমাদের সঙ্গে বিনিয়োগ করবেন?
          </h2>
          <p className="text-muted-foreground mb-8 lg:text-lg">
            আমরা আপনার বিনিয়োগকে কৃষি প্রকল্পে কাজে লাগাই — যেখানে প্রতিটি
            টাকা ভবিষ্যতের ফসল হয়ে ফিরে আসে। লাভের অংশ থেকে আপনি পান নির্দিষ্ট
            রিটার্ন, আর দেশের কৃষি পায় নতুন সম্ভাবনা।
          </p>
          <a
            href="#"
            className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
          >
            আরও জানুন{" "}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
     
          <div data-aos="fade-right" className="border-border flex flex-col overflow-clip rounded-xl border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
              <Image
                src={feature1image}
                alt="Feature 1"
                className="aspect-16/9 h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                কৃষিতে বিনিয়োগ, লাভে অংশীদার
              </h3>
              <p className="text-muted-foreground lg:text-lg">
                আপনার বিনিয়োগ করা অর্থ সরাসরি নির্বাচিত কৃষি প্রকল্পে
                ব্যবহৃত হয়। প্রকল্প থেকে আয় হলে, লাভের অংশ নির্দিষ্ট অনুপাতে
                বিনিয়োগকারীদের মধ্যে বণ্টন করা হয়।
              </p>
            </div>
          </div>

         
          <div data-aos="fade-left" className="border-border flex flex-col-reverse overflow-clip rounded-xl border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                নির্ভরযোগ্য রিটার্ন ও স্বচ্ছ ব্যবস্থাপনা
              </h3>
              <p className="text-muted-foreground lg:text-lg">
                প্রতি শেয়ারের সঙ্গে থাকে একটি নির্দিষ্ট রিটার্নের নিশ্চয়তা।
                আমাদের স্বচ্ছ হিসাব ও ট্র্যাকিং সিস্টেম নিশ্চিত করে আপনি জানেন
                আপনার অর্থ কোথায় এবং কীভাবে কাজ করছে।
              </p>
            </div>
            <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
              <Image
                src={feature2image}
                alt="Feature 2"
                className="aspect-16/9 h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
