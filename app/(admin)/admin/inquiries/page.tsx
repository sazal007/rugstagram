"use client";

import Link from "next/link";
import { Mail, Phone, Image as ImageIcon} from "lucide-react";

export default function InquiriesPage() {
  const inquiries = [
    {
      title: "Newsletter",
      href: "/admin/newsletter",
      icon: Mail,
    },
    {
      title: "Contacts",
      href: "/admin/contacts",
      icon: Phone,
    },
    {
      title: "Bespoke",
      href: "/admin/bespoke",
      icon: ImageIcon,
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Inquiries</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inquiries.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg transition-colors">
                    <Icon className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
