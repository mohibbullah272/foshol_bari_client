// app/contact/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Facebook, MessageSquare, Instagram } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';


// Types
interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
  description: string;
}

interface SocialLink {
  icon: React.ReactNode;
  name: string;
  handle: string;
  color: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// Zod Schema
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'নাম কমপক্ষে ২ অক্ষরের হতে হবে',
  }),
  email: z.string().email({
    message: 'সঠিক ইমেইল ঠিকানা লিখুন',
  }),
  phone: z.string().min(11, {
    message: 'সঠিক ফোন নম্বর লিখুন',
  }),
  subject: z.string().min(3, {
    message: 'বিষয় কমপক্ষে ৩ অক্ষরের হতে হবে',
  }),
  message: z.string().min(10, {
    message: 'বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে',
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Hero Section Component
const ContactHero: React.FC = () => {
  return (
    <section className="relative bg-primary/50 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary to-primary/50" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
            যোগাযোগ করুন
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-primary-foreground/90 leading-relaxed">
            আপনার যেকোনো প্রশ্ন বা সহায়তার জন্য আমরা সর্বদা প্রস্তুত। আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>
      </div>
  
    </section>
  );
};

// Contact Info Cards Component
const ContactInfoCards: React.FC = () => {
  const contactInfo: ContactInfo[] = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "ফোন নম্বর",
      details: ["01১৭১২-৩৪৫৬৭৮", "+0১৮১২-৩৪৫৬৭৮"],
      description: "সকাল ৯টা থেকে রাত ৯টা পর্যন্ত"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "ইমেইল",
      details: ["eg@gamail.com", "eg@gamil.com2"],
      description: "২৪ ঘণ্টার মধ্যে উত্তর দেওয়া হবে"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "ঠিকানা",
      details: ["Kafrul Dhaka"],
      description: "বাংলাদেশ"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "কর্মঘণ্টা",
      details: ["শনিবার - বৃহস্পতিবার", "সকাল ৯:০০ - রাত ৬:০০"],
      description: "শুক্রবার ছুটি"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-card rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border text-center group hover:border-primary"
            >
              <div className="text-primary mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                {info.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3">
                {info.title}
              </h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-foreground font-medium mb-1">
                  {detail}
                </p>
              ))}
              <p className="text-muted-foreground text-sm mt-2">
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Form Component
const ContactForm: React.FC = () => {

  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Here you would typically send data to your API
  
      
      toast.success("আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।" );
      
      form.reset();
    } catch (error) {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              আমাদের বার্তা পাঠান
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              নিচের ফর্মটি পূরণ করুন এবং আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay={200}
            className="bg-card rounded-lg p-6 md:p-8 lg:p-10 shadow-xl border border-border"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>আপনার নাম *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="আপনার পুরো নাম লিখুন" 
                            {...field} 
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ইমেইল ঠিকানা *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="example@email.com" 
                            {...field} 
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ফোন নম্বর *</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="+৮৮০ ১৭XX-XXXXXX" 
                            {...field} 
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>বিষয় *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="আপনার প্রশ্নের বিষয়" 
                            {...field} 
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>আপনার বার্তা *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="আপনার বার্তা বিস্তারিত লিখুন..." 
                          rows={6}
                          {...field} 
                          className="bg-background resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 md:py-6 text-base md:text-lg mx-auto flex items-center gap-2"
                  disabled={form.formState.isSubmitting}
                >
                  <Send className="w-5 h-5" />
                  {form.formState.isSubmitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};


// Social Media Section Component
const SocialMediaSection: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      icon: <Facebook className="w-8 h-8" />,
      name: "ফেসবুক",
      handle: "@fosholbari",
      color: "hover:bg-blue-500"
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      name: "ইনস্টাগ্রাম",
      handle: "@fosholbari",
      color: "hover:bg-pink-500"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      name: "হোয়াটসঅ্যাপ",
      handle: "০১৭১২-৩৪৫৬৭৮",
      color: "hover:bg-green-500"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            সামাজিক মাধ্যমে যুক্ত হন
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            আমাদের সাথে সংযুক্ত থাকুন এবং সর্বশেষ আপডেট পান।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {socialLinks.map((social, index) => (
            <div
              key={index}
              data-aos="flip-up"
              data-aos-delay={index * 100}
              className={`bg-card rounded-lg p-6 md:p-8 shadow-lg transition-all duration-300 border border-border text-center group cursor-pointer ${social.color} hover:text-white`}
            >
              <div className="inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                {social.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                {social.name}
              </h3>
              <p className="text-sm md:text-base opacity-90">
                {social.handle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Contact Page Component
export default function ContactComponent() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ContactHero />
      <ContactInfoCards />
      <ContactForm />
      <SocialMediaSection />
   
    </div>
  );
}