"use client";

import { useAuth } from "@/context/AuthContext";
import { ProfileHeader } from "./profile-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMyOrders } from "@/hooks/use-myorders";
import { MyOrder } from "@/types/my-order";
import Link from "next/link";
import { Package, LogOut } from "lucide-react";

export function ProfilePage() {
  const { user, logout } = useAuth();
  const { data: ordersData, isLoading: isOrdersLoading } = useMyOrders();

  if (!user) return null;

  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <ProfileHeader user={user} onLogout={logout} />

      <Tabs defaultValue="overview" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Your personal details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    value={`${user.first_name || ""} ${user.last_name || ""}`} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user.email} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={user.phone || "Not provided"} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input 
                    value={user.street_address_1 || user.address || "Not provided"} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4 mt-6">
           <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View and track your recent orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isOrdersLoading ? (
                <div className="text-center py-8">Loading orders...</div>
              ) : !ordersData?.orders || ordersData.orders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="mx-auto h-12 w-12 opacity-50 mb-2" />
                  <p>You haven&apos;t placed any orders yet.</p>
                  <Button variant="link" asChild className="mt-2">
                    <Link href="/shop">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {ordersData.orders.map((order: MyOrder) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Order #{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm">
                          {order.items.length} item(s) • ${order.total_amount}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                         <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'processing' || order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="pt-4 border-t">
                 <h3 className="text-sm font-medium text-destructive mb-2">Danger Zone</h3>
                 <Button variant="destructive" onClick={logout} className="gap-2">
                   <LogOut className="h-4 w-4" />
                   Log Out
                 </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
      </Tabs>
    </div>
  );
}
