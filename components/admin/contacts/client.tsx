"use client";

import { useContact } from "@/hooks/use-contact";
import { Separator } from "@/components/ui/separator";
import { ContactList } from "@/components/admin/contacts/contact-list";

export const ContactClient = () => {
  const { contacts, isLoading } = useContact();

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messages ({contacts.length})</h2>
          <p className="text-sm text-muted-foreground">Manage messages from contact form</p>
        </div>
      </div>
      <Separator className="my-4" />
      <ContactList data={contacts} />
    </>
  );
};
