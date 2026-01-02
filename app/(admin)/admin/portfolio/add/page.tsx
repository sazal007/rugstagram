"use client";

import React from "react";
import { PortfolioForm } from "@/components/admin/portfolio";
import { useCreatePortfolio } from "@/hooks/use-portfolio";
import { PortfolioFormData } from "@/types/portfolio";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddPortfolioPage: React.FC = () => {
  const { tokens } = useAuth();
  const router = useRouter();
  const createPortfolioMutation = useCreatePortfolio();

  const handleSubmit = async (data: PortfolioFormData) => {
    try {
      await createPortfolioMutation.mutateAsync({
        data,
        token: tokens?.access_token,
      });
      toast.success("Portfolio item created successfully");
      router.push("/admin/portfolio");
    } catch (error) {
      console.error("Creation failed:", error);
      toast.error("Failed to create portfolio item");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PortfolioForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/portfolio")}
        isLoading={createPortfolioMutation.isPending}
      />
    </div>
  );
};

export default AddPortfolioPage;
