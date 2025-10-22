// app/projects/update/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { IProject } from '@/types';
import { projectApi } from '@/lib/api/project-api';



import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search, RefreshCw } from 'lucide-react';
import { ProjectUpdateCard } from '@/components/project/ProjectUpdateCard';
import { EditProjectModal } from '@/components/project/Edit-project-model';
import { DeleteConfirmationDialog } from '@/components/DeleteConfarmation';

const UpdateProject = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState<IProject | null>(null);
  const [deletingProject, setDeletingProject] = useState<IProject | null>(null);
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

  // Filter projects based on search
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle edit
  const handleEdit = (project: IProject) => {
    setEditingProject(project);
  };

  // Handle delete
  const handleDelete = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    setDeletingProject(project || null);
  };

  // Handle project updated
  const handleProjectUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
    setEditingProject(null);
  };

  // Handle project deleted
  const handleProjectDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
    setDeletingProject(null);
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
        <h1 className="text-3xl font-bold tracking-tight text-primary">প্রকল্প ব্যবস্থাপনা</h1>
        <p className="text-muted-foreground">
          সকল প্রকল্প দেখুন এবং সংশোধন করুন
        </p>
      </div>

      {/* Stats and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-primary">সকল প্রকল্প</CardTitle>
              <CardDescription>
                মোট {projects.length}টি প্রকল্প, {filteredProjects.length}টি দেখানো হচ্ছে
              </CardDescription>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
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
            <div className="text-center text-muted-foreground py-8">
              {searchTerm ? 'কোনো প্রকল্প পাওয়া যায়নি' : 'কোনো প্রকল্প নেই'}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectUpdateCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <EditProjectModal
        project={editingProject}
        open={!!editingProject}
        onClose={() => setEditingProject(null)}
        onProjectUpdated={handleProjectUpdated}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        project={deletingProject}
        open={!!deletingProject}
        onClose={() => setDeletingProject(null)}
        onProjectDeleted={handleProjectDeleted}
      />
    </div>
  );
};

export default UpdateProject;