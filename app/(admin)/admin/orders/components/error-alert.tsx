

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  error: Error | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => (
  <div className="p-4 mb-4 border border-red-200 rounded-md bg-red-50">
    <div className="flex">
      <AlertCircle className="w-5 h-5 text-red-400" />
      <div className="ml-3">
        <p className="text-sm font-medium text-red-800">Error</p>
        <p className="mt-1 text-sm text-red-700">{error?.message || 'An unknown error occurred.'}</p>
      </div>
    </div>
  </div>
);

export default ErrorAlert;