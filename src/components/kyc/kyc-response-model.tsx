// components/kyc/kyc-response-modal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { KYC } from '@/types/kyc';
import { CheckCircle, XCircle } from 'lucide-react';

interface KYCResponseModalProps {
  kyc: KYC | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const KYCResponseModal = ({ kyc, open, onOpenChange, onSuccess }: KYCResponseModalProps) => {
  const [action, setAction] = useState<'APPROVE' | 'REJECT'>('APPROVE');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!kyc) return null;

  const handleSubmit = async () => {
    if (action === 'REJECT' && !reason.trim()) {
      alert('বাতিল করার কারণ লিখুন');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id: kyc.id,
        kycStatus: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
        userId: kyc.userId,
        UserStatus: action === 'APPROVE' ? 'APPROVED' : 'BLOCKED'
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kyc/update-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('সিদ্ধান্ত জমা দিতে সমস্যা');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('সিদ্ধান্ত জমা দিতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>KYC সিদ্ধান্ত</DialogTitle>
          <DialogDescription>
            ব্যবহারকারীর KYC অনুরোধের সিদ্ধান্ত দিন
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="pt-6">
            <RadioGroup value={action} onValueChange={(value: 'APPROVE' | 'REJECT') => setAction(value)} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="APPROVE" id="approve" />
                <Label htmlFor="approve" className="flex items-center gap-2 cursor-pointer">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  KYC অনুমোদন করুন
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="REJECT" id="reject" />
                <Label htmlFor="reject" className="flex items-center gap-2 cursor-pointer">
                  <XCircle className="h-4 w-4 text-red-500" />
                  KYC বাতিল করুন
                </Label>
              </div>
            </RadioGroup>

            {action === 'REJECT' && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="reason">বাতিল করার কারণ</Label>
                <Textarea
                  id="reason"
                  placeholder="বাতিল করার কারণ লিখুন..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            বাতিল
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'সাবমিট হচ্ছে...' : 'সিদ্ধান্ত জমা দিন'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KYCResponseModal;