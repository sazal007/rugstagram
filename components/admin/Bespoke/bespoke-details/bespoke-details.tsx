"use client";

import React from 'react';
import { Bespoke } from '@/types/bespoke';
import { MessageSquare, Copy, Check, ImageIcon, Calendar, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Image from "next/image";

interface BespokeDetailViewProps {
  bespoke: Bespoke;
}

const BespokeDetailView: React.FC<BespokeDetailViewProps> = ({ bespoke }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="h-full bg-white flex flex-col md:max-h-[85vh] overflow-hidden">
      {/* Main Container with subtle border top */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Side: Information (7/12 width) */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-10 border-gray-50">
            
            {/* Top Badge & Title Group */}
            <div className="space-y-4">

              
              <div className="space-y-2">
                 <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {bespoke.full_name}
                 </h1>
                 <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(bespoke.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Premium Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email Widget */}
              <div 
                className="group relative p-5 bg-gray-50/50 border border-gray-100 rounded-2xl transition-all duration-300 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 cursor-pointer overflow-hidden"
                onClick={() => copyToClipboard(bespoke.email, 'email')}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                <div className="flex items-center gap-4 relative z-10">

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Primary Email</p>
                    <p className="text-[12px]  text-gray-900 truncate" title={bespoke.email}>
                      {bespoke.email}
                    </p>
                  </div>
                  <div className="text-gray-300 group-hover:text-blue-500 transition-colors">
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </div>
                </div>
              </div>
              
              {/* Phone Widget */}
              <div 
                className="group relative p-5 bg-gray-50/50 border border-gray-100 rounded-2xl transition-all duration-300 hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer overflow-hidden"
                onClick={() => bespoke.phone_number && copyToClipboard(bespoke.phone_number, 'phone')}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Contact Number</p>
                    <p className="text-[12px]  text-gray-900">
                      {bespoke.phone_number || <span className="text-gray-300 font-normal italic">Not provided</span>}
                    </p>
                  </div>
                  {bespoke.phone_number && (
                    <div className="text-gray-300 group-hover:text-indigo-500 transition-colors">
                      {copiedField === 'phone' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Message Section with stylized container */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5 text-gray-400">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Client Inquiry</span>
                </div>
              </div>
              <div className="relative p-8 bg-linear-to-br from-gray-50/80 to-white border border-gray-100 rounded-[2rem] shadow-inner-sm overflow-hidden">
                <p className="relative z-10 text-gray-700 leading-relaxed text-lg font-medium whitespace-pre-wrap font-sans">
                  {bespoke.message || "The client chose not to leave a specific message for this request."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Media Showcase (5/12 width) */}
          <div className="lg:col-span-5 bg-gray-50/30 p-8 sm:p-12">
            <div className="h-full flex flex-col space-y-6">
              <div className="flex items-end justify-end">
                {bespoke.image && typeof bespoke.image === "string" && (
                  <a 
                    href={bespoke.image} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest bg-white py-1.5 px-3 rounded-full border border-indigo-100 shadow-sm"
                  >
                    View Full <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="group relative flex-1 min-h-[400px] bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 hover:shadow-indigo-500/10 hover:border-indigo-100">
                {bespoke.image && typeof bespoke.image === "string" ? (
                  <>
                    <Image
                      src={bespoke.image}
                      alt={bespoke.full_name}
                      fill
                      className="object-cover p-10 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-300">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 shadow-inner">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <p className="text-xs font-bold tracking-widest uppercase">No design attachment</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BespokeDetailView;
