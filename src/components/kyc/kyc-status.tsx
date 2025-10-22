// components/kyc/kyc-status.tsx
import { KYCData, KycStatus } from '@/types/kyc';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface KYCStatusProps {
  kycData: KYCData | null;
  loading?: boolean;
}

export const KYCStatus = ({ kycData, loading = false }: KYCStatusProps) => {
  const getStatusConfig = (status: KycStatus) => {
    const configs = {
      [KycStatus.NOTREQUSTED]: {
        label: 'অনুরোধ করা হয়নি',
        description: 'আপনি এখনও KYC ভেরিফিকেশন সম্পন্ন করেননি',
        variant: 'secondary' as const,
        icon: AlertCircle,
        color: 'text-gray-600'
      },
      [KycStatus.PENDING]: {
        label: 'বিচারাধীন',
        description: 'আপনার KYC আবেদনটি বর্তমানে রিভিউ চলছে',
        variant: 'secondary' as const,
        icon: Clock,
        color: 'text-amber-600'
      },
      [KycStatus.APPROVED]: {
        label: 'অনুমোদিত',
        description: 'আপনার KYC সফলভাবে যাচাই করা হয়েছে',
        variant: 'default' as const,
        icon: CheckCircle,
        color: 'text-green-600'
      },
      [KycStatus.REJECTED]: {
        label: 'প্রত্যাখ্যাত',
        description: 'আপনার KYC আবেদনটি গ্রহণ করা হয়নি',
        variant: 'destructive' as const,
        icon: XCircle,
        color: 'text-red-600'
      },
    };
    return configs[status];
  };

  const status = kycData?.status || KycStatus.NOTREQUSTED;
  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  if (loading) {
    return (
      <Card className="border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">KYC স্ট্যাটাস</h3>
              <p className="text-sm text-muted-foreground">লোড হচ্ছে...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full bg-primary/10 ${statusConfig.color}`}>
            <StatusIcon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-foreground">KYC স্ট্যাটাস</h3>
              <Badge variant={statusConfig.variant} className="flex items-center gap-1">
                <StatusIcon className="h-3 w-3" />
                {statusConfig.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {statusConfig.description}
            </p>
            
            {status === KycStatus.REJECTED && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                ⚠️ আপনার KYC আবেদনটি প্রত্যাখ্যান করা হয়েছে। দয়া করে আবার আবেদন করুন এবং সঠিক তথ্য প্রদান করুন।
              </div>
            )}
          </div>
        </div>

        {kycData && status !== KycStatus.NOTREQUSTED && (
          <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">আবেদনের তারিখ:</span>
              <p className="font-medium text-foreground">
                {new Date(kycData.createdAt || Date.now()).toLocaleDateString('bn-BD')}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">আবেদন আইডি:</span>
              <p className="font-medium text-foreground">KYC#{kycData.id}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};