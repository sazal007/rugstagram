import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  Icon: LucideIcon;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, Icon }) => {
    return (
        <div className="p-8 text-center bg-white rounded-lg shadow">
            <Icon className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
        </div>
    );
};

export default EmptyState;
