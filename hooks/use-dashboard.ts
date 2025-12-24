import { useQuery } from "@tanstack/react-query";
import * as dashboardService from "@/services/dashboard";
import { RevenueFilterType } from "@/types/dashboard";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: dashboardService.getDashboardStats,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRevenueData = (filterType: RevenueFilterType) => {
  return useQuery({
    queryKey: ["revenueData", filterType],
    queryFn: () => dashboardService.getRevenueData(filterType),
    staleTime: 5 * 60 * 1000,
  });
};
