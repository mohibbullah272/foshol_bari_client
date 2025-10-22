// app/investments/page.tsx
import { authOptions } from '@/helpers/authOption';
import { getServerSession } from 'next-auth';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ClientInvestmentSection } from '@/components/investment/client-investment-section';
import { Investment } from '@/types/investemnt';

const MyInvestment = async () => {
  const user = await getServerSession(authOptions);

  if (!user?.user.id) {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="text-destructive">ইউজার তথ্য পাওয়া যায়নি</div>
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/investment/all-user?userId=${user.user.id}`,
    {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="text-destructive">বিনিয়োগ তথ্য লোড করতে সমস্যা হয়েছে</div>
      </div>
    );
  }

  const investmentsData: { success: boolean; message: string; data: Investment[] } = await res.json();
  
  if (!investmentsData.success) {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="text-destructive">{investmentsData.message}</div>
      </div>
    );
  }

  const investments = investmentsData.data;

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="flex-shrink-0">
            <Link href="/dashboard/investor/user-overview">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              আপনার বিনিয়োগ
            </h1>
            <p className="text-muted-foreground">
              আপনার সকল বিনিয়োগের বিস্তারিত তথ্য এবং অবস্থা
            </p>
          </div>
        </div>
      </div>

      {/* Client-side interactive section */}
      <ClientInvestmentSection investments={investments} />
    </div>
  );
};

export default MyInvestment;