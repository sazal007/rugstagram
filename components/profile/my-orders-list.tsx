"use client";

import { useState } from "react";
import { 
  Search, 
 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical,
  ArrowUpDown
} from "lucide-react";
import { useMyOrders } from "@/hooks/use-myorders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { MyOrder } from "@/types/my-order";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import OrderDetails from "./order-details/order-details";

const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "delivered", label: "Completed" },
  { id: "processing", label: "To process" },
  { id: "cancelled", label: "Cancelled" },
  { id: "shipped", label: "Return & refund" },
];

export function MyOrdersList() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDense, setIsDense] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<MyOrder | null>(null);

  const { data: ordersData, isLoading } = useMyOrders(
    activeTab,
    search,
    page,
    pageSize
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "processing":
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "delivered": return "Completed";
      case "processing": return "To process";
      case "pending": return "To process";
      case "cancelled": return "Cancelled";
      case "shipped": return "Return";
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="px-8 pt-6 border-b border-slate-50 flex items-center gap-8 overflow-x-auto no-scrollbar">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setPage(1);
            }}
            className={cn(
              "pb-4 text-sm font-semibold transition-all relative",
              activeTab === tab.id 
                ? "text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-900" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search..." 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 bg-slate-50/50 border-none h-12 text-sm focus-visible:ring-1 focus-visible:ring-slate-200"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="pb-4 pt-2 px-1 w-10">
                  <input type="checkbox" className="rounded-md border-slate-200" />
                </th>
                <th className="pb-4 pt-2 font-semibold text-slate-500 text-sm tracking-tight">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors">
                    Order ID <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="pb-4 pt-2 font-semibold text-slate-500 text-sm tracking-tight">Delivery date</th>
                <th className="pb-4 pt-2 font-semibold text-slate-500 text-sm tracking-tight">Price</th>
                <th className="pb-4 pt-2 font-semibold text-slate-500 text-sm tracking-tight">Process Stage</th>
                <th className="pb-4 pt-2 font-semibold text-slate-500 text-sm tracking-tight">Status</th>
                <th className="pb-4 pt-2 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-6 px-1"><div className="h-4 w-4 bg-slate-50 rounded" /></td>
                    <td className="py-6"><div className="h-4 w-20 bg-slate-50 rounded" /></td>
                    <td className="py-6"><div className="h-4 w-32 bg-slate-50 rounded" /></td>
                    <td className="py-6"><div className="h-4 w-24 bg-slate-50 rounded" /></td>
                    <td className="py-6"><div className="h-4 w-20 bg-slate-50 rounded" /></td>
                    <td className="py-6"><div className="h-6 w-20 bg-slate-50 rounded-full" /></td>
                    <td className="py-6"><div className="h-4 w-4 bg-slate-50 rounded" /></td>
                  </tr>
                ))
              ) : ordersData?.orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No orders found matching your filters.
                  </td>
                </tr>
              ) : (
                ordersData?.orders.map((order) => (
                  <tr 
                    key={order.id} 
                    className={cn("hover:bg-slate-50/50 transition-colors group cursor-pointer", isDense ? "py-2" : "py-6")}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className={cn("px-1", isDense ? "py-3" : "py-6")}>
                      <input type="checkbox" className="rounded-md border-slate-200" />
                    </td>
                    <td className={cn("font-medium text-slate-900", isDense ? "py-3" : "py-6")}>
                      #{order.order_number}
                    </td>
                    <td className={cn("text-slate-600", isDense ? "py-3" : "py-6")}>
                      {new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                     <td className={cn("font-bold text-slate-900", isDense ? "py-3" : "py-6")}>
                      ${order.total_amount}
                    </td>
                    <td className={cn("text-slate-600 text-sm font-medium", isDense ? "py-3" : "py-6")}>
                      {order.stage || "N/A"}
                    </td>
                    <td className={cn(isDense ? "py-3" : "py-6")}>
                      <span className={cn(
                        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold leading-none select-none",
                        getStatusColor(order.status)
                      )}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className={cn("px-4 text-right", isDense ? "py-3" : "py-6")}>
                     
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <Switch 
               id="dense-toggle" 
               checked={isDense} 
               onCheckedChange={setIsDense}
               className="data-[state=checked]:bg-slate-900"
             />
             <label htmlFor="dense-toggle" className="text-sm font-semibold text-slate-600 select-none cursor-pointer">Dense</label>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
             <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-500">Rows per page:</span>
                <Select 
                  value={pageSize.toString()} 
                  onValueChange={(v) => {
                    setPageSize(parseInt(v));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-[70px] h-9 bg-transparent border-none shadow-none font-semibold focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
             </div>

             <div className="flex items-center gap-6">
                <span className="text-sm font-semibold text-slate-500">
                   {ordersData ? (
                     `${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, ordersData.total)} of ${ordersData.total}`
                   ) : "0-0 of 0"}
                </span>
                <div className="flex items-center gap-1">
                   <Button
                     variant="ghost"
                     size="icon"
                     disabled={!ordersData?.hasPrevious}
                     onClick={() => setPage(page - 1)}
                     className="h-9 w-9 text-slate-400 disabled:opacity-30 rounded-full"
                   >
                     <ChevronLeft className="h-5 w-5" />
                   </Button>
                   <Button
                     variant="ghost"
                     size="icon"
                     disabled={!ordersData?.hasNext}
                     onClick={() => setPage(page + 1)}
                     className="h-9 w-9 text-slate-400 disabled:opacity-30 rounded-full"
                   >
                     <ChevronRight className="h-5 w-5" />
                   </Button>
                </div>
             </div>
          </div>
        </div>
      </div>

      
      <OrderDetails 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        order={selectedOrder}
      />
    </div>
  );
}
