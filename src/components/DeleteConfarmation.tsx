// components/projects/delete-confirmation-dialog.tsx
import { useState } from 'react';
import { IProject } from '@/types';
import { projectApi } from '@/lib/api/project-api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle } from 'lucide-react';

interface DeleteConfirmationDialogProps {
  project: IProject | null;
  open: boolean;
  onClose: () => void;
  onProjectDeleted: () => void;
}

export const DeleteConfirmationDialog = ({
  project,
  open,
  onClose,
  onProjectDeleted,
}: DeleteConfirmationDialogProps) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!project) return;

    setDeleting(true);
    try {
      const result = await projectApi.deleteProject(project.id);
      
      if (result.success) {
        onProjectDeleted();
        onClose();
      }
    } catch (err: any) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            প্রকল্প মুছুন
          </DialogTitle>
          <DialogDescription>
            আপনি কি নিশ্চিত যে আপনি "{project.name}" প্রকল্পটি মুছতে চান?
            <br />
            <span className="font-medium text-foreground">এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।</span>
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={deleting}
          >
            বাতিল করুন
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            মুছুন
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};