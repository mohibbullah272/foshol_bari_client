// components/project/ProjectDetails.tsx
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, TrendingUp, DollarSign, Clock } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  description: string;
  image: string[];
  totalShare: string;
  sharePrice: string;
  profitPerShare: string;
  expireDate: string;
  Duration: string;
  location: string;
  createdAt: string;
  updateAt: string;
  payment?: Payment[]; // Make payment optional
}

interface Payment {
  userId: number;
}

interface ProjectDetailsProps {
  project: Project;
  user: {
    id: string | undefined;
  };
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, user }) => {
  // Safe check if user is invested with null checks
  const isUserInvested: boolean = project?.payment 
    ? project?.payment?.some(payment => payment?.userId === parseInt(user?.id || "0"))
    : false;

  // Safe share price parsing
  const sharePrice = parseFloat(project?.sharePrice?.replace(/[^\d.]/g, '') || '0');
  
  const queryParams = new URLSearchParams({
    projectId: project?.id?.toString() || '',
    projectName: project?.name || '',
    sharePrice: sharePrice?.toString(),
    totalShare: project?.totalShare || ''
  }).toString();

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'তারিখ পাওয়া যায়নি';
    }
  };

  // Safe image grid layout
  const renderImageGrid = () => {
    const images = project.image || [];
    
    if (images.length === 0) {
      return (
        <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">কোন ছবি পাওয়া যায়নি</span>
        </div>
      );
    }

    if (images.length === 1) {
      return (
        <div className="w-full h-96 rounded-lg overflow-hidden">
          <Image
            src={images[0]}
            alt={project?.name || 'প্রকল্প ছবি'}
            width={800}
            height={400}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      );
    }

    if (images?.length === 2) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images?.map((img, index) => (
            <div key={index} className="h-80 rounded-lg overflow-hidden">
              <Image
                src={img}
                alt={`${project?.name || 'প্রকল্প'} - ছবি ${index + 1}`}
                width={400}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    // For 3 or 4 images, use a 2x2 grid
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images?.slice(0, 4).map((img, index) => (
          <div 
            key={index} 
            className={`rounded-lg overflow-hidden ${
              images.length === 3 && index === 2 ? 'sm:col-span-2' : ''
            }`}
          >
            <div className="h-64 sm:h-80">
              <Image
                src={img}
                alt={`${project.name || 'প্রকল্প'} - ছবি ${index + 1}`}
                width={400}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Return loading state if project is not available
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-muted-foreground">প্রকল্প লোড হচ্ছে...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
          {project?.name || 'প্রকল্পের নাম'}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {project?.location || 'স্থান নির্ধারিত হয়নি'}
          </Badge>
          <Badge variant="outline" className="text-sm">
            শেয়ার: {project?.totalShare || '০'}
          </Badge>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {renderImageGrid()}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Project Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">
                প্রকল্প বিবরণ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-justify">
                {project?.description || 'প্রকল্পের বিবরণ শীঘ্রই যোগ করা হবে।'}
              </p>
            </CardContent>
          </Card>

          {/* Investment Details Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">
                বিনিয়োগের বিবরণ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-foreground">মোট শেয়ার</span>
                    <span className="font-semibold text-primary">{project?.totalShare || '০'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-foreground">প্রতি শেয়ার মূল্য</span>
                    <span className="font-semibold text-primary">৳{project?.sharePrice || '০'}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-foreground">প্রতি শেয়ার লাভ</span>
                    <span className="font-semibold text-green-500">৳{project?.profitPerShare || '০'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-foreground">মেয়াদকাল</span>
                    <span className="font-semibold text-primary">
                      {formatDate(project?.Duration)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Key Information */}
        <div className="space-y-6">
          {/* Timeline Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                সময়সূচী
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  আবেদনের শেষ তারিখ
                </span>
                <span className="font-semibold text-orange-500 text-sm">
                  {formatDate(project?.expireDate)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  প্রকল্প মেয়াদ
                </span>
                <span className="font-semibold text-primary text-sm">
                  {formatDate(project?.Duration)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                দ্রুত পরিসংখ্যান
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2">
                  <span className="text-muted-foreground">স্থান</span>
                  <span className="font-medium text-foreground">{project?.location || 'নির্ধারিত হয়নি'}</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-muted-foreground">শেয়ার প্রাইস</span>
                  <span className="font-medium text-primary">৳{project?.sharePrice || '০'}</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-muted-foreground">অনুমানিক লাভ</span>
                  <span className="font-medium text-green-500">৳{project?.profitPerShare || '০'}/শেয়ার</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            {user?.id && !isUserInvested && (
              <Link href={`/make-payment?${queryParams}`}>
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-lg">
                  এখনই বিনিয়োগ করুন
                </button>
              </Link>
            )}
            
            {!user?.id && (
              <Link href="/auth/signin">
                <button className="w-full bg-destructive text-primary-foreground hover:bg-destructive/90 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-lg">
                  বিনিয়োগ করার জন্য লগইন করুন
                </button>
              </Link>
            )}
            
            {isUserInvested && (
              <button className="w-full bg-gray-500 text-primary-foreground hover:bg-gray-600 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-lg cursor-not-allowed">
                আপনি ইতিপূর্বে বিনিয়োগ করেছেন
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;