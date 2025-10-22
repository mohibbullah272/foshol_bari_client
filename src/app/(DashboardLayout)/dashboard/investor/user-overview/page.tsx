// app/dashboard/page.tsx
import { authOptions } from '@/helpers/authOption';
import { getServerSession } from 'next-auth';
import { UserDashboardData } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  FolderOpen, 
  Share2, 
  CheckCircle, 
  Clock, 
  XCircle,
  ArrowUpRight,
  Calendar,
  DollarSign
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const UserOverview = async () => {
  const user = await getServerSession(authOptions);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/investor/dashboard-overview?userId=${2}`,
    {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
  const dashboardData: { success: boolean; message: string; data: UserDashboardData } = await res.json();
  
  if (!dashboardData.success) {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="text-destructive">ড্যাশবোর্ড লোড করতে সমস্যা হয়েছে</div>
      </div>
    );
  }

  const { stats, myRecentProject } = dashboardData.data;

  // Format number in Bengali
  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get status configuration
  const getStatusConfig = (status: string) => {
    const configs = {
      'PENDING': { label: 'বিচারাধীন', variant: 'secondary' as const, icon: Clock, color: 'text-amber-600' },
      'APPROVED': { label: 'অনুমোদিত', variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      'REJECTED': { label: 'প্রত্যাখ্যাত', variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
    };
    return configs[status as keyof typeof configs] || configs.PENDING;
  };

  // Get verification status config
  const getVerificationConfig = (status: string) => {
    const configs = {
      'PENDING': { label: 'যাচাইয়াধীন', variant: 'secondary' as const, icon: Clock },
      'APPROVED': { label: 'যাচাইকৃত', variant: 'default' as const, icon: CheckCircle },
      'REJECTED': { label: 'যাচাই ব্যর্থ', variant: 'destructive' as const, icon: XCircle },
    };
    return configs[status as keyof typeof configs] || configs.PENDING;
  };

  const verificationConfig = getVerificationConfig(stats.isVerified?.status);

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          ড্যাশবোর্ড ওভারভিউ
        </h1>
        <p className="text-muted-foreground">
          আপনার বিনিয়োগের সারাংশ এবং সাম্প্রতিক কার্যক্রম
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Projects */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              মোট প্রকল্প
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatNumber(stats.myProject)}
            </div>
            <p className="text-xs text-muted-foreground">
              আপনার মোট বিনিয়োগকৃত প্রকল্প
            </p>
          </CardContent>
        </Card>

        {/* Total Investment */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              মোট বিনিয়োগ
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ৳{formatCurrency(stats.totalInvestment._sum.amount || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              মোট বিনিয়োগকৃত অর্থ
            </p>
          </CardContent>
        </Card>

        {/* Total Shares */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              মোট শেয়ার
            </CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatNumber(stats.totalShareBought._sum.shareBought || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              আপনার মোট শেয়ার সংখ্যা
            </p>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              অ্যাকাউন্ট স্ট্যাটাস
            </CardTitle>
            <verificationConfig.icon className={`h-4 w-4 ${verificationConfig.icon}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={verificationConfig.variant} className="text-xs">
                {verificationConfig.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              আপনার অ্যাকাউন্ট যাচাই অবস্থা
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects Section */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-primary">সাম্প্রতিক বিনিয়োগ</CardTitle>
              <CardDescription>
                আপনার সাম্প্রতিক বিনিয়োগকৃত প্রকল্পসমূহ
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/investor/my-investment">
                সকল দেখুন
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {myRecentProject.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">কোনো বিনিয়োগ নেই</p>
                <p className="text-sm mb-4">আপনার প্রথম বিনিয়োগ করুন</p>
                <Button asChild>
                  <Link href="/projects">
                    প্রকল্প ব্রাউজ করুন
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myRecentProject.map((project) => {
                  const statusConfig = getStatusConfig(project.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <div
                      key={project.id}
                      className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      {/* Project Image */}
                      <div className="flex-shrink-0">
                        <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                          <Image
                            src={project.project.image[0]}
                            alt={project.project.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <h3 className="font-semibold text-foreground line-clamp-2">
                            {project.project.name}
                          </h3>
                          <Badge variant={statusConfig.variant} className="w-fit">
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">বিনিয়োগ:</span>
                            <span className="font-medium text-foreground">
                              ৳{formatCurrency(project.amount)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Share2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">পদ্ধতি:</span>
                            <span className="font-medium text-foreground">
                              {project.method}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">স্ট্যাটাস:</span>
                            <span className="font-medium text-foreground">
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">দ্রুত কাজ</CardTitle>
            <CardDescription>
              দ্রুত অ্যাক্সেসের জন্য গুরুত্বপূর্ণ লিঙ্ক
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/projects" className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  প্রকল্প ব্রাউজ করুন
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/investor/my-investment" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  আমার বিনিয়োগ
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/investor/my-profile" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  প্রোফাইল আপডেট
                </Link>
              </Button>
              
              {stats.isVerified?.status === 'PENDING' && (
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/investor/kyc-verification" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    অ্যাকাউন্ট যাচাই করুন
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Investment Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">বিনিয়োগ টিপস</CardTitle>
            <CardDescription>
              সফল বিনিয়োগের জন্য উপদেশ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground">
                  বিভিন্ন প্রকল্পে বিনিয়োগ করে ঝুঁকি কমিয়ে আনুন
                </p>
              </div>
              
              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground">
                  প্রকল্পের বিস্তারিত পড়ে বুঝে বিনিয়োগ করুন
                </p>
              </div>
              
              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground">
                  নিয়মিত আপনার বিনিয়োগের অবস্থা পর্যবেক্ষণ করুন
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ৳{formatCurrency(stats.totalInvestment._sum.amount || 0)}
              </div>
              <p className="text-sm text-muted-foreground">মোট বিনিয়োগ</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(stats.totalShareBought._sum.shareBought || 0)}
              </div>
              <p className="text-sm text-muted-foreground">মোট শেয়ার</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(stats.myProject)}
              </div>
              <p className="text-sm text-muted-foreground">সক্রিয় প্রকল্প</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserOverview;