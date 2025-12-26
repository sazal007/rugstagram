"use client";

import { Contact } from "@/types/contact";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface ContactListProps {
  data: Contact[];
}

export const ContactList: React.FC<ContactListProps> = ({ data }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="whitespace-nowrap">
                {format(new Date(contact.created_at), "PPP")}
              </TableCell>
              <TableCell>{contact.full_name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone_number}</TableCell>
              <TableCell className="max-w-[400px] truncate" title={contact.message}>
                {contact.message || "-"}
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No messages found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
