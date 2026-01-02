import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import { Subscriber } from '@/types/newsletter';
import { Badge } from '@/components/ui/badge';

interface NewsletterTableProps {
  subscriptions: Subscriber[];
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

const NewsletterTable: React.FC<NewsletterTableProps> = ({ subscriptions }) => {
  return (
    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
      {/* Mobile view - card layout */}
      <div className="p-2 space-y-3 sm:hidden">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="p-3 border rounded-lg border-gray-200 bg-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {sub.email}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Calendar className="h-3 w-3 shrink-0" />
                    <span>Sub: {formatDateMobile(sub.created_at)}</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
                Active
              </Badge>
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
                Email Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscribed Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <div className="text-sm font-medium text-gray-900">{sub.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(sub.created_at)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                    Active
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterTable;
