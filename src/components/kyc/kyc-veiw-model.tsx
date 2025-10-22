// components/kyc/kyc-view-modal.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KYC } from '@/types/kyc';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, User, FileText } from 'lucide-react';

interface KYCViewModalProps {
  kyc: KYC | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResponse: () => void;
}

const KYCViewModal = ({ kyc, open, onOpenChange, onResponse }: KYCViewModalProps) => {
  if (!kyc) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'REJECTED':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon(kyc.status)}
            KYC বিস্তারিত তথ্য
          </DialogTitle>
          <DialogDescription>
            ব্যবহারকারীর KYC তথ্য ও ডকুমেন্টস
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* User Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                ব্যবহারকারীর তথ্য
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">নাম:</span>
                  <span>{kyc.user.name || 'নাম নেই'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">ইমেইল:</span>
                  <span>{kyc.user.email}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">ফোন:</span>
                  <span>{kyc.user.phone}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">স্ট্যাটাস:</span>
                  <Badge variant="outline">{kyc.user.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KYC Status */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">KYC স্ট্যাটাস</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">KYC আইডি:</span>
                  <span>#{kyc.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">স্ট্যাটাস:</span>
                  <Badge>
                    {kyc.status === 'PENDING' && 'বিচারাধীন'}
                    {kyc.status === 'APPROVED' && 'অনুমোদিত'}
                    {kyc.status === 'REJECTED' && 'বাতিল'}
                  </Badge>
                </div>
            
              </div>
            </CardContent>
          </Card>

          {/* Document Information */}
          <Card className="">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">ডকুমেন্টস তথ্য</h3>
              <div className="grid grid-cols-1  gap-4">
                {kyc.nidNumber && (
                  <div className="space-y-2">
                    <h4 className="font-medium">NID তথ্য</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">NID নম্বর:</span>
                      <span>{kyc.nidNumber}</span>
                    </div>
                    {kyc.nidImage && (
                      <div>
                        <span className="text-muted-foreground">NID ছবি:</span>
                        <img 
                          src={kyc.nidImage} 
                          alt="NID" 
                          className="mt-2 rounded border max-w-full h-auto max-h-40 object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}

                {kyc.passportNumber && (
                  <div className="space-y-2">
                    <h4 className="font-medium">পাসপোর্ট তথ্য</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">পাসপোর্ট নম্বর:</span>
                      <span>{kyc.passportNumber}</span>
                    </div>
                    {kyc.passportImage && (
                      <div>
                        <span className="text-muted-foreground">পাসপোর্ট ছবি:</span>
                        <img 
                          src={kyc.passportImage} 
                          alt="Passport" 
                          className="mt-2 rounded border max-w-full h-auto max-h-40 object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}

                {kyc.birthCertificateNumber && (
                  <div className="space-y-2">
                    <h4 className="font-medium">জন্ম নিবন্ধন তথ্য</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">নিবন্ধন নম্বর:</span>
                      <span>{kyc.birthCertificateNumber}</span>
                    </div>
                    {kyc.birthCertificateImage && (
                      <div>
                        <span className="text-muted-foreground">নিবন্ধন ছবি:</span>
                        <img 
                          src={kyc.birthCertificateImage} 
                          alt="Birth Certificate" 
                          className="mt-2 rounded border max-w-full h-auto max-h-40 object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">ব্যবহারকারীর ছবি</h4>
                  {kyc.userImage && (
                    <img 
                      src={kyc.userImage} 
                      alt="User" 
                      className="rounded border max-w-full h-auto max-h-40 object-contain"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            বন্ধ করুন
          </Button>
          {kyc.status === 'PENDING' && (
            <Button onClick={onResponse}>
              সিদ্ধান্ত দিন
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KYCViewModal;