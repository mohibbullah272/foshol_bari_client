// components/projects/project-progress-card.tsx
import { IProject } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Edit3, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ProjectProgressCardProps {
  project: IProject;
  onUpdateProgress: (project: IProject) => void;
}

export const ProjectProgressCard = ({ project, onUpdateProgress }: ProjectProgressCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const hasProgress = project.progressUpdate.length > 0 || project.progressUpdateImage.length > 0;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Project Header */}
        <div className="relative h-40 w-full">
          <Image
            src={project.image[0]}
            alt={project.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/20 rounded-t-lg" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
              {project.name}
            </h3>
            <div className="flex items-center gap-1 text-sm opacity-90">
              <MapPin className="h-3 w-3" />
              <span>{project.location}</span>
            </div>
          </div>
          <Button
            onClick={() => onUpdateProgress(project)}
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background text-foreground"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            হালনাগাদ
          </Button>
        </div>

        {/* Project Info */}
        <div className="p-4 space-y-3">
          {/* Progress Status */}
          <div className="flex items-center justify-between">
            <Badge variant={hasProgress ? "default" : "secondary"}>
              {hasProgress ? `${project.progressUpdate.length}টি হালনাগাদ` : 'হালনাগাদ নেই'}
            </Badge>
            <Badge variant="outline">
              {project.progressUpdateImage.length}টি ছবি
            </Badge>
          </div>

          {/* Recent Progress Updates */}
          {hasProgress ? (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground">সাম্প্রতিক হালনাগাদ:</h4>
              <div className="space-y-1">
                {project.progressUpdate.slice(0, 2).map((update, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground line-clamp-2">{update}</p>
                  </div>
                ))}
                {project.progressUpdate.length > 2 && (
                  <p className="text-xs text-muted-foreground">
                    + আরও {project.progressUpdate.length - 2}টি হালনাগাদ
                  </p>
                )}
              </div>

              {/* Progress Images Preview */}
              {project.progressUpdateImage.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {project.progressUpdateImage.slice(0, 3).map((image, index) => (
                    <div key={index} className="relative h-16 w-16 flex-shrink-0 rounded border overflow-hidden">
                      <Image
                        src={image}
                        alt={`অগ্রগতি ছবি ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ))}
                  {project.progressUpdateImage.length > 3 && (
                    <div className="h-16 w-16 flex items-center justify-center bg-muted rounded border text-xs text-muted-foreground">
                      +{project.progressUpdateImage.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">কোনো অগ্রগতি হালনাগাদ নেই</p>
              <p className="text-xs">প্রথম হালনাগাদ যোগ করুন</p>
            </div>
          )}

          {/* Project Dates */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>মেয়াদ: {formatDate(project.expireDate)}</span>
            </div>
            <span>সমাপ্তি: {formatDate(project.Duration)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};