"use client";

import React from 'react';
import { Mail, Calendar, User, Phone, MessageSquare } from 'lucide-react';
import { Contact } from "@/types/contact";

interface ContactListProps {
  data: Contact[];
  onContactClick: (id: number) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatDateMobile = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const ContactList: React.FC<ContactListProps> = ({ data, onContactClick }) => {
  return (
    <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg">
      {/* Mobile view - card layout */}
      <div className="p-2 space-y-3 sm:hidden">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => onContactClick(item.id)}
            className="p-3 border rounded-lg border-gray-200 bg-white hover:border-indigo-300 transition-colors cursor-pointer active:bg-gray-50"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400 shrink-0" />
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.full_name}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-3 w-3 text-gray-400 shrink-0" />
                  <p className="text-xs text-gray-500 truncate">{item.email}</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-3 w-3 text-gray-400 shrink-0" />
                  <p className="text-xs text-gray-500 truncate">{item.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-start gap-2">
                <MessageSquare className="h-3 w-3 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 line-clamp-2">{item.message || "-"}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-2">
                <Calendar className="h-3 w-3" />
                <span>{formatDateMobile(item.created_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - table layout */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onContactClick(item.id)}
                className="hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-3 group-hover:text-indigo-500 transition-colors" />
                    <div className="text-sm font-medium text-gray-900">{item.full_name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="h-3 w-3 text-gray-400 mr-2" />
                      {item.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-3 w-3 text-gray-400 mr-2" />
                      {item.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start max-w-xs xl:max-w-md">
                    <MessageSquare className="h-3 w-3 text-gray-400 mr-2 mt-1 shrink-0" />
                    <div className="text-sm text-gray-600 line-clamp-2" title={item.message}>
                      {item.message || "-"}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-3 w-3 text-gray-400 mr-2" />
                    {formatDate(item.created_at)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
