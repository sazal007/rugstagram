"use client";

import React from "react";
import { PortfolioHeader, PortfolioTable } from "@/components/admin/portfolio";
import { usePortfolios, useDeletePortfolio } from "@/hooks/use-portfolio";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Portfolio } from "@/types/portfolio";
import { useRouter } from "next/navigation";

const PortfolioAdminPage: React.FC = () => {
  const { tokens } = useAuth();
  const router = useRouter();
  const { data, isLoading } = usePortfolios();
  const deletePortfolioMutation = useDeletePortfolio();

  const handleEdit = (portfolio: Portfolio) => {
    router.push(`/admin/portfolio/${portfolio.slug}`);
  };

  const handleDelete = async (portfolio: Portfolio) => {
    if (confirm("Are you sure you want to delete this portfolio item?")) {
      try {
        await deletePortfolioMutation.mutateAsync({
          id: portfolio.id,
          token: tokens?.access_token,
        });
        toast.success("Portfolio item deleted successfully");
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete portfolio item");
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PortfolioHeader title="Portfolio Management" />
      <PortfolioTable
        portfolios={data?.results || []}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PortfolioAdminPage;
