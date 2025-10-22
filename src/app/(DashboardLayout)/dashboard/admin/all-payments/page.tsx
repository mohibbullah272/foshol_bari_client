// app/payments/user-payments/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Investment } from '@/types';
import { investmentApi } from '@/lib/api/investment-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search, RefreshCw, Filter, Users, DollarSign, TrendingUp } from 'lucide-react';
import { InvestmentDetailsModal } from '@/components/investment/investment-details-mdel';
import { InvestmentCard } from '@/components/investment/investment-card';

const UserPayments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'PENDING' | 'APPROVED' | 'REJECTED'>('all');
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch investments
  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const result = await investmentApi.getAllInvestments(searchTerm);
      
      if (result.success) {
        setInvestments(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError('বিনিয়োগ লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, [refreshTrigger, searchTerm]);

  // Filter investments
  const filteredInvestments = investments
    .filter(investment => filter === 'all' || investment.status === filter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleViewDetails = (investment: Investment) => {
    setSelectedInvestment(investment);
  };

  // Statistics
  const stats = {
    total: investments.length,
    pending: investments.filter(i => i.status === 'PENDING').length,
    approved: investments.filter(i => i.status === 'APPROVED').length,
    rejected: investments.filter(i => i.status === 'REJECTED').length,

  };



  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>বিনিয়োগ লোড হচ্ছে...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">ইউজারদের পেমেন্ট দেখুন</h1>
        <p className="text-muted-foreground">
          সকল ইউজারদের বিনিয়োগ এবং পেমেন্টের তথ্য দেখুন
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
                <p className="text-sm text-muted-foreground">বিচারাধীন</p>
              </div>
              <Users className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                <p className="text-sm text-muted-foreground">অনুমোদিত</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-primary">সকল বিনিয়োগ</CardTitle>
              <CardDescription>
                {filteredInvestments.length}টি বিনিয়োগ দেখানো হচ্ছে
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
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

              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="প্রকল্প বা ফোন নম্বর দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setRefreshTrigger(prev => prev + 1)}
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive text-center">
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Investments Grid */}
      {filteredInvestments.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground py-12">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">কোনো বিনিয়োগ পাওয়া যায়নি</p>
              <p className="text-sm">
                {searchTerm || filter !== 'all' 
                  ? 'অনুসন্ধান বা ফিল্টার পরিবর্তন করুন' 
                  : 'কোনো বিনিয়োগ নেই'
                }
              </p>
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
        investment={selectedInvestment}
        open={!!selectedInvestment}
        onClose={() => setSelectedInvestment(null)}
      />
    </div>
  );
};

export default UserPayments;