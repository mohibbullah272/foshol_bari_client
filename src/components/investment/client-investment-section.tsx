// components/investments/client-investment-section.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Share2, Filter, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Investment } from '@/types/investemnt';
import { InvestmentCard } from './user-investment-card';
import { InvestmentDetailsModal } from './user-investement-details';

interface ClientInvestmentSectionProps {
  investments: Investment[];
}

export const ClientInvestmentSection = ({ investments }: ClientInvestmentSectionProps) => {
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'PENDING' | 'APPROVED' | 'REJECTED'>('all');

  const handleViewDetails = (investmentId: number) => {
    setSelectedInvestmentId(investmentId);
  };

  const filteredInvestments = investments.filter(
    investment => filter === 'all' || investment.status === filter
  );

  // Calculate statistics
  const stats = {
    total: investments.length,
    pending: investments.filter(i => i.status === 'PENDING').length,
    approved: investments.filter(i => i.status === 'APPROVED').length,
    rejected: investments.filter(i => i.status === 'REJECTED').length,
    totalInvestment: investments.reduce((sum, i) => sum + i.totalAmount, 0),
    totalShares: investments.reduce((sum, i) => sum + i.shareBought, 0),
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                <p className="text-sm text-muted-foreground">মোট বিনিয়োগ</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ৳{formatCurrency(stats.totalInvestment)}
                </div>
                <p className="text-sm text-muted-foreground">মোট বিনিয়োগকৃত</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalShares}</div>
                <p className="text-sm text-muted-foreground">মোট শেয়ার</p>
              </div>
              <Share2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.approved}</div>
                <p className="text-sm text-muted-foreground">অনুমোদিত</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  {stats.pending} বিচারাধীন
                </div>
                <div className="text-xs text-muted-foreground">
                  {stats.rejected} প্রত্যাখ্যাত
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-primary">আপনার সকল বিনিয়োগ</CardTitle>
              <CardDescription>
                {filteredInvestments.length}টি বিনিয়োগ দেখানো হচ্ছে
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Filter Buttons */}
              <div className="flex gap-1 bg-muted p-1 rounded-lg">
                <Button
                  variant={filter === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('all')}
                  className="text-xs"
                >
                  সকল
                </Button>
                <Button
                  variant={filter === 'PENDING' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('PENDING')}
                  className="text-xs"
                >
                  বিচারাধীন
                </Button>
                <Button
                  variant={filter === 'APPROVED' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('APPROVED')}
                  className="text-xs"
                >
                  অনুমোদিত
                </Button>
                <Button
                  variant={filter === 'REJECTED' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('REJECTED')}
                  className="text-xs"
                >
                  প্রত্যাখ্যাত
                </Button>
              </div>

              <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/investor/user-overview">
                  <RefreshCw className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Investments Grid */}
      {filteredInvestments.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground py-12">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">কোনো বিনিয়োগ পাওয়া যায়নি</p>
              <p className="text-sm mb-4">
                {filter !== 'all' 
                  ? 'বর্তমান ফিল্টারে কোনো বিনিয়োগ নেই' 
                  : 'আপনার কোনো বিনিয়োগ নেই'
                }
              </p>
              <Button asChild>
                <Link href="/projects">
                  প্রকল্প ব্রাউজ করুন
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {filteredInvestments.map((investment) => (
            <InvestmentCard
              key={investment.id}
              investment={investment}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Investment Details Modal */}
      <InvestmentDetailsModal
        investmentId={selectedInvestmentId}
        open={!!selectedInvestmentId}
        onClose={() => setSelectedInvestmentId(null)}
      />
    </>
  );
};