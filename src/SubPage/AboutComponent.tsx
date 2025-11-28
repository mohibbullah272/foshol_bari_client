'use client';

import React, { useEffect } from 'react';
import { Sprout, Users, TrendingUp, Shield, Target, Award } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Hero Section Component
const AboutHero = () => {
  return (
    <section className="relative bg-primary/50 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 via-primary/50 to-primary/30 backdrop-blur-lg" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            আমাদের সম্পর্কে জানুন
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            ফসল বাড়ি হলো বাংলাদেশের কৃষি খাতে বিনিয়োগের একটি বিশ্বস্ত প্ল্যাটফর্ম।
            আমরা বিনিয়োগকারী এবং কৃষকদের মধ্যে সেতুবন্ধন তৈরি করি, যাতে সবাই লাভবান হতে পারে।
          </p>
        </div>
      </div>
 
    </section>
  );
};

// Mission Section Component
const MissionSection = () => {
  const missions = [
    {
      icon: <Sprout className="w-12 h-12" />,
      title: "কৃষি উন্নয়ন",
      description: "বাংলাদেশের কৃষি খাতকে আধুনিক ও লাভজনক করে তোলা এবং কৃষকদের আর্থিক সহায়তা প্রদান করা।"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "সবার জন্য সুযোগ",
      description: "প্রত্যেক বিনিয়োগকারীকে কৃষি খাতে লাভজনক বিনিয়োগের সুযোগ প্রদান এবং স্বচ্ছতা নিশ্চিত করা।"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "মুনাফা বৃদ্ধি",
      description: "কৃষি প্রকল্পে বিনিয়োগের মাধ্যমে বিনিয়োগকারীদের জন্য নিয়মিত এবং নিরাপদ মুনাফা নিশ্চিত করা।"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            আমাদের লক্ষ্য ও উদ্দেশ্য
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            আমরা বিশ্বাস করি যে কৃষি হলো বাংলাদেশের অর্থনীতির মূল ভিত্তি এবং এতে বিনিয়োগ সবার জন্য সমৃদ্ধি আনতে পারে।
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {missions.map((mission, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-card rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border"
            >
              <div className="text-primary mb-4">{mission.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3">
                {mission.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {mission.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Component
const HowItWorks = () => {
  const steps = [
    {
      step: "১",
      title: "বিনিয়োগকারী নিবন্ধন",
      description: "আমাদের প্ল্যাটফর্মে সহজেই অ্যাকাউন্ট তৈরি করুন এবং আপনার পছন্দের প্রকল্প খুঁজে নিন।"
    },
    {
      step: "২",
      title: "প্রকল্প নির্বাচন",
      description: "বিভিন্ন কৃষি প্রকল্প থেকে আপনার পছন্দের প্রকল্পে বিনিয়োগ করুন এবং সম্ভাব্য মুনাফা দেখুন।"
    },
    {
      step: "৩",
      title: "বিনিয়োগ সম্পন্ন",
      description: "নিরাপদ পেমেন্ট পদ্ধতির মাধ্যমে আপনার পছন্দের পরিমাণ বিনিয়োগ করুন।"
    },
    {
      step: "৪",
      title: "মুনাফা প্রাপ্তি",
      description: "প্রকল্প সম্পন্ন হলে আপনার বিনিয়োগকৃত অর্থ সহ মুনাফা সরাসরি আপনার অ্যাকাউন্টে পাবেন।"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            কীভাবে কাজ করে
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            ফসল বাড়িতে বিনিয়োগ করা অত্যন্ত সহজ এবং স্বচ্ছ। মাত্র চারটি ধাপে আপনি শুরু করতে পারেন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="relative"
            >
              <div className="bg-card rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-border h-full">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl md:text-3xl font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {item.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Component
const WhyChooseUs = () => {
  const features = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: "নিরাপদ ও বিশ্বস্ত",
      description: "আপনার বিনিয়োগ সম্পূর্ণ নিরাপদ এবং আমরা সর্বোচ্চ স্বচ্ছতা নিশ্চিত করি।"
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "লক্ষ্যভিত্তিক প্রকল্প",
      description: "প্রতিটি প্রকল্প সুনির্দিষ্ট লক্ষ্য ও সময়সীমা নিয়ে পরিচালিত হয়।"
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "প্রমাণিত সাফল্য",
      description: "আমাদের অসংখ্য সফল প্রকল্প এবং সন্তুষ্ট বিনিয়োগকারী রয়েছে।"
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "উচ্চ মুনাফা",
      description: "প্রতিযোগিতামূলক এবং আকর্ষণীয় মুনাফার হার প্রদান করি।"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            কেন ফসল বাড়ি বেছে নেবেন
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            আমরা শুধু একটি প্ল্যাটফর্ম নই, আমরা আপনার আর্থিক সমৃদ্ধির সহযোগী।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="flip-left"
              data-aos-delay={index * 100}
              className="bg-card rounded-lg p-6 md:p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-border group hover:border-primary"
            >
              <div className="text-primary mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-card-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Component
const StatsSection = () => {
  const stats = [
    { value: "৫০০+", label: "সফল প্রকল্প" },
    { value: "২০০০+", label: "বিনিয়োগকারী" },
    { value: "১৫+", label: "জেলায় কার্যক্রম" },
    { value: "৯৫%", label: "সন্তুষ্টির হার" }
  ];

  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </h3>
              <p className="text-primary-foreground/90 text-sm md:text-base lg:text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="bg-primary rounded-2xl p-8 md:p-12 lg:p-16 text-center shadow-2xl"
          data-aos="zoom-in"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 md:mb-6">
            আজই শুরু করুন আপনার বিনিয়োগ যাত্রা
          </h2>
          <p className="text-primary-foreground/90 text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
            ফসল বাড়ির সাথে যুক্ত হয়ে কৃষি খাতে বিনিয়োগ করুন এবং নিশ্চিত মুনাফা অর্জন করুন।
          </p>

        </div>
      </div>
    </section>
  );
};

// Main About Page Component
export default function AboutComponent() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AboutHero />
      <MissionSection />
      <HowItWorks />
      <WhyChooseUs />
      <StatsSection />
      <CTASection />
    </div>
  );
}