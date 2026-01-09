

import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-12 h-12 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
  </div>
);

export default LoadingSpinner;