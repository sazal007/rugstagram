import {
  DashboardStats,
  RevenueAPIResponse,
  RevenueFilterType,
} from "@/types/dashboard";
import { siteConfig } from "@/config/siteConfig";

const API_BASE_URL = siteConfig.backendUrl;

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch(`${API_BASE_URL}/api/dashboard-stats/`);
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Network response was not ok" }));
    throw new Error(errorData.message || "Failed to fetch dashboard stats");
  }
  return response.json();
};

export const getRevenueData = async (
  filterType: RevenueFilterType
): Promise<RevenueAPIResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/revenue/?filter=${filterType}`
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Network response was not ok" }));
    throw new Error(errorData.message || "Failed to fetch revenue data");
  }
  return response.json();
};
