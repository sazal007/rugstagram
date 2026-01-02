import React from 'react';
import { Mail } from 'lucide-react';

interface EmptyStateProps {
  searchQuery: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery }) => {
    let message = "Newsletter subscriptions will appear here once users start subscribing.";
    if (searchQuery) {
        message = `No subscribers found matching "${searchQuery}".`;
    }
    
    return (
        <div className="p-8 text-center bg-white rounded-lg shadow">
            <Mail className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Subscribers Found</h3>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
        </div>
    );
};

export default EmptyState;
