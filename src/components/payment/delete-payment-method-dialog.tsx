// components/payments/delete-payment-method-dialog.tsx
import { PaymentMethod } from '@/types';
import { paymentApi } from '@/lib/api/payment-api';
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
import { useState } from 'react';

interface DeletePaymentMethodDialogProps {
  paymentMethod: PaymentMethod | null;
  open: boolean;
  onClose: () => void;
  onPaymentMethodDeleted: () => void;
}

export const DeletePaymentMethodDialog = ({
  paymentMethod,
  open,
  onClose,
  onPaymentMethodDeleted,
}: DeletePaymentMethodDialogProps) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!paymentMethod) return;

    setDeleting(true);
    try {
      const result = await paymentApi.deletePaymentMethod(paymentMethod.id);
      
      if (result.success) {
        onPaymentMethodDeleted();
        onClose();
      }
    } catch (err: any) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  if (!paymentMethod) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            পেমেন্ট মেথড মুছুন
          </DialogTitle>
          <DialogDescription>
            আপনি কি নিশ্চিত যে আপনি "{paymentMethod.accountName}" ({paymentMethod.number}) 
            পেমেন্ট মেথডটি মুছতে চান?
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