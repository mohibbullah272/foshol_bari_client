"use client"
import Image from 'next/image';
import Link from 'next/link';
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { IProject } from '@/types';
import React from 'react';

interface ProjectCardProps {
  project: IProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const firstImage = project.image[0] || '/placeholder-image.jpg';
  
 


  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate days remaining
  const getDaysRemaining = (expireDate: string) => {
    const today = new Date();
    const expire = new Date(expireDate);
    const diffTime = expire.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining(project.expireDate);
  React.useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);
  return (
    <div data-aos="fade-up" className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 md:h-52 lg:h-56 xl:h-60 overflow-hidden">
        <Image
          src={firstImage}
          alt={project.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {/* Days Remaining Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {daysRemaining} days left
          </div>
        </div>

        {/* Location Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-background/80 text-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {project.location}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 md:p-6">

        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 line-clamp-1">
            {project.name}
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

      
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Share Price</p>
            <p className="text-sm sm:text-base font-semibold text-foreground">
              {project.sharePrice}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Profit/Share</p>
            <p className="text-sm sm:text-base font-semibold text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              {project.profitPerShare}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Total Shares</p>
            <p className="text-sm sm:text-base font-semibold text-foreground">
              {project.totalShare}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Expires</p>
            <p className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(project.expireDate)}
            </p>
          </div>
        </div>

 

        {/* Action Button */}
        <Link 
          href={`/projects/${project.id}`}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 sm:py-3 px-4 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 flex items-center justify-center gap-2"
        >
   বিস্তারিত দেখুন
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}