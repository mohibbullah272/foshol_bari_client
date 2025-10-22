// components/investments/investment-card.tsx
import { Investment } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, User, Phone, Calendar, CreditCard } from 'lucide-react';

interface InvestmentCardProps {
  investment: Investment;
  onViewDetails: (investment: Investment) => void;
}

export const InvestmentCard = ({ investment, onViewDetails }: InvestmentCardProps) => {




  const getStatusConfig = (status: string) => {
    const configs = {
      'PENDING': { label: 'বিচারাধীন', variant: 'secondary' as const },
      'APPROVED': { label: 'অনুমোদিত', variant: 'default' as const },
      'REJECTED': { label: 'প্রত্যাখ্যাত', variant: 'destructive' as const },
    };
    return configs[status as keyof typeof configs] || configs.PENDING;
  };

  const statusConfig = getStatusConfig(investment.status);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Header with Status */}
        <div className="bg-muted/50 p-4 rounded-t-lg border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-lg">
                {investment.project.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                ট্রানজেকশন: {investment.user.phone}
              </p>
            </div>
            <Badge variant={statusConfig.variant}>
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        {/* Investment Details */}
        <div className="p-4 space-y-4">
          {/* User Information */}
          <div className="space-y-2">
            <h4 className="font-medium text-foreground text-sm flex items-center gap-2">
              <User className="h-4 w-4" />
              বিনিয়োগকারীর তথ্য
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">নাম:</span>
                <p className="font-medium text-foreground">{investment.user.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">ফোন:</span>
                <p className="font-medium text-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {investment.user.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Investment Information */}
          <div className="space-y-2">
            <h4 className="font-medium text-foreground text-sm flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              বিনিয়োগের তথ্য
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-center p-2 bg-muted rounded-lg">
                <div className="font-bold text-foreground text-lg">{investment.shareBought}</div>
                <div className="text-muted-foreground text-xs">শেয়ার সংখ্যা</div>
              </div>
              <div className="text-center p-2 bg-muted rounded-lg">
                <div className="font-bold text-foreground text-lg">
                  {investment?.totalAmount?.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-xs">মোট বিনিয়োগ</div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">পেমেন্ট মেথড:</span>
                <p className="font-medium text-foreground">{investment.method}</p>
              </div>
              <div>
                <span className="text-muted-foreground">পেমেন্ট নম্বর:</span>
                <p className="font-medium text-foreground">{investment.user.phone}</p>
              </div>
            </div>
          </div>

          {/* Date Information */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
            <Calendar className="h-3 w-3" />
            <span>{investment.createdAt}</span>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => onViewDetails(investment)}
            className="w-full"
            variant="outline"
          >
            <Eye className="h-4 w-4 mr-2" />
            বিস্তারিত দেখুন
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};