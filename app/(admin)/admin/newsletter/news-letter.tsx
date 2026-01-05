'use client';

import React, { useState, useMemo } from 'react';
import { useNewsletterSubscriptions } from '@/hooks/use-newsletter';
import { Subscriber } from '@/types/newsletter';
import { NewsletterTable } from './components';
import SearchFilters from "@/components/admin/shared/search-filters";
import LoadingSpinner from "@/components/admin/shared/loading-spinner";
import ErrorAlert from "@/components/admin/shared/error-alert";
import EmptyState from "@/components/admin/shared/empty-state";
import { Users, Mail } from 'lucide-react';

export const AdminNewsletterComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isFetching, error, refetch } = useNewsletterSubscriptions();

  // Handle subscriber data (client side filtering since API doesn't seem to support search yet)
  const filteredSubscriptions = useMemo(() => {
    if (!data) return [];
    
    // Check if data is array or object with results
    const subs: Subscriber[] = Array.isArray(data) ? data : ((data as unknown) as { results: Subscriber[] }).results || [];
    
    if (!searchQuery.trim()) return subs;
    
    const query = searchQuery.toLowerCase().trim();
    return subs.filter((sub: Subscriber) => 
      sub.email.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const isDataLoading = isLoading || isFetching;
  const totalSubscribers = Array.isArray(data) ? data.length : ((data as unknown) as { count: number })?.count || 0;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={() => refetch()}
        isLoading={isDataLoading}
        totalItems={totalSubscribers}
        title="Newsletter Management"
        placeholder="Search by email..."
        Icon={Users}
        badgeLabel="Subscribers"
      />

      {error ? (
        <ErrorAlert error={error as Error} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : filteredSubscriptions.length === 0 ? (
        <EmptyState 
          title="No Subscribers Found"
          message={searchQuery ? `No subscribers found matching "${searchQuery}".` : "Newsletter subscriptions will appear here once users start subscribing."}
          Icon={Mail}
        />
      ) : (
        <NewsletterTable subscriptions={filteredSubscriptions} />
      )}
    </div>
  );
};