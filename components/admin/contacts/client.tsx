"use client";

import React, { useState, useMemo } from 'react';
import { useContact, useContactById } from "@/hooks/use-contact";
import { Contact } from "@/types/contact";
import { ContactList } from "@/components/admin/contacts/contact-list";
import SearchFilters from "@/components/admin/shared/search-filters";
import LoadingSpinner from "@/components/admin/shared/loading-spinner";
import ErrorAlert from "@/components/admin/shared/error-alert";
import EmptyState from "@/components/admin/shared/empty-state";
import DetailView from "@/components/admin/contacts/contact-details/contact-details";
import { MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const ContactClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { contacts, totalCount, isLoading, error, fetchContacts } = useContact();
  const { data: selectedContact, isLoading: isContactLoading } = useContactById(selectedContactId);

  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
    
    if (!searchQuery.trim()) return contacts;
    
    const query = searchQuery.toLowerCase().trim();
    return contacts.filter((item: Contact) => 
      item.full_name.toLowerCase().includes(query) || 
      item.email.toLowerCase().includes(query) ||
      (item.phone && item.phone.toLowerCase().includes(query))
    );
  }, [contacts, searchQuery]);

  const handleContactClick = (id: number) => {
    setSelectedContactId(id);
    setIsDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // Small timeout to avoid content disappearing while dialog is closing
      setTimeout(() => setSelectedContactId(null), 300);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={() => fetchContacts()}
        isLoading={isLoading}
        totalItems={totalCount}
        title="Contact Messages"
        placeholder="Search messages..."
        Icon={MessageSquare}
        badgeLabel="Messages"
      />

      {error ? (
        <ErrorAlert error={new Error(error)} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : filteredContacts.length === 0 ? (
        <EmptyState 
           title="No Messages Found"
           message={searchQuery ? `No messages found matching "${searchQuery}".` : "Contact messages will appear here once users start submitting the form."}
           Icon={MessageSquare}
        />
      ) : (
        <ContactList 
          data={filteredContacts} 
          onContactClick={handleContactClick}
        />
      )}

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-2xl border-none">
          <DialogHeader className="sr-only">
             <DialogTitle>Contact Message Details</DialogTitle>
             <DialogDescription>
                Detailed view of the contact message from {selectedContact?.full_name}
             </DialogDescription>
          </DialogHeader>
          
          {isContactLoading ? (
            <div className="p-20">
              <LoadingSpinner />
            </div>
          ) : selectedContact ? (
            <DetailView contact={selectedContact} />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};
