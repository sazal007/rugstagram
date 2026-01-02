"use client";

import React from "react";
import { PortfolioForm } from "@/components/admin/portfolio";
import { usePortfolio, useUpdatePortfolio } from "@/hooks/use-portfolio";
import { PortfolioFormData } from "@/types/portfolio";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const EditPortfolioPage: React.FC = () => {
  const { tokens } = useAuth();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const { data: portfolio, isLoading: isFetching } = usePortfolio(slug);
  const updatePortfolioMutation = useUpdatePortfolio();

  const handleSubmit = async (data: PortfolioFormData) => {
    if (!portfolio) return;
    
    try {
      await updatePortfolioMutation.mutateAsync({
        id: portfolio.id,
        data,
        token: tokens?.access_token,
      });
      toast.success("Portfolio item updated successfully");
      router.push("/admin/portfolio");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update portfolio item");
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <PortfolioForm
        portfolio={portfolio}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/portfolio")}
        isLoading={updatePortfolioMutation.isPending}
      />
    </div>
  );
};

export default EditPortfolioPage;
