"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { useOrders, useUpdateOrder } from '@/hooks/use-order';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { OrderStage } from '@/types/order';
import {
  SearchFilters,
  OrdersTable,
  ErrorAlert,
  EmptyState,
  LoadingSpinner
} from './components';
import Pagination from '@/components/ui/pagination';
type SortDirection = 'asc' | 'desc';

interface SortState {
  column: string;
  direction: SortDirection;
}

export default function AdminOrdersPage() {
  // Get admin authentication
  const { adminTokens } = useAdminAuth();
  
  // UI State Management
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sort, setSort] = useState<SortState>({ column: 'created_at', direction: 'desc' });
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filters = useMemo(() => ({
    page: pagination.page,
    page_size: pagination.pageSize,
    search: debouncedSearchQuery?.trim() || '',
    status: filterStatus,
    ordering: `${sort.direction === 'desc' ? '-' : ''}${sort.column}`,
  }), [pagination, debouncedSearchQuery, filterStatus, sort]);

  const { data: ordersData, error, isLoading, isFetching, refetch } = useOrders(
    filters,
    adminTokens?.access_token,
    {
      placeholderData: (previousData) => previousData,
    }
  );

  const { mutate: updateStatus, isPending: isUpdating, variables: updatingVariables } = useUpdateOrder();

  const handleUpdateStage = useCallback((orderNumber: string, stage: OrderStage) => {
    updateStatus({ 
      orderNumber, 
      data: { stage }, 
      token: adminTokens?.access_token 
    });
  }, [updateStatus, adminTokens?.access_token]);

  const handleSort = (column: string) => {
    setSort(prevSort => ({
      column,
      direction: (prevSort.column === column && prevSort.direction === 'desc' ? 'asc' : 'desc') as SortDirection,
    }));
    setPagination(p => ({ ...p, page: 1 }));
  };
  
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handlePageSizeChange = (newSize: number) => {
    setPagination({ page: 1, pageSize: newSize });
  };
  
  const totalPages = useMemo(() => {
    const count = ordersData?.count || 0;
    return count ? Math.ceil(count / pagination.pageSize) : 1;
  }, [ordersData?.count, pagination.pageSize]);

  const orders = ordersData?.results || [];
  const isDataLoading = isLoading || isFetching;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <SearchFilters
        searchQuery={searchQuery}
        filterStatus={filterStatus}
        onSearchChange={setSearchQuery}
        onFilterChange={(status) => { setFilterStatus(status); setPagination(p => ({...p, page: 1}))}}
        onRefresh={() => refetch()}
        isLoading={isDataLoading}
      />
 
      {error && <ErrorAlert error={error} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : orders.length === 0 ? (
        <EmptyState searchQuery={searchQuery} filterStatus={filterStatus} />
      ) : (
        <>
          <OrdersTable
            orders={orders}
            sortColumn={sort.column}
            sortDirection={sort.direction}
            onSort={handleSort}
            expandedOrder={expandedOrder}
            onToggleExpand={(orderNumber) => setExpandedOrder(expandedOrder === orderNumber ? null : orderNumber)}
            onUpdateStage={handleUpdateStage}
            isUpdating={isUpdating}
            updatingOrderNumber={updatingVariables?.orderNumber}
            token={adminTokens?.access_token}
          />
          <Pagination
            count={ordersData?.count || 0}
            currentPage={pagination.page}
            pageSize={pagination.pageSize}
            totalPages={totalPages}
            hasNext={!!ordersData?.next}
            hasPrevious={!!ordersData?.previous}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  );
}