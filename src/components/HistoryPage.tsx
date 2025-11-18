import { useState, useEffect } from 'react';
import { History, ShoppingBag, Phone, ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { appDataService, Order, CallHistory } from './app-data-service';

interface HistoryPageProps {
  onBack: () => void;
}

export function HistoryPage({ onBack }: HistoryPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [calls, setCalls] = useState<CallHistory[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setOrders(appDataService.getOrders().reverse());
    setCalls(appDataService.getCallHistory());
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<Order['status'], { color: string; label: string }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      confirmed: { color: 'bg-blue-100 text-blue-800', label: 'Confirmed' },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
    };
    const variant = variants[status];
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#05045c] text-white p-4 rounded-t-[20px]">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Medical History</h1>
            <p className="text-sm text-white/80">Your orders and hospital contacts</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Tabs defaultValue="orders" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Purchase History
            </TabsTrigger>
            <TabsTrigger value="calls">
              <Phone className="w-4 h-4 mr-2" />
              Hospital Calls
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-4">
            <ScrollArea className="h-[600px]">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">No purchase history</p>
                  <p className="text-sm text-gray-400 mt-2">Your orders will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">
                              Order #{order.id.slice(0, 8)}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(order.orderedAt).toLocaleString('en-IN')}
                            </CardDescription>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Customer Info */}
                        <div className="bg-gray-50 p-3 rounded-lg text-sm">
                          <p><strong>Name:</strong> {order.customerName}</p>
                          <div className="flex items-start gap-2 mt-1">
                            <MapPin className="w-3 h-3 mt-1 flex-shrink-0" />
                            <span><strong>Address:</strong> {order.deliveryAddress}</span>
                          </div>
                        </div>

                        {/* Items */}
                        <div>
                          <p className="font-medium mb-2">Items:</p>
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span>
                                  {item.medicine.name} x {item.quantity}
                                </span>
                                <span className="font-medium">
                                  ₹{item.medicine.price * item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span className="text-[#05045c]">₹{order.total}</span>
                          </div>
                        </div>

                        {/* Delivery Info */}
                        {order.deliveredAt && (
                          <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                            ✅ Delivered on {new Date(order.deliveredAt).toLocaleDateString('en-IN')}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="calls" className="mt-4">
            <ScrollArea className="h-[600px]">
              {calls.length === 0 ? (
                <div className="text-center py-12">
                  <Phone className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">No call history</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Hospitals you contact will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {calls.map((call) => (
                    <Card key={call.id}>
                      <CardContent className="pt-4">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start gap-3">
                            <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                              <Phone className="w-5 h-5 text-green-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-[#05045c] break-words">
                                {call.hospital.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1 break-words">
                                {call.hospital.address}, {call.hospital.city}
                              </p>
                              <p className="text-sm text-gray-600 break-words">
                                <Phone className="w-3 h-3 inline mr-1" />
                                {call.hospital.phone}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {call.hospital.state}
                                </Badge>
                                {call.hospital.emergency24x7 && (
                                  <Badge variant="outline" className="text-xs border-green-500 text-green-700">
                                    24/7 Emergency
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 mt-2 break-words">
                                Called on {new Date(call.calledAt).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.location.href = `tel:${call.hospital.phone}`}
                            className="w-full flex items-center justify-center"
                          >
                            <Phone className="w-4 h-4 mr-1" />
                            Call Again
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
