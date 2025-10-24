// components/project/ProjectFilters.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X } from 'lucide-react';

interface ProjectFiltersProps {
  onFiltersChange: (filters: any) => void;
  onSortChange: (sortBy: string, sortOrder: string) => void;
}

const CATEGORIES = {
  ALL: 'সকল প্রকার',
  CROPS: 'শস্য',
  LIVESTOCK: 'পশুপালন',
  HORTICULTURE: 'উদ্যানপালন',
  FISHERIES: 'মৎস্য চাষ',
  AGRI_TECH: 'কৃষি প্রযুক্তি',
  SUSTAINABLE_FARMING: 'টেকসই কৃষি',
  RENEWABLE_ENERGY: 'নবায়নযোগ্য শক্তি',
  // Add more Bangla translations as needed
};

const DURATION_OPTIONS = {
  ALL: 'সকল সময়কাল',
  SHORT_TERM: 'স্বল্পমেয়াদী (৩ মাস以内)',
  MEDIUM_TERM: 'মধ্যমেয়াদী (৩-১২ মাস)',
  LONG_TERM: 'দীর্ঘমেয়াদী (১ বছর+)'
};

const SORT_OPTIONS = {
  'createdAt-desc': 'নতুন প্রথম',
  'createdAt-asc': 'পুরানো প্রথম',
  'sharePrice-asc': 'শেয়ার মূল্য: কম থেকে বেশি',
  'sharePrice-desc': 'শেয়ার মূল্য: বেশি থেকে কম',
  'expireDate-asc': 'শীঘ্রই শেষ হচ্ছে',
  'estimatedROI-desc': 'উচ্চ ROI প্রথম'
};

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  onFiltersChange,
  onSortChange
}) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'ALL',
    minSharePrice: 0,
    maxSharePrice: 10000,
    durationFilter: 'ALL' as any,
    location: ''
  });

  const [sortBy, setSortBy] = useState('createdAt-desc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFiltersChange(filters);
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [filters, onFiltersChange]);

  useEffect(() => {
    const [sortField, order] = sortBy.split('-');
    onSortChange(sortField, order);
  }, [sortBy, onSortChange]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      category: 'ALL',
      minSharePrice: 0,
      maxSharePrice: 10000,
      durationFilter: 'ALL',
      location: ''
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="প্রকল্প খুঁজুন... (নাম, বর্ণনা, অবস্থান)"
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="pl-10 pr-4 py-2 border-2 "
          />
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-64 border-2">
            <SelectValue placeholder="সাজান" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SORT_OPTIONS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="border-2  hover:bg-green-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          ফিল্টার
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="p-6 border-2  rounded-lg bg-white/5 backdrop-blur-lg space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold ">ফিল্টার অপশন</h3>
      
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium ">প্রকল্পের ধরন</label>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORIES).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium ">সময়কাল</label>
              <Select
                value={filters.durationFilter}
                onValueChange={(value) => handleFilterChange('durationFilter', value)}
              >
                <SelectTrigger >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DURATION_OPTIONS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium ">অবস্থান</label>
              <Input
                placeholder="জেলা বা অঞ্চল"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
        
              />
            </div>

            {/* Share Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium ">
                শেয়ার মূল্য: {filters.minSharePrice} - {filters.maxSharePrice} ৳
              </label>
              <Slider
                value={[filters.minSharePrice, filters.maxSharePrice]}
                onValueChange={(value:any) => {
                  handleFilterChange('minSharePrice', value[0]);
                  handleFilterChange('maxSharePrice', value[1]);
                }}
                max={10000}
                step={100}
               
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};