// Updated ProjectComponent.tsx
"use client";

import ProjectCard from "@/components/project/ProjectCard";
import { ProjectFilters } from "@/components/project/projectFilters";

import { IProject, SortOption, SortOrder } from "@/types";
import { Loader } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const ProjectComponent = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Filter and sort states
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'ALL',
    minSharePrice: 0,
    maxSharePrice: 10000,
    durationFilter: 'ALL',
    location: ''
  });
  
  const [sortConfig, setSortConfig] = useState({
    sortBy: 'createdAt' as SortOption,
    sortOrder: 'desc' as SortOrder
  });

  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams();
    
    if (filters.searchTerm) params.append('searchTerm', filters.searchTerm);
    if (filters.category && filters.category !== 'ALL') params.append('category', filters.category);
    if (filters.minSharePrice > 0) params.append('minSharePrice', filters.minSharePrice.toString());
    if (filters.maxSharePrice < 10000) params.append('maxSharePrice', filters.maxSharePrice.toString());
    if (filters.durationFilter && filters.durationFilter !== 'ALL') params.append('durationFilter', filters.durationFilter);
    if (filters.location) params.append('location', filters.location);
    
    params.append('sortby', sortConfig.sortBy);
    params.append('sortOrder', sortConfig.sortOrder);
    params.append('limit', '12');
    
    return params.toString();
  }, [filters, sortConfig]);

  const handleFetch = useCallback(async (signal: AbortSignal) => {
    try {
      setLoading(true);
      setError("");
      const queryString = buildQueryString();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/project/all?${queryString}`,
        { signal }
      );
      
      if (!res.ok) throw new Error("প্রকল্পগুলো লোড করতে সমস্যা হয়েছে");
      const data = await res.json();
      setProjects(data?.data || []);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "একটি সমস্যা হয়েছে");
      }
    } finally {
      setLoading(false);
    }
  }, [buildQueryString]);

  useEffect(() => {
    const controller = new AbortController();
    const delay = setTimeout(() => {
      handleFetch(controller.signal);
    }, 400);

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [handleFetch]);

  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((sortBy: string, sortOrder: string) => {
    setSortConfig({
      sortBy: sortBy as SortOption,
      sortOrder: sortOrder as SortOrder
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold  mb-2">কৃষি প্রকল্পসমূহ</h1>
        <p className="text-gray-600">আপনার উপযোগী প্রকল্প খুঁজে বিনিয়োগ শুরু করুন</p>
      </div>

      <ProjectFilters
        onFiltersChange={handleFiltersChange}
        onSortChange={handleSortChange}
      />

      {loading && (
        <div className="flex flex-col justify-center items-center min-h-64">
          <Loader className="animate-spin text-5xl 0" />
          <p className="mt-4 ">প্রকল্পগুলো লোড হচ্ছে...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="flex justify-between items-center mt-8 mb-4">
            <p >
              মোট প্রকল্প: <span className="font-semibold">{projects.length}টি</span>
            </p>
          </div>

          {projects.length === 0 && !loading ? (
            <div className="text-center py-12">
              <p className=" text-lg">কোনো প্রকল্প পাওয়া যায়নি</p>
              <p >ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: IProject) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectComponent;