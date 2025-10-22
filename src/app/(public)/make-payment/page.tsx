// src/app/(public)/make-payment/page.tsx
"use client"
import MakePaymentContent from '@/SubPage/make-payment-content';
import { Suspense } from 'react';


export default function MakePaymentPage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">পেমেন্ট পৃষ্ঠা লোড হচ্ছে...</p>
          </div>
        </div>
      }>
        <MakePaymentContent />
      </Suspense>
    </div>
  );
}