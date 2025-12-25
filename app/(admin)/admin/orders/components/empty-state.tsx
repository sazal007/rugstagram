
import React from 'react';
import { Package } from 'lucide-react';

interface EmptyStateProps {
  searchQuery: string;
  filterStatus: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery, filterStatus }) => {
    let message = "No orders have been placed yet.";
    if (searchQuery) {
        message = `No orders found matching "${searchQuery}".`;
    } else if (filterStatus !== 'all') {
        message = `There are no orders with status "${filterStatus}".`;
    }
    
    return (
        <div className="p-8 text-center bg-white rounded-lg shadow">
            <Package className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Orders Found</h3>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
        </div>
    );
};

export default EmptyState;