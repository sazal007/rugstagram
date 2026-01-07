"use client";

import React from 'react';
import { Contact } from '@/types/contact';
import { Mail, Phone, User, MessageSquare, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface DetailViewProps {
  contact: Contact;
}

const DetailView: React.FC<DetailViewProps> = ({ contact }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="h-full bg-white flex flex-col max-h-[85vh]">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 border-b border-gray-50 pb-8">
           <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 shadow-sm">
              <User className="w-8 h-8" strokeWidth={1.5} />
           </div>
           <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{contact.full_name}</h1>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-wide">
                  Contact Details
                </span>
                <span className="text-gray-300">•</span>
                <span>{new Date(contact.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
           {/* Email Card */}
           <div 
             className="group relative p-5 bg-white border border-gray-200 rounded-xl flex items-start gap-4 hover:border-indigo-300 hover:shadow-sm transition-all duration-300 cursor-pointer"
             onClick={() => copyToClipboard(contact.email, 'email')}
           >
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email Address</p>
                <p className="text-sm font-semibold text-gray-900 truncate pr-8" title={contact.email}>
                  {contact.email}
                </p>
              </div>
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                {copiedField === 'email' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </div>
           </div>
           
           {/* Number Card */}
           <div 
             className="group relative p-5 bg-white border border-gray-200 rounded-xl flex items-start gap-4 hover:border-indigo-300 hover:shadow-sm transition-all duration-300 cursor-pointer"
             onClick={() => contact.phone && copyToClipboard(contact.phone, 'phone')}
           >
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 shrink-0">
                <Phone className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Phone Number</p>
                <p className="text-sm font-semibold text-gray-900">
                  {contact.phone   || <span className="text-gray-400 font-normal italic lowercase">Not provided</span>}
                </p>
              </div>
              {contact.phone && (
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </div>
              )}
           </div>
        </div>

        {/* Message Section */}
        <div className="relative">
           <div className="flex items-center gap-3 mb-3 px-1">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Message Content</span>
           </div>
           <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100/50 shadow-inner">
             <p className="text-gray-800 leading-relaxed text-base font-medium whitespace-pre-wrap">
               {contact.message || "No message content."}
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
