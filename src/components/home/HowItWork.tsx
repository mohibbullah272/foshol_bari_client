"use client"
import * as React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TimelineEntry = {

  title: string;
  content: string;
};

const timelineData: TimelineEntry[] = [
    {
      title: "প্রজেক্ট সিলেক্ট করুন",
      content:
        "আপনি আমাদের প্ল্যাটফর্মে লগইন করার পর আপনার পছন্দ অনুযায়ী বিভিন্ন কৃষি প্রকল্প থেকে নির্বাচন করতে পারবেন। প্রতিটি প্রকল্পে বিনিয়োগের সম্ভাব্য লাভ, সময়কাল এবং রিটার্ন পলিসি বিস্তারিতভাবে দেখানো হবে।",
    },
    {
      title: "KYC মাধ্যমে ভেরিফিকেশন",
      content:
        "নিরাপদ বিনিয়োগ নিশ্চিত করতে, আপনাকে KYC (Know Your Customer) প্রক্রিয়ার মাধ্যমে আপনার তথ্য যাচাই করতে হবে। যাচাই সম্পন্ন হলে আমরা আপনাকে নিশ্চিতকরণের নোটিফিকেশন পাঠাব।",
    },
    {
      title: "বিনিয়োগ করুন",
      content:
        "আপনার প্রিয় প্রকল্প নির্বাচন করার পর, আপনি Nogod, Bkash, Rocket অথবা ব্যাংক ট্রান্সফারের মাধ্যমে সহজে বিনিয়োগ সম্পন্ন করতে পারবেন। পেমেন্ট প্রক্রিয়া সম্পূর্ণ হলে ফর্ম পূরণ করতে হবে এবং ড্যাশবোর্ড থেকে বিস্তারিত নজর রাখতে পারবেন।",
    },
    {
      title: "ফার্ম আপডেট দেখুন",
      content:
        "বিনিয়োগের পর, আপনার ড্যাশবোর্ডে নির্বাচিত প্রকল্পের উন্নয়ন ও ফার্মের সাম্প্রতিক আপডেট দেখতে পাবেন। প্রকল্পের সমস্ত কার্যক্রম এবং অগ্রগতি স্বচ্ছভাবে প্রদর্শিত হবে।",
    },
    {
      title: "লাভ সংগ্রহ করুন",
      content:
        "প্রকল্পের নির্দিষ্ট সময়কাল শেষে, আপনার বিনিয়োগ থেকে লাভ প্রকল্পের Return Policy অনুযায়ী আপনার অ্যাকাউন্টে সময়মতো credited হবে। প্রতিটি শেয়ারের সাথে নির্দিষ্ট রিটার্নের নিশ্চয়তা থাকবে।",
    }
  ]
  

const HowItWork = () => {
    React.useEffect(() => {
        AOS.init({ duration: 1000 }); 
      }, []);
  return (
    <section className="bg-background py-32 px-5">
      <div >
        <h1 className="text-foreground mb-10 text-center text-3xl font-bold tracking-tighter sm:text-6xl">
        বিনিয়োগ প্রক্রিয়া
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="bg-primary/60 absolute left-2 top-4"
          />
          {timelineData.map((entry, index) => (
            <div  data-aos="fade-up" key={index} className="relative mb-10 pl-8">
              <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
              <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
                {entry.title}
              </h4>

         

              <Card className="my-5 border-none shadow-none">
                <CardContent className="px-0 xl:px-2">
                  <div
                    className="prose dark:prose-invert text-foreground"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HowItWork };
