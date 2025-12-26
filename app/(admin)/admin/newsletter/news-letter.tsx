'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Calendar, Users } from 'lucide-react';
import { useNewsletterSubscriptions } from '@/hooks/use-newsletter';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Mobile-friendly date format
const formatDateMobile = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const AdminNewsletterComponent = () => {
  const { data: subscriptions, isLoading, error, refetch } = useNewsletterSubscriptions();

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 sm:h-8 w-48 sm:w-64" />
            <Skeleton className="h-3 sm:h-4 w-64 sm:w-96" />
          </div>
        </div>
        <div className="grid gap-3 sm:gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full max-w-48 sm:max-w-64" />
                    <Skeleton className="h-3 w-24 sm:w-32" />
                  </div>
                  <Skeleton className="h-6 w-12 ml-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mx-4 sm:mx-0">
        <AlertDescription>
          Failed to load newsletter subscriptions. Please try again.
          <button
            onClick={() => refetch()}
            className="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-8 px-4 sm:px-6 lg:px-10 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Newsletter Subscriptions</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage and view all newsletter subscribers
          </p>
        </div>
        <Badge className="flex items-center gap-2 text-white bg-gray-500 p-2 hover:bg-gray-500 self-start sm:self-auto">
          <Users className="h-4 w-4" />
          <span className="text-sm">{subscriptions?.length || 0} Subscribers</span>
        </Badge>
      </div>

      {/* Stats Card */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            Subscription Overview
          </CardTitle>
          <CardDescription className="text-sm">
            Total newsletter subscriptions and recent activity
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold">{subscriptions?.length || 0}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Subscribers</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold">
                {subscriptions?.filter(sub => {
                  const subDate = new Date(sub.created_at);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return subDate > weekAgo;
                }).length || 0}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">This Week</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold">
                {subscriptions?.filter(sub => {
                  const subDate = new Date(sub.created_at);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return subDate >= today;
                }).length || 0}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions List */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">All Subscriptions</CardTitle>
          <CardDescription className="text-sm">
            Complete list of newsletter subscribers
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          {!subscriptions || subscriptions.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <Mail className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">No subscribers yet</h3>
              <p className="text-sm text-muted-foreground px-4">
                Newsletter subscriptions will appear here once users start subscribing.
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {subscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-3 sm:gap-0"
                >
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{subscription.email}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 shrink-0" />
                          <span className="hidden sm:inline">Subscribed:</span>
                          <span className="sm:hidden">Sub:</span>
                          <span className="hidden sm:inline">{formatDate(subscription.created_at)}</span>
                          <span className="sm:hidden">{formatDateMobile(subscription.created_at)}</span>
                        </span>
                        {subscription.updated_at !== subscription.created_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 shrink-0" />
                            <span className="hidden sm:inline">Updated:</span>
                            <span className="sm:hidden">Upd:</span>
                            <span className="hidden sm:inline">{formatDate(subscription.updated_at)}</span>
                            <span className="sm:hidden">{formatDateMobile(subscription.updated_at)}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 self-start sm:self-auto text-xs">
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};