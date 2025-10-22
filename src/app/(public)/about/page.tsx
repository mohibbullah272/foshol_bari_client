import AboutComponent from "@/SubPage/AboutComponent";
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About Us',
  description: 'ফসল বাড়ি হলো বাংলাদেশের কৃষি খাতে বিনিয়োগের একটি বিশ্বস্ত প্ল্যাটফর্ম।',
}

const AboutPage = () => {
  return (
    <div>
    <AboutComponent></AboutComponent>  
    </div>
  );
};

export default AboutPage;