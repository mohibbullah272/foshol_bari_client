// components/payments/payment-method-card.tsx
"use client"
import { PaymentMethod, PaymentMethods } from '@/types/payment';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, CreditCard, Building, ArrowRight } from 'lucide-react';

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentMethodCard = ({ paymentMethod, onSelect }: PaymentMethodCardProps) => {
  // Safe method configuration
  const getMethodConfig = (method: PaymentMethods) => {
    const configs = {
      [PaymentMethods.BKASH]: { 
        label: 'বিকাশ', 
        icon: Smartphone, 
        color: 'bg-red-500',
        description: 'মোবাইল ফাইন্যান্স'
      },
      [PaymentMethods.NAGAD]: { 
        label: 'নগদ', 
        icon: Smartphone, 
        color: 'bg-purple-500',
        description: 'মোবাইল ফাইন্যান্স'
      },
      [PaymentMethods.ROCKET]: { 
        label: 'রকেট', 
        icon: Smartphone, 
        color: 'bg-blue-500',
        description: 'মোবাইল ফাইন্যান্স'
      },
      [PaymentMethods.UPAY]: { 
        label: 'উপায়', 
        icon: Smartphone, 
        color: 'bg-green-500',
        description: 'মোবাইল ফাইন্যান্স'
      },
      [PaymentMethods.BANK]: { 
        label: 'ব্যাংক', 
        icon: Building, 
        color: 'bg-gray-500',
        description: 'ব্যাংক ট্রান্সফার'
      },
      [PaymentMethods.UCB]: { 
        label: 'ইউসিবি', 
        icon: CreditCard, 
        color: 'bg-orange-500',
        description: 'ব্যাংকিং সার্ভিস'
      },
    };
    return configs[method] || { 
      label: 'অজানা', 
      icon: CreditCard, 
      color: 'bg-gray-500',
      description: 'পেমেন্ট মেথড'
    };
  };

  // Return null if paymentMethod is undefined/null
  if (!paymentMethod) {
    return null;
  }

  const config = getMethodConfig(paymentMethod.methodName);
  const IconComponent = config.icon;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary">
      <CardContent className="p-0">
        <div className={`${config.color} text-white p-4 rounded-t-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconComponent className="h-6 w-6" />
              <div>
                <h3 className="font-semibold text-lg">{config.label}</h3>
                <p className="text-white/80 text-sm">{config.description}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {paymentMethod.number || 'N/A'}
            </Badge>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">অ্যাকাউন্ট নাম:</span>
              <span className="font-medium text-foreground">
                {paymentMethod.accountName || 'N/A'}
              </span>
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={() => onSelect(paymentMethod)}
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
            >
              নির্বাচন করুন
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodCard;