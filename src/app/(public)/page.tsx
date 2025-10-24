import Faq from '@/components/home/FAQ';
import Feature from '@/components/home/Feature';
import { Hero } from '@/components/home/Hero';
import { HowItWork } from '@/components/home/HowItWork';
import RecentProject from '@/components/project/RecentProject';
import Testimonial from '@/components/home/Testimonial';
import React from 'react';

const HomePage = () => {
    return (
        <div>
        <Hero></Hero>
        <RecentProject></RecentProject>
        <Feature></Feature>
        <HowItWork></HowItWork>
        <Testimonial></Testimonial>
        <Faq></Faq>
        </div>
    );
};

export default HomePage;