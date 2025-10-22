// app/payments/add/page.tsx
"use client";

import { PaymentMethodForm } from '@/components/payment/payment-method-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, CreditCard, Building, Info } from 'lucide-react';
import { toast } from 'sonner';

const AddPaymentMethod = () => {
  const handleSuccess = () => {
toast.success('Payment method created successfully')
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">পেমেন্ট মেথড যোগ করুন</h1>
        <p className="text-muted-foreground">
          নতুন পেমেন্ট পদ্ধতি যোগ করুন এবং গ্রাহকদের জন্য পেমেন্ট অপশন বৃদ্ধি করুন
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <PaymentMethodForm onSuccess={handleSuccess} />
        </div>

        {/* Information Sidebar */}
        <div className="space-y-6">
          {/* Supported Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="h-4 w-4" />
                সমর্থিত পেমেন্ট মেথড
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Smartphone className="h-4 w-4 text-green-600" />
                <span>মোবাইল ফাইন্যান্স</span>
                <Badge variant="secondary" className="ml-auto">৪টি</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-blue-600" />
                <span>ব্যাংক ট্রান্সফার</span>
                <Badge variant="secondary" className="ml-auto">১টি</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4 text-purple-600" />
                <span>ব্যাংকিং সার্ভিস</span>
                <Badge variant="secondary" className="ml-auto">১টি</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">গাইডলাইন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="space-y-1">
                <p className="font-medium text-foreground">নম্বর ফরম্যাট:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>মোবাইল নম্বর: ০১৭XXXXXXXX</li>
                  <li>ব্যাংক অ্যাকাউন্ট: সম্পূর্ণ অ্যাকাউন্ট নম্বর</li>
                </ul>
              </div>
              
              <div className="space-y-1 pt-2">
                <p className="font-medium text-foreground">নির্দেশনা:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>পেমেন্টের স্টেপ বাই স্টেপ নির্দেশনা দিন</li>
                  <li>রেফারেন্স নম্বর সম্পর্কে জানান</li>
                  <li>কনফার্মেশন প্রক্রিয়া বর্ণনা করুন</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">টিপস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>সঠিক অ্যাকাউন্ট নম্বর এবং নাম নিশ্চিত করুন</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>পরিষ্কার এবং সহজবোধ্য নির্দেশনা প্রদান করুন</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>একটি মেথড শুধুমাত্র একবার যোগ করুন</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethod;