import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  interface FaqItem {
    id: string;
    question: string;
    answer: string;
  }
  
  interface Faq3Props {
    heading?: string;
    description?: string;
    items?: FaqItem[];
    supportHeading?: string;
    supportDescription?: string;
    supportButtonText?: string;
    supportButtonUrl?: string;
  }
  
  const faqItems = [
    {
      id: "faq-1",
      question: "ফসল বাড়ি কী?",
      answer:
        "ফসল বাড়ি একটি কৃষি বিনিয়োগ প্ল্যাটফর্ম, যেখানে আপনি নিরাপদভাবে কৃষি প্রকল্পে বিনিয়োগ করতে পারেন এবং নির্দিষ্ট সময় শেষে লাভ অর্জন করতে পারেন।",
    },
    {
      id: "faq-2",
      question: "আমি কীভাবে বিনিয়োগ শুরু করতে পারি?",
      answer:
        "প্রথমে আমাদের ওয়েবসাইট থেকে একটি প্রকল্প নির্বাচন করুন, এরপর আপনার তথ্য দিয়ে KYC সম্পন্ন করুন। যাচাই শেষে বিকাশ, নগদ, রকেট বা ব্যাংক ট্রান্সফারের মাধ্যমে বিনিয়োগ করুন।",
    },
    {
      id: "faq-3",
      question: "আমার ইনভেস্টমেন্টের আপডেট কোথায় পাব?",
      answer:
        "আপনি আপনার ড্যাশবোর্ডের ‘Overview’ সেকশনে গিয়ে নিজের নির্বাচিত প্রকল্পের অগ্রগতি ও আপডেট দেখতে পারবেন।",
    },
    {
      id: "faq-4",
      question: "লাভ কীভাবে প্রদান করা হয়?",
      answer:
        "প্রতিটি প্রকল্পের নির্দিষ্ট রিটার্ন নীতিমালা অনুসারে নির্ধারিত সময় শেষে আপনার লাভ স্বয়ংক্রিয়ভাবে আপনার অ্যাকাউন্টে জমা হবে।",
    },
    {
      id: "faq-5",
      question: "বিনিয়োগ কি নিরাপদ?",
      answer:
        "অবশ্যই। ফসল বাড়ির সকল প্রকল্প যাচাই-বাছাই করা কৃষি উদ্যোক্তা ও চুক্তিভিত্তিক চাষিদের মাধ্যমে পরিচালিত হয়, যাতে আপনার ইনভেস্টমেন্ট থাকে সম্পূর্ণ নিরাপদ।",
    },
    {
      id: "faq-6",
      question: "KYC যাচাই করতে কত সময় লাগে?",
      answer:
        "সাধারণত ২৪ ঘণ্টার মধ্যে KYC যাচাই সম্পন্ন হয়। যাচাই শেষ হলে আপনি ইমেইল বা নোটিফিকেশনের মাধ্যমে জানানো হবে।",
    },
    {
      id: "faq-7",
      question: "আমি কি একাধিক প্রকল্পে বিনিয়োগ করতে পারি?",
      answer:
        "হ্যাঁ, আপনি একাধিক প্রকল্পে বিনিয়োগ করতে পারেন। এতে আপনি বিভিন্ন কৃষি উদ্যোগে অংশ নিতে পারবেন এবং লাভের সম্ভাবনাও বাড়বে।",
    },
  ];
  
  
  const Faq = ({
    heading = "প্রায় জিজ্ঞাসিত প্রশ্নাবলী",
    description = "ফসল বাড়ি নিয়ে সাধারণ প্রশ্নগুলোর উত্তর এখানে পাবেন। আরও জানতে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।",
    items = faqItems,
  }: Faq3Props) => {
    return (
      <section className="py-32 ">
        <div className="space-y-16 max-w-7xl mx-auto  px-5">
          <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
              {heading}
            </h2>
            <p className="text-muted-foreground lg:text-lg">{description}</p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full lg:max-w-3xl"
          >
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                  <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="sm:mb-1 lg:mb-2">
                  <div className="text-muted-foreground lg:text-lg">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  };
  
  export default Faq ;
  