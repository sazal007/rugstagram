

"use client";

import { 
  Package, 
  ShoppingCart, 
  Clock, 
  DollarSign, 
  LucideProps
} from 'lucide-react';

// Define the props for the StatCard component
interface StatCardProps {
  title: string; 
  value: number; 
  icon: 'Package' | 'ShoppingCart' | 'Clock' | 'DollarSign';
  iconColor: 'blue' | 'purple' | 'yellow' | 'green';
  isCurrency?: boolean;
}

const iconMap: { [key in StatCardProps['icon']]: React.ComponentType<LucideProps> } = {
  Package: Package,
  ShoppingCart: ShoppingCart,
  Clock: Clock,
  DollarSign: DollarSign,
};

const iconColorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-500' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-500' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-500' },
  green: { bg: 'bg-green-50', text: 'text-green-500' },
};

export default function StatCard({ 
  title, 
  value, 
  icon, 
  iconColor, 
  isCurrency = false,
}: StatCardProps) {

  const formattedValue = isCurrency 
  ? new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
    }).format(value || 0)
  : (value || 0).toLocaleString();


  const IconComponent = iconMap[icon] || Package;
  const colors = iconColorMap[iconColor] || iconColorMap.blue;

  return (
    <div className="p-6 transition-all bg-white shadow-sm rounded-xl hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="font-medium text-gray-500">{title}</div>
        <div className={`p-2 ${colors.bg} rounded-lg transition-colors`}>
          <IconComponent className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
      <div className="mb-2 text-3xl font-bold text-gray-900">
        {formattedValue}
      </div>
    </div>
  );
}