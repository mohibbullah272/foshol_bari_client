// components/projects/edit-project-modal.tsx
import { useState } from 'react';
import { IProject } from '@/types';
import { projectApi } from '@/lib/api/project-api';
import { useCloudinaryUpload } from '@/hooks/use-cloudinary-upload';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface EditProjectModalProps {
  project: IProject | null;
  open: boolean;
  onClose: () => void;
  onProjectUpdated: () => void;
}

export const EditProjectModal = ({ project, open, onClose, onProjectUpdated }: EditProjectModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { images, uploading, error: uploadError, handleFileChange, removeImage } = useCloudinaryUpload();

  // Initialize form data
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    totalShare: project?.totalShare || '',
    sharePrice: project?.sharePrice || '',
    profitPerShare: project?.profitPerShare || '',
    expireDate: project?.expireDate ? new Date(project.expireDate).toISOString().slice(0, 16) : '',
    Duration: project?.Duration ? new Date(project.Duration).toISOString().slice(0, 16) : '',
    location: project?.location || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    setLoading(true);
    setError(null);

    try {
      const updateData = {
        ...formData,
        image: images.length > 0 ? images : project.image, // Use new images if uploaded, otherwise keep existing
        expireDate: new Date(formData.expireDate).toISOString(),
        Duration: new Date(formData.Duration).toISOString(),
      };

      const result = await projectApi.updateProject(project.id, updateData);

      if (result.success) {
        onProjectUpdated();
        onClose();
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || 'আপডেট করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">প্রকল্প সংশোধন করুন</DialogTitle>
          <DialogDescription>
            {project.name} - প্রকল্পের তথ্য আপডেট করুন
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label>প্রকল্পের ছবি</Label>
            
            {/* Current Images */}
            {project.image.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">বর্তমান ছবি:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.image.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                      <Image
                        src={img}
                        alt={`Current image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Image Upload */}
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="edit-project-images"
              />
              <label
                htmlFor="edit-project-images"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">নতুন ছবি আপলোড করুন</span>
                  <br />
                  সর্বোচ্চ ৪টি ছবি (PNG, JPG, JPEG)
                </div>
              </label>
            </div>

            {/* New Images Preview */}
            {images.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">নতুন ছবি:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square relative rounded-lg overflow-hidden border">
                        <Image
                          src={imageUrl}
                          alt={`New image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploading && (
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>ছবি আপলোড হচ্ছে...</span>
              </div>
            )}

            {(uploadError || error) && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                {uploadError || error}
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">প্রকল্পের নাম *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="প্রকল্পের নাম"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">অবস্থান *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="প্রকল্পের অবস্থান"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalShare">মোট শেয়ার সংখ্যা *</Label>
              <Input
                id="totalShare"
                value={formData.totalShare}
                onChange={(e) => handleInputChange('totalShare', e.target.value)}
                placeholder="মোট শেয়ার সংখ্যা"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sharePrice">শেয়ার মূল্য (৳) *</Label>
              <Input
                id="sharePrice"
                value={formData.sharePrice}
                onChange={(e) => handleInputChange('sharePrice', e.target.value)}
                placeholder="প্রতি শেয়ারের মূল্য"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profitPerShare">প্রতি শেয়ার লাভ (৳) *</Label>
              <Input
                id="profitPerShare"
                value={formData.profitPerShare}
                onChange={(e) => handleInputChange('profitPerShare', e.target.value)}
                placeholder="প্রতি শেয়ারে আনুমানিক লাভ"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expireDate">মেয়াদ উত্তীর্ণের তারিখ *</Label>
              <Input
                id="expireDate"
                type="datetime-local"
                value={formData.expireDate}
                onChange={(e) => handleInputChange('expireDate', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Duration">প্রকল্পের সময়সীমা *</Label>
              <Input
                id="Duration"
                type="datetime-local"
                value={formData.Duration}
                onChange={(e) => handleInputChange('Duration', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">প্রকল্পের বর্ণনা *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="প্রকল্পের বিস্তারিত বর্ণনা"
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading || uploading}
              className="min-w-[120px]"
            >
              {(loading || uploading) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loading ? 'সেভ হচ্ছে...' : 'আপডেট করুন'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              বাতিল করুন
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};