import { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { appDataService, CartItem } from './app-data-service';
import { toast } from 'sonner@2.0.3';

interface CartPageProps {
  onBack: () => void;
  onCheckout: () => void;
  onOrderSuccess?: () => void;
}

export function CartPage({ onBack, onCheckout, onOrderSuccess }: CartPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = appDataService.getCart();
    setCartItems(items);
  };

  const handleUpdateQuantity = (medicineId: string, delta: number) => {
    const item = cartItems.find(i => i.medicine.id === medicineId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      handleRemoveItem(medicineId);
      return;
    }

    appDataService.updateCartQuantity(medicineId, newQuantity);
    loadCart();
  };

  const handleRemoveItem = (medicineId: string) => {
    appDataService.removeFromCart(medicineId);
    loadCart();
    toast.info('Item removed from cart');
  };

  const handlePlaceOrder = () => {
    if (!customerName.trim() || !deliveryAddress.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const order = appDataService.createOrder(customerName, deliveryAddress);
    
    // Simulate order confirmation after 1 second
    setTimeout(() => {
      appDataService.updateOrderStatus(order.id, 'confirmed');
    }, 1000);

    setCustomerName('');
    setDeliveryAddress('');
    loadCart();
    
    // Navigate to order success page
    if (onOrderSuccess) {
      onOrderSuccess();
    } else {
      toast.success('Order placed successfully!', {
        description: `Order #${order.id.slice(0, 8)} - ₹${order.total}`,
      });
      onCheckout();
    }
  };

  const total = appDataService.getCartTotal();

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#05045c] text-white p-3 sm:p-4 rounded-t-[20px] flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold">My Cart</h1>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3 sm:p-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <ShoppingCart className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 text-gray-300" />
            <p className="text-gray-500 text-base sm:text-lg">Your cart is empty</p>
            <Button onClick={onBack} className="mt-3 sm:mt-4 bg-[#05045c] hover:bg-[#07076e] text-sm sm:text-base">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 pb-4">
            {/* Cart Items */}
            <Card>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-6 pt-0">
                {cartItems.map((item) => (
                  <div key={item.medicine.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base truncate">{item.medicine.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          ₹{item.medicine.price}/{item.medicine.unit}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            onClick={() => handleUpdateQuantity(item.medicine.id, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 sm:w-8 text-center font-medium text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            onClick={() => handleUpdateQuantity(item.medicine.id, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="text-right min-w-[60px] sm:min-w-[80px]">
                          <p className="font-bold text-sm sm:text-base">₹{item.medicine.price * item.quantity}</p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.medicine.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 w-7 sm:h-9 sm:w-9"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                    <Separator className="mt-2 sm:mt-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Delivery Details */}
            <Card>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-6 pt-0">
                <div>
                  <Label htmlFor="name" className="text-xs sm:text-sm">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="text-sm sm:text-base h-9 sm:h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-xs sm:text-sm">Delivery Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter complete address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="text-sm sm:text-base h-9 sm:h-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Total */}
            <Card className="bg-[#05045c] text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg">Total Amount</span>
                  <span className="text-xl sm:text-2xl font-bold">₹{total}</span>
                </div>
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-white text-[#05045c] hover:bg-gray-100 h-10 sm:h-11 text-sm sm:text-base"
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
