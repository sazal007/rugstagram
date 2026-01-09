"use client";

import React, { useState, useMemo } from 'react';
import { useBespokes, useBespokeById } from "@/hooks/use-bespoke";
import { Bespoke } from "@/types/bespoke";
import { BespokeList } from "@/components/admin/Bespoke/bespoke-list";
import SearchFilters from "@/components/admin/shared/search-filters";
import LoadingSpinner from "@/components/admin/shared/loading-spinner";
import ErrorAlert from "@/components/admin/shared/error-alert";
import EmptyState from "@/components/admin/shared/empty-state";
import BespokeDetailView from "@/components/admin/Bespoke/bespoke-details/bespoke-details";
import { LayoutGrid } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const BespokeClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBespokeId, setSelectedBespokeId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { bespokes, isLoading, error, fetchBespokes, totalCount } = useBespokes();
  const { data: selectedBespoke, isLoading: isBespokeLoading } = useBespokeById(selectedBespokeId);

  const filteredBespokes = useMemo(() => {
    if (!bespokes) return [];
    
    if (!searchQuery.trim()) return bespokes;
    
    const query = searchQuery.toLowerCase().trim();
    return bespokes.filter((item: Bespoke) => 
      item.full_name.toLowerCase().includes(query) || 
      item.email.toLowerCase().includes(query) ||
      item.phone_number.toLowerCase().includes(query)
    );
  }, [bespokes, searchQuery]);

  const handleBespokeClick = (id: number) => {
    setSelectedBespokeId(id);
    setIsDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setTimeout(() => setSelectedBespokeId(null), 300);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={() => fetchBespokes()}
        isLoading={isLoading}
        totalItems={totalCount}
        title="Bespoke Requests"
        placeholder="Search requests..."
        Icon={LayoutGrid}
        badgeLabel="Requests"
      />

      {error ? (
        <ErrorAlert error={new Error(error)} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : filteredBespokes.length === 0 ? (
        <EmptyState 
           title="No Requests Found"
           message={searchQuery ? `No bespoke requests found matching "${searchQuery}".` : "Bespoke requests will appear here once users start submitting."}
           Icon={LayoutGrid}
        />
      ) : (
        <BespokeList 
          data={filteredBespokes} 
          onBespokeClick={handleBespokeClick}
        />
      )}

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-5xl! p-0 overflow-hidden border-none">
          <DialogHeader className="sr-only">
             <DialogTitle>Bespoke Request Details</DialogTitle>
             <DialogDescription>
                Detailed view of the bespoke request from {selectedBespoke?.full_name}
             </DialogDescription>
          </DialogHeader>
          
          {isBespokeLoading ? (
            <div className="p-20">
              <LoadingSpinner />
            </div>
          ) : selectedBespoke ? (
            <BespokeDetailView bespoke={selectedBespoke} />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};
