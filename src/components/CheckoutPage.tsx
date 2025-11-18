import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { CartItem, appDataService } from './app-data-service';
import { toast } from 'sonner@2.0.3';
import { useAuth } from './AuthProvider';
import { HealthTipsSheet } from './HealthTipsSheet';
import svgPaths from "../imports/svg-z2ndimajyo";
import imgEllipse8 from "figma:asset/583c52b3b6f568a354f7ecca523171d3187d7d0a.png";
import imgEllipse9 from "figma:asset/42837e68b7a5415914811d8f6a2198ce447da299.png";
import imgRectangle29 from "figma:asset/eaeb088dcb2bf40e3c53938ebf9ca77c4d82ad4e.png";
import imgRectangle30 from "figma:asset/1e4e593d278cc8753a1d1401b0c53bc56398dfa5.png";
import imgRectangle31 from "figma:asset/5734456079688c1be8c67efb3082f3ec5100245d.png";

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onPlaceOrder: () => void;
  onNavigate: (page: string) => void;
}

export function CheckoutPage({ items, onBack, onPlaceOrder, onNavigate }: CheckoutPageProps) {
  const { user } = useAuth();
  const [customerName, setCustomerName] = useState(user?.username || '');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [healthTipsOpen, setHealthTipsOpen] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    items.reduce((acc, item) => ({...acc, [item.medicine.id]: item.quantity}), {})
  );

  const updateQuantity = (medicineId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [medicineId]: Math.max(1, (prev[medicineId] || 1) + change)
    }));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const qty = quantities[item.medicine.id] || item.quantity;
      return total + (item.medicine.price * qty);
    }, 0);
  };

  const handlePlaceOrder = () => {
    if (!customerName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!deliveryAddress.trim()) {
      toast.error('Please enter delivery address');
      return;
    }

    // Update cart quantities before placing order
    const updatedItems = items.map(item => ({
      ...item,
      quantity: quantities[item.medicine.id] || item.quantity
    }));

    // Place order with updated quantities
    const result = appDataService.placeOrder(updatedItems, deliveryAddress, customerName);
    
    if (result.success) {
      onPlaceOrder();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="bg-white overflow-clip relative md:rounded-[20px] size-full">
      {/* Background Shape */}
      <div className="absolute h-[724px] left-0 top-[155px] w-[402px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 402 724">
          <path d={svgPaths.p116c6900} fill="#05045C" />
        </svg>
      </div>
      
      <div className="absolute bg-[#05045c] h-[160px] left-0 top-0 w-[150px]" />
      <div className="absolute bg-white h-[160px] left-0 rounded-bl-[110px] top-0 w-[402px]" />

      {/* Header */}
      <div className="absolute left-[32px] size-[85px] top-[56px]">
        <img alt="" className="block max-w-none size-full" height="85" src={imgEllipse9} width="85" />
      </div>
      
      <button
        onClick={onBack}
        className="absolute left-[317px] size-[85px] top-[56px] hover:scale-110 transition-all z-20"
      >
        <img alt="" className="block max-w-none size-full" height="85" src={imgEllipse8} width="85" />
        <ChevronLeft className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-[#05045c]" />
      </button>

      <p className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[214px] text-[#05045c] text-[30px] text-center text-nowrap top-[80px] tracking-[-0.51px] translate-x-[-50%] whitespace-pre z-10" style={{ fontVariationSettings: "'wdth' 100" }}>
        Checkout
      </p>

      {/* Customer Details Card */}
      <div className="absolute bg-white h-auto min-h-[120px] left-[32px] rounded-[20px] top-[208px] w-[338px] p-3 z-10">
        <div className="space-y-2">
          <div>
            <label className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[12px] text-gray-600 block mb-1">
              Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05045c] font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            />
          </div>
          <div>
            <label className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[12px] text-gray-600 block mb-1">
              Delivery Address
            </label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter complete delivery address"
              rows={2}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05045c] font-['Instrument_Sans:Regular',sans-serif] text-[14px] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Medicines List Card */}
      <div className="absolute bg-white left-[32px] rounded-[20px] top-[360px] w-[338px] p-3 z-10 max-h-[300px] overflow-y-auto">
        <div className="flex justify-between mb-3">
          <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            Medicines
          </p>
          <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            Price
          </p>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.medicine.id} className="flex justify-between items-center py-1.5 border-b border-gray-200">
              <div className="flex-1 pr-2">
                <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[14px] text-black truncate">
                  {item.medicine.name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <button
                    onClick={() => updateQuantity(item.medicine.id, -1)}
                    className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <span className="text-sm leading-none">-</span>
                  </button>
                  <span className="font-['Instrument_Sans:Regular',sans-serif] text-[12px] min-w-[35px] text-center">
                    Qty: {quantities[item.medicine.id] || item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.medicine.id, 1)}
                    className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <span className="text-sm leading-none">+</span>
                  </button>
                </div>
              </div>
              <p className="font-['Instrument_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold text-[14px] text-black">
                ₹{item.medicine.price * (quantities[item.medicine.id] || item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-3">
          <div className="border-t border-dashed border-gray-300"></div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            Total
          </p>
          <p className="font-['Instrument_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            ₹{calculateTotal()}
          </p>
        </div>
      </div>

      {/* Place Order Button */}
      <motion.button
        onClick={handlePlaceOrder}
        className="absolute bg-[#7c86e4] h-[55px] left-[110px] rounded-[30px] top-[685px] w-[182px] z-10 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold text-[20px] text-center text-white tracking-[-0.374px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Place Order
        </p>
      </motion.button>

      {/* Bottom Navigation */}
      <div className="absolute bg-[#05045c] h-[82px] left-[22px] rounded-[20px] top-[762px] w-[357px] z-50" />
      
      <button
        onClick={() => onNavigate('dashboard')}
        className="absolute left-[171px] rounded-[20px] size-[60px] top-[773px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Home" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle29} />
      </button>
      
      <button
        onClick={() => onNavigate('account')}
        className="absolute left-[303px] rounded-[20px] size-[60px] top-[773px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Account" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle30} />
      </button>
      
      <button
        onClick={() => setHealthTipsOpen(true)}
        className="absolute left-[37px] rounded-[20px] size-[60px] top-[773px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Health Tips" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle31} />
      </button>

      {/* Health Tips Sheet */}
      <HealthTipsSheet open={healthTipsOpen} onOpenChange={setHealthTipsOpen} />
    </div>
  );
}
