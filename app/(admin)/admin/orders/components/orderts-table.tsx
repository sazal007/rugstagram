import React from "react";
import { RefreshCw } from "lucide-react";
import { Order, OrderStage } from "@/types/order";
import SortIcon from "./sort-icon";
import OrderDetails from "./order-details";
import {
  formatCurrency,
  formatDate,
  getStatusIcon,
  getStatusColor,
  STAGES,
} from "./utils";

interface OrdersTableProps {
  orders: Order[];
  sortColumn: string;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
  expandedOrder: string | null;
  onToggleExpand: (orderNumber: string) => void;
  onUpdateStage: (orderNumber: string, stage: OrderStage) => void;
  isUpdating: boolean;
  updatingOrderNumber?: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  sortColumn,
  sortDirection,
  onSort,
  expandedOrder,
  onToggleExpand,
  onUpdateStage,
  isUpdating,
  updatingOrderNumber,
}) => {
  const [localStages, setLocalStages] = React.useState<Record<string, OrderStage>>({});

  // Remove local stage entry once the server data has caught up
  React.useEffect(() => {
    setLocalStages(prev => {
      const next = { ...prev };
      let changed = false;
      orders.forEach(order => {
        if (order.stage && next[order.order_number] === order.stage) {
          delete next[order.order_number];
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [orders]);

  return (
    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
    {/* Mobile view - card layout */}
    <div className="p-2 space-y-3 sm:hidden">
      {orders.map((order) => {
        const isCurrentlyUpdating =
          isUpdating && updatingOrderNumber === order.order_number;
        return (
          <div
            key={order.order_number}
            className={`p-3 border rounded-lg transition-colors ${
              expandedOrder === order.order_number
                ? "bg-blue-50 border-blue-200"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              onClick={() => onToggleExpand(order.order_number)}
              className="cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    #{order.order_number}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {order.full_name || "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(order.total_amount)}
                  </p>
                  <span
                    className={`px-2 py-1 mt-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="ml-1 capitalize">{order.status}</span>
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {formatDate(order.created_at)}
              </p>
            </div>

            <div className="flex flex-col mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Stage:</span>
                <div className="relative flex items-center">
                  <select
                    value={localStages[order.order_number] || order.stage || ""}
                    onChange={(e) => {
                      const newStage = e.target.value as OrderStage;
                      setLocalStages(prev => ({ ...prev, [order.order_number]: newStage }));
                      onUpdateStage(order.order_number, newStage);
                    }}
                    disabled={isCurrentlyUpdating}
                    className="block px-2 py-1 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="" disabled>Select Stage</option>
                    {STAGES.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                  {isCurrentlyUpdating && (
                    <RefreshCw className="w-4 h-4 ml-2 text-gray-500 animate-spin" />
                  )}
                </div>
              </div>
            </div>

            {expandedOrder === order.order_number && (
              <div className="mt-3 -mx-3 -mb-3 overflow-hidden">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <OrderDetails order={order} />
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* Desktop view - table layout */}
    <div className="hidden overflow-x-auto sm:block">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["order_number", "full_name", "created_at", "total_amount"].map(
              (column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                  onClick={() => onSort(column)}
                >
                  <div className="flex items-center">
                    {column.replace(/_/g, " ")}
                    <SortIcon
                      column={column}
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
              )
            )}
            <th
              scope="col"
              className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Stage
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => {
            const isCurrentlyUpdating =
              isUpdating && updatingOrderNumber === order.order_number;
            return (
              <React.Fragment key={order.order_number}>
                <tr
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                    expandedOrder === order.order_number ? "bg-blue-50" : ""
                  }`}
                  onClick={() => onToggleExpand(order.order_number)}
                >
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {order.order_number}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {order.full_name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {formatCurrency(order.total_amount)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="relative flex items-center">
                      <select
                        value={localStages[order.order_number] || order.stage || ""}
                        onChange={(e) => {
                          const newStage = e.target.value as OrderStage;
                          setLocalStages(prev => ({ ...prev, [order.order_number]: newStage }));
                          onUpdateStage(order.order_number, newStage);
                        }}
                        disabled={isCurrentlyUpdating}
                        className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="" disabled>Select Stage</option>
                        {STAGES.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                      {isCurrentlyUpdating && (
                        <div className="absolute right-0 flex items-center pr-8 pointer-events-none">
                          <RefreshCw className="w-4 h-4 text-gray-500 animate-spin" />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedOrder === order.order_number && (
                  <tr>
                    <OrderDetails order={order} />
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default OrdersTable;
