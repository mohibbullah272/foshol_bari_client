// app/projects/progress/page.tsx
import { authOptions } from '@/helpers/authOption';
import { getServerSession } from 'next-auth';
import { ProjectProgressResponse } from '@/types';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, Image as ImageIcon, RefreshCw, ArrowLeft, Clock, FileText } from 'lucide-react';
import Link from 'next/link';
import { ProgressTimeline } from '@/components/project/project-progress-timeline';

const MyProjectProgress = async () => {
  const user = await getServerSession(authOptions);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/project/project-progress?userId=${user?.user.id}`,
    {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
  const progressData: ProjectProgressResponse = await res.json();
  
  if (!progressData.success) {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="text-destructive">অগ্রগতি তথ্য লোড করতে সমস্যা হয়েছে</div>
      </div>
    );
  }

  const projects = progressData.data;

  // Calculate statistics with new fields
  const stats = {
    totalProjects: projects.length,
    totalUpdates: projects.reduce((sum, project) => sum + (project.project.progressUpdate?.length || 0), 0),
    totalImages: projects.reduce((sum, project) => sum + (project.project.progressUpdateImage?.length || 0), 0),
    totalDatedUpdates: projects.reduce((sum, project) => sum + (project.project.progressUpdateDate?.length || 0), 0),
    totalInvestment: projects.reduce((sum, project) => sum + project.amount, 0),
    pendingProjects: projects.filter(p => p.status === 'PENDING').length,
    approvedProjects: projects.filter(p => p.status === 'APPROVED').length,
    
    // New: Projects with recent updates (within last 30 days)
    recentlyUpdated: projects.filter(project => {
      if (!project.project.progressUpdateDate?.length) return false;
      
      try {
        const latestDate = new Date(Math.max(...project.project.progressUpdateDate
          .filter(date => date)
          .map(date => new Date(date).getTime())));
        
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        return latestDate > thirtyDaysAgo;
      } catch {
        return false;
      }
    }).length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="flex-shrink-0">
            <Link href="/dashboard/investor/user-overview">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              প্রকল্প অগ্রগতি
            </h1>
            <p className="text-muted-foreground">
              আপনার বিনিয়োগকৃত প্রকল্পগুলোর বর্তমান অবস্থা এবং অগ্রগতি
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.totalProjects}</div>
                <p className="text-sm text-muted-foreground">মোট প্রকল্প</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.totalUpdates}</div>
                <p className="text-sm text-muted-foreground">মোট হালনাগাদ</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalImages}</div>
                <p className="text-sm text-muted-foreground">অগ্রগতি ছবি</p>
              </div>
              <ImageIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.recentlyUpdated}</div>
                <p className="text-sm text-muted-foreground">সাম্প্রতিক হালনাগাদ</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                ৳{formatCurrency(stats.totalInvestment)}
              </div>
              <p className="text-sm text-muted-foreground">মোট বিনিয়োগ</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">
                {stats.totalDatedUpdates}
              </div>
              <p className="text-sm text-muted-foreground">তারিখযুক্ত হালনাগাদ</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {Math.round((stats.totalDatedUpdates / (stats.totalUpdates || 1)) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">সময়সূচী অনুসরণ</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">প্রকল্প অবস্থা সারাংশ</CardTitle>
          <CardDescription>
            আপনার সকল প্রকল্পের বর্তমান অবস্থার ওভারভিউ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl font-bold text-green-600">{stats.approvedProjects}</div>
              <div className="text-sm text-green-700">অনুমোদিত প্রকল্প</div>
              <Badge variant="default" className="mt-2">সক্রিয়</Badge>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="text-2xl font-bold text-amber-600">{stats.pendingProjects}</div>
              <div className="text-sm text-amber-700">বিচারাধীন প্রকল্প</div>
              <Badge variant="secondary" className="mt-2">রিভিউ চলছে</Badge>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{stats.totalProjects}</div>
              <div className="text-sm text-blue-700">মোট প্রকল্প</div>
              <Badge variant="outline" className="mt-2">সবগুলো</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Timeline */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-primary">অগ্রগতি টাইমলাইন</CardTitle>
              <CardDescription>
                প্রকল্পভিত্তিক বিস্তারিত অগ্রগতি এবং হালনাগাদ
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/investor/user-overview">
                <RefreshCw className="h-4 w-4 mr-2" />
                ড্যাশবোর্ডে ফিরে যান
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ProgressTimeline projects={projects} />
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">সহায়তা</CardTitle>
          <CardDescription>
            প্রকল্প অগ্রগতি সম্পর্কিত সাধারণ প্রশ্ন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">অগ্রগতি হালনাগাদ</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>প্রকল্প মালিকরা নিয়মিত অগ্রগতি আপডেট করেন</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>প্রতিটি আপডেটে বিস্তারিত তথ্য, তারিখ এবং ছবি থাকে</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>টাইমলাইন অনুসারে অগ্রগতি দেখানো হয়</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">নতুন বৈশিষ্ট্য</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="text-xs">নতুন</Badge>
                  <span>- প্রতিটি হালনাগাদের তারিখ দেখানো হয়</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="text-xs">নতুন</Badge>
                  <span>- সাম্প্রতিক হালনাগাদ ট্র্যাকিং</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="text-xs">নতুন</Badge>
                  <span>- সময়সূচী অনুসরণ পরিসংখ্যান</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProjectProgress;