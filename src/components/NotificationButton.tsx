import { useState, useEffect } from 'react';
import { Bell, Package, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { appDataService, Order } from './app-data-service';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { motion } from 'motion/react';

export function NotificationButton() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    const allOrders = appDataService.getOrders();
    setOrders(allOrders);
    const unread = appDataService.getUnreadNotificationCount();
    setUnreadCount(unread);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // Mark all notifications as read when opening
      appDataService.markAllNotificationsAsRead();
      // Update the count immediately
      setUnreadCount(0);
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'confirmed':
        return <Package className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'confirmed':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'delivered':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'cancelled':
        return 'bg-red-50 border-red-200 text-red-700';
    }
  };

  const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'confirmed':
        return 'bg-blue-500 text-white';
      case 'delivered':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Order Pending';
      case 'confirmed':
        return 'Order Confirmed';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
    }
  };

  const getStatusMessage = (order: Order) => {
    switch (order.status) {
      case 'pending':
        return 'Your order has been received and is being processed';
      case 'confirmed':
        return 'Your order is being prepared for delivery';
      case 'delivered':
        return order.deliveredAt 
          ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
          : 'Successfully delivered';
      case 'cancelled':
        return 'This order has been cancelled';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button className="relative">
          <Bell className="w-7 h-7 text-[#05045c]" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 w-5 h-5 flex items-center justify-center p-0">
              {unreadCount}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Delivery Notifications
          </SheetTitle>
          <SheetDescription>
            Track your orders and delivery status
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-150px)] mt-6">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium mb-1">No notifications yet</p>
              <p className="text-sm text-gray-500">Your order updates will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={`border rounded-xl p-4 ${getStatusColor(order.status)} transition-all hover:shadow-md`}>
                    {/* Header with status badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${getStatusBadgeColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{getStatusText(order.status)}</p>
                          <p className="text-xs opacity-70">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </Badge>
                    </div>

                    {/* Status message */}
                    <p className="text-sm mb-3 opacity-90">
                      {getStatusMessage(order)}
                    </p>

                    {/* Order items preview */}
                    <div className="bg-white/50 rounded-lg p-2 mb-3">
                      <p className="text-xs font-medium mb-1 opacity-70">Items:</p>
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <p key={idx} className="text-xs truncate">
                            • {item.medicine.name} <span className="opacity-60">(x{item.quantity})</span>
                          </p>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs opacity-60">
                            +{order.items.length - 2} more item{order.items.length - 2 === 1 ? '' : 's'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer with total and date */}
                    <div className="flex items-center justify-between pt-2 border-t border-current/10">
                      <p className="text-xs opacity-70">
                        {new Date(order.orderedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="font-bold text-sm">₹{order.total}</p>
                    </div>
                  </div>
                  
                  {index < orders.length - 1 && <Separator className="my-3" />}
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
