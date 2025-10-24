// components/projects/progress-timeline.tsx
import { ProjectProgress } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Image as ImageIcon, CheckCircle2, Clock, ArrowRight, Clock4 } from 'lucide-react';
import Image from 'next/image';

interface ProgressTimelineProps {
  projects: ProjectProgress[];
}

export const ProgressTimeline = ({ projects }: ProgressTimelineProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'তারিখ নেই';
    
    try {
      return new Date(dateString).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short'
      });
    } catch {
      return 'তারিখ নেই';
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'তারিখ নেই';
    
    try {
      return new Date(dateString).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'তারিখ নেই';
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      'PENDING': { label: 'বিচারাধীন', variant: 'secondary' as const, icon: Clock },
      'APPROVED': { label: 'অনুমোদিত', variant: 'default' as const, icon: CheckCircle2 },
      'REJECTED': { label: 'প্রত্যাখ্যাত', variant: 'destructive' as const, icon: Clock },
    };
    return configs[status as keyof typeof configs] || configs.PENDING;
  };

  const getLatestUpdateDate = (project: ProjectProgress['project']) => {
    if (!project?.progressUpdateDate?.length) return null;
    
    try {
      const dates = project.progressUpdateDate
        .filter(date => date)
        .map(date => new Date(date));
      
      if (dates.length === 0) return null;
      
      return new Date(Math.max(...dates.map(d => d.getTime())));
    } catch {
      return null;
    }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Calendar className="h-8 w-8" />
        </div>
        <p className="text-lg font-medium">কোনো প্রকল্পের অগ্রগতি নেই</p>
        <p className="text-sm">আপনার বিনিয়োগকৃত প্রকল্পগুলোর অগ্রগতি এখানে দেখানো হবে</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {projects.map((project, projectIndex) => {
        const statusConfig = getStatusConfig(project.status);
        const StatusIcon = statusConfig.icon;
        const latestUpdateDate = getLatestUpdateDate(project.project);
        
        return (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              {/* Project Header */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-foreground">
                        {project.project.name}
                      </h2>
                      <Badge variant={statusConfig.variant} className="flex items-center gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>বিনিয়োগ: ৳{formatCurrency(project.amount)}</span>
                      <span>পেমেন্ট: {project.method}</span>
                      <span>প্রকল্প আইডি: #{project.projectId}</span>
                    </div>
                    
                    {/* Latest Update Info */}
                    {latestUpdateDate && (
                      <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                        <Clock4 className="h-3 w-3" />
                        <span>সর্বশেষ হালনাগাদ: {formatDateTime(latestUpdateDate.toString())}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="p-6">
                {project.project.progressUpdate?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">অগ্রগতি হালনাগাদ নেই</p>
                    <p className="text-sm">এই প্রকল্পের অগ্রগতি শীঘ্রই আপডেট করা হবে</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <ArrowRight className="h-5 w-5 text-primary" />
                      প্রকল্প অগ্রগতি টাইমলাইন
                    </h3>
                    
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20"></div>
                      
                      <div className="space-y-8">
                        {project.project.progressUpdate?.map((update, index) => {
                          const updateDate = project.project.progressUpdateDate?.[index];
                          
                          return (
                            <div key={index} className="relative flex gap-4">
                              {/* Timeline dot */}
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 space-y-3 pb-8">
                                <div className="space-y-3">
                                  {/* Update Date */}
                                  {updateDate && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full w-fit">
                                      <Calendar className="h-3 w-3" />
                                      <span>{formatDate(updateDate)}</span>
                                    </div>
                                  )}
                                  
                                  {/* Update Text */}
                                  <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-foreground font-medium leading-relaxed">
                                      {update}
                                    </p>
                                  </div>
                                  
                                  {/* Progress Images */}
                                  {project.project.progressUpdateImage?.[index] && (
                                    <div className="flex gap-2 mt-3 ml-4">
                                      <div className="relative h-20 w-20 rounded-lg overflow-hidden border">
                                        <Image
                                          src={project.project.progressUpdateImage[index]}
                                          alt={`অগ্রগতি ছবি ${index + 1}`}
                                          fill
                                          className="object-cover"
                                          sizes="80px"
                                        />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                          <ImageIcon className="h-4 w-4 text-white" />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Timeline connector (except last item) */}
                                {index < (project.project.progressUpdate?.length || 0) - 1 && (
                                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-primary/20"></div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {project.project.progressUpdate?.length || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">মোট হালনাগাদ</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {project.project.progressUpdateImage?.length || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">অগ্রগতি ছবি</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {project.project.progressUpdateDate?.length || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">তারিখযুক্ত হালনাগাদ</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          ৳{formatCurrency(project.amount)}
                        </div>
                        <div className="text-xs text-muted-foreground">আপনার বিনিয়োগ</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};