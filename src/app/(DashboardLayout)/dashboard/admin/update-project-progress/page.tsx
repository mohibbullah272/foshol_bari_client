// app/projects/progress-update/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { IProject } from '@/types';
import { projectApi } from '@/lib/api/project-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, RefreshCw, Filter } from 'lucide-react';
import { ProjectProgressCard } from '@/components/project/Project-progress-card';
import { ProgressUpdateModal } from '@/components/project/Progress-update-modal';

const UpdateProjectProgress = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'hasProgress' | 'noProgress'>('all');
  const [updatingProject, setUpdatingProject] = useState<IProject | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const result = await projectApi.getAllProjects();
      
      if (result.success) {
        setProjects(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError('প্রকল্প লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);

  // Filter projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = 
        filter === 'all' ||
        (filter === 'hasProgress' && 
         (project.progressUpdate.length > 0 || project.progressUpdateImage.length > 0)) ||
        (filter === 'noProgress' && 
         project.progressUpdate.length === 0 && project.progressUpdateImage.length === 0);
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime());

  const handleUpdateProgress = (project: IProject) => {
    setUpdatingProject(project);
  };

  const handleProgressUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
    setUpdatingProject(null);
  };

  // Stats
  const stats = {
    total: projects.length,
    withProgress: projects.filter(p => 
      p.progressUpdate.length > 0 || p.progressUpdateImage.length > 0
    ).length,
    withoutProgress: projects.filter(p => 
      p.progressUpdate.length === 0 && p.progressUpdateImage.length === 0
    ).length,
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>প্রকল্প লোড হচ্ছে...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">প্রকল্প অগ্রগতি হালনাগাদ</h1>
        <p className="text-muted-foreground">
          প্রকল্পের অগ্রগতি সম্পর্কিত ছবি এবং তথ্য হালনাগাদ করুন
        </p>
      </div>

      {/* Stats and Filters */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <p className="text-sm text-muted-foreground">মোট প্রকল্প</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.withProgress}</div>
            <p className="text-sm text-muted-foreground">হালনাগাদকৃত</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">{stats.withoutProgress}</div>
            <p className="text-sm text-muted-foreground">হালনাগাদ বাকি</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">
              {projects.reduce((total, project) => total + project.progressUpdate.length, 0)}
            </div>
            <p className="text-sm text-muted-foreground">মোট হালনাগাদ</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-primary">সকল প্রকল্প</CardTitle>
              <CardDescription>
                {filteredProjects.length}টি প্রকল্প দেখানো হচ্ছে
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Filter Buttons */}
              <div className="flex gap-1 bg-muted p-1 rounded-lg">
                <Button
                  variant={filter === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('all')}
                  className="text-xs"
                >
                  সকল
                </Button>
                <Button
                  variant={filter === 'hasProgress' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('hasProgress')}
                  className="text-xs"
                >
                  হালনাগাদকৃত
                </Button>
                <Button
                  variant={filter === 'noProgress' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('noProgress')}
                  className="text-xs"
                >
                  হালনাগাদ বাকি
                </Button>
              </div>

              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="প্রকল্প খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setRefreshTrigger(prev => prev + 1)}
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive text-center">
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground py-12">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">কোনো প্রকল্প পাওয়া যায়নি</p>
              <p className="text-sm">
                {searchTerm || filter !== 'all' 
                  ? 'অনুসন্ধান বা ফিল্টার পরিবর্তন করুন' 
                  : 'কোনো প্রকল্প নেই'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectProgressCard
              key={project.id}
              project={project}
              onUpdateProgress={handleUpdateProgress}
            />
          ))}
        </div>
      )}

      {/* Progress Update Modal */}
      <ProgressUpdateModal
        project={updatingProject}
        open={!!updatingProject}
        onClose={() => setUpdatingProject(null)}
        onProgressUpdated={handleProgressUpdated}
      />
    </div>
  );
};

export default UpdateProjectProgress;