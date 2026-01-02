import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PortfolioHeaderProps {
  title: string;
  showAddButton?: boolean;
}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ title, showAddButton = true }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">
          Manage your portfolio items and gallery.
        </p>
      </div>
      {showAddButton && (
        <Link href="/admin/portfolio/add">
          <Button className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Portfolio
          </Button>
        </Link>
      )}
    </div>
  );
};

export default PortfolioHeader;
