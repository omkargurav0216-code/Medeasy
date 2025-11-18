// Local storage-based data service for the MedEasy app
import { LARGE_MEDICINE_DATABASE } from './large-medicine-database';
import { REAL_MEDICINES } from './real-medicines-database';

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  manufacturer: string;
  inStock: boolean;
  imageUrl?: string;
  rating?: number;
  reviews?: number;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  specialties: string[];
  rating: number;
  emergency24x7: boolean;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
  addedAt: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryAddress: string;
  customerName: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  orderedAt: string;
  deliveredAt?: string;
}

export interface CallHistory {
  id: string;
  hospital: Hospital;
  calledAt: string;
  duration?: string;
}

const MEDICINES_KEY = 'medeasy_medicines';
const HOSPITALS_KEY = 'medeasy_hospitals';
const CART_KEY = 'medeasy_cart';
const ORDERS_KEY = 'medeasy_orders';
const CALL_HISTORY_KEY = 'medeasy_call_history';
const NOTIFICATION_READ_KEY = 'medeasy_notifications_read';

// Sample Indian medicines database
const INITIAL_MEDICINES: Medicine[] = [
  { id: '1', name: 'Paracetamol 500mg', description: 'Pain relief and fever reducer', price: 30, unit: 'strip', category: 'Pain Relief', manufacturer: 'Sun Pharma', inStock: true },
  { id: '2', name: 'Aspirin 75mg', description: 'Blood thinner and pain relief', price: 50, unit: 'strip', category: 'Cardiovascular', manufacturer: 'Cipla', inStock: true },
  { id: '3', name: 'Ibuprofen 400mg', description: 'Anti-inflammatory pain reliever', price: 45, unit: 'strip', category: 'Pain Relief', manufacturer: 'Dr. Reddy\'s', inStock: true },
  { id: '4', name: 'Amoxicillin 500mg', description: 'Antibiotic for bacterial infections', price: 120, unit: 'strip', category: 'Antibiotic', manufacturer: 'Lupin', inStock: true },
  { id: '5', name: 'Cetirizine 10mg', description: 'Antihistamine for allergies', price: 35, unit: 'strip', category: 'Allergy', manufacturer: 'Zydus Cadila', inStock: true },
  { id: '6', name: 'Omeprazole 20mg', description: 'Reduces stomach acid', price: 80, unit: 'strip', category: 'Digestive', manufacturer: 'Torrent Pharma', inStock: true },
  { id: '7', name: 'Metformin 500mg', description: 'Diabetes medication', price: 90, unit: 'strip', category: 'Diabetes', manufacturer: 'USV', inStock: true },
  { id: '8', name: 'Atorvastatin 10mg', description: 'Cholesterol medication', price: 110, unit: 'strip', category: 'Cardiovascular', manufacturer: 'Ranbaxy', inStock: true },
  { id: '9', name: 'Vitamin D3 60000 IU', description: 'Vitamin D supplement', price: 25, unit: 'capsule', category: 'Supplement', manufacturer: 'Abbott', inStock: true },
  { id: '10', name: 'Cough Syrup', description: 'Relief from cough and cold', price: 85, unit: 'bottle', category: 'Cough & Cold', manufacturer: 'Dabur', inStock: true },
  { id: '11', name: 'Azithromycin 500mg', description: 'Antibiotic', price: 150, unit: 'strip', category: 'Antibiotic', manufacturer: 'Pfizer', inStock: true },
  { id: '12', name: 'Diclofenac Gel', description: 'Topical pain relief', price: 95, unit: 'tube', category: 'Pain Relief', manufacturer: 'Novartis', inStock: true },
];

// Sample Indian hospitals database
const INITIAL_HOSPITALS: Hospital[] = [
  { id: '1', name: 'Apollo Hospital', address: 'Greams Road', city: 'Chennai', state: 'Tamil Nadu', phone: '+91-44-28293333', specialties: ['Cardiology', 'Oncology', 'Neurology'], rating: 4.5, emergency24x7: true },
  { id: '2', name: 'Fortis Hospital', address: 'Sector 62', city: 'Noida', state: 'Uttar Pradesh', phone: '+91-120-6674444', specialties: ['Orthopedics', 'Cardiology', 'Neurology'], rating: 4.3, emergency24x7: true },
  { id: '3', name: 'Manipal Hospital', address: 'HAL Airport Road', city: 'Bangalore', state: 'Karnataka', phone: '+91-80-25023344', specialties: ['Oncology', 'Nephrology', 'Gastroenterology'], rating: 4.4, emergency24x7: true },
  { id: '4', name: 'AIIMS Delhi', address: 'Ansari Nagar', city: 'New Delhi', state: 'Delhi', phone: '+91-11-26588500', specialties: ['All Specialties'], rating: 4.8, emergency24x7: true },
  { id: '5', name: 'Lilavati Hospital', address: 'Bandra West', city: 'Mumbai', state: 'Maharashtra', phone: '+91-22-26567891', specialties: ['Cardiology', 'Neurosurgery', 'Oncology'], rating: 4.6, emergency24x7: true },
  { id: '6', name: 'Max Hospital', address: 'Saket', city: 'New Delhi', state: 'Delhi', phone: '+91-11-26515050', specialties: ['Cardiology', 'Oncology', 'Orthopedics'], rating: 4.4, emergency24x7: true },
  { id: '7', name: 'Narayana Health', address: 'Bommasandra', city: 'Bangalore', state: 'Karnataka', phone: '+91-80-71222222', specialties: ['Cardiac Surgery', 'Oncology', 'Neurology'], rating: 4.5, emergency24x7: true },
  { id: '8', name: 'KEM Hospital', address: 'Parel', city: 'Mumbai', state: 'Maharashtra', phone: '+91-22-24107000', specialties: ['Emergency', 'General Medicine', 'Surgery'], rating: 4.2, emergency24x7: true },
  { id: '9', name: 'KIMS Hospital', address: 'Begumpet', city: 'Hyderabad', state: 'Telangana', phone: '+91-40-44885000', specialties: ['Cardiology', 'Neurology', 'Orthopedics'], rating: 4.3, emergency24x7: true },
  { id: '10', name: 'Sankara Nethralaya', address: 'Nungambakkam', city: 'Chennai', state: 'Tamil Nadu', phone: '+91-44-28271616', specialties: ['Ophthalmology'], rating: 4.7, emergency24x7: false },
  { id: '11', name: 'Medanta Hospital', address: 'Sector 38', city: 'Gurugram', state: 'Haryana', phone: '+91-124-4141414', specialties: ['Cardiology', 'Oncology', 'Neurology'], rating: 4.6, emergency24x7: true },
  { id: '12', name: 'Ruby Hall Clinic', address: 'Pune Station', city: 'Pune', state: 'Maharashtra', phone: '+91-20-26163200', specialties: ['Cardiology', 'Neurology', 'Oncology'], rating: 4.3, emergency24x7: true },
  { id: '13', name: 'Breach Candy Hospital', address: 'Bhulabhai Desai Road', city: 'Mumbai', state: 'Maharashtra', phone: '+91-22-23667788', specialties: ['General Surgery', 'Cardiology'], rating: 4.1, emergency24x7: true },
  { id: '14', name: 'Care Hospital', address: 'Banjara Hills', city: 'Hyderabad', state: 'Telangana', phone: '+91-40-61651000', specialties: ['Cardiology', 'Neurology', 'Oncology'], rating: 4.4, emergency24x7: true },
  { id: '15', name: 'Columbia Asia Hospital', address: 'Whitefield', city: 'Bangalore', state: 'Karnataka', phone: '+91-80-66942442', specialties: ['General Medicine', 'Pediatrics', 'Surgery'], rating: 4.2, emergency24x7: true },
];

class AppDataService {
  // Initialize data
  initializeData(): void {
    if (!localStorage.getItem(MEDICINES_KEY)) {
      // Combine real medicines with generated database - real medicines first
      const allMedicines = [...REAL_MEDICINES, ...LARGE_MEDICINE_DATABASE];
      localStorage.setItem(MEDICINES_KEY, JSON.stringify(allMedicines));
    }
    if (!localStorage.getItem(HOSPITALS_KEY)) {
      localStorage.setItem(HOSPITALS_KEY, JSON.stringify(INITIAL_HOSPITALS));
    }
    if (!localStorage.getItem(CART_KEY)) {
      localStorage.setItem(CART_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(ORDERS_KEY)) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(CALL_HISTORY_KEY)) {
      localStorage.setItem(CALL_HISTORY_KEY, JSON.stringify([]));
    }
  }

  // Medicines
  getMedicines(): Medicine[] {
    const data = localStorage.getItem(MEDICINES_KEY);
    // Combine real medicines with generated ones, real medicines first
    return data ? JSON.parse(data) : [...REAL_MEDICINES, ...LARGE_MEDICINE_DATABASE];
  }

  searchMedicines(query: string): Medicine[] {
    const medicines = this.getMedicines();
    if (!query) return medicines;
    
    const lowerQuery = query.toLowerCase();
    return medicines.filter(med => 
      med.name.toLowerCase().includes(lowerQuery) ||
      med.description.toLowerCase().includes(lowerQuery) ||
      med.category.toLowerCase().includes(lowerQuery)
    );
  }

  getMedicineById(id: string): Medicine | undefined {
    return this.getMedicines().find(m => m.id === id);
  }

  // Hospitals
  getHospitals(): Hospital[] {
    const data = localStorage.getItem(HOSPITALS_KEY);
    return data ? JSON.parse(data) : INITIAL_HOSPITALS;
  }

  searchHospitals(query: string, state?: string): Hospital[] {
    let hospitals = this.getHospitals();
    
    if (state) {
      hospitals = hospitals.filter(h => h.state.toLowerCase() === state.toLowerCase());
    }
    
    if (!query) return hospitals;
    
    const lowerQuery = query.toLowerCase();
    return hospitals.filter(h =>
      h.name.toLowerCase().includes(lowerQuery) ||
      h.city.toLowerCase().includes(lowerQuery) ||
      h.address.toLowerCase().includes(lowerQuery) ||
      h.specialties.some(s => s.toLowerCase().includes(lowerQuery))
    );
  }

  // Cart
  getCart(): CartItem[] {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  }

  addToCart(medicine: Medicine, quantity: number = 1): void {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.medicine.id === medicine.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        medicine,
        quantity,
        addedAt: new Date().toISOString(),
      });
    }
    
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  removeFromCart(medicineId: string): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.medicine.id !== medicineId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  updateCartQuantity(medicineId: string, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find(i => i.medicine.id === medicineId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }

  clearCart(): void {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
  }

  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.medicine.price * item.quantity), 0);
  }

  // Orders
  getOrders(): Order[] {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  createOrder(customerName: string, deliveryAddress: string): Order {
    const cart = this.getCart();
    const order: Order = {
      id: crypto.randomUUID(),
      items: cart,
      total: this.getCartTotal(),
      deliveryAddress,
      customerName,
      status: 'pending',
      orderedAt: new Date().toISOString(),
    };
    
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    
    this.clearCart();
    return order;
  }

  updateOrderStatus(orderId: string, status: Order['status']): void {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      if (status === 'delivered') {
        order.deliveredAt = new Date().toISOString();
      }
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  }

  getPendingOrders(): Order[] {
    return this.getOrders().filter(o => o.status === 'pending' || o.status === 'confirmed');
  }

  placeOrder(items: CartItem[], deliveryAddress: string, customerName: string): { success: boolean; message: string; order?: Order } {
    try {
      if (!items || items.length === 0) {
        return { success: false, message: 'Cart is empty' };
      }
      
      if (!deliveryAddress.trim()) {
        return { success: false, message: 'Delivery address is required' };
      }
      
      if (!customerName.trim()) {
        return { success: false, message: 'Customer name is required' };
      }

      const total = items.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
      
      const order: Order = {
        id: crypto.randomUUID(),
        items: items,
        total,
        deliveryAddress,
        customerName,
        status: 'pending',
        orderedAt: new Date().toISOString(),
      };
      
      const orders = this.getOrders();
      orders.unshift(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      
      // Clear cart
      this.clearCart();
      
      // Auto-confirm after 2 seconds
      setTimeout(() => {
        this.updateOrderStatus(order.id, 'confirmed');
      }, 2000);
      
      return { success: true, message: 'Order placed successfully!', order };
    } catch (error) {
      return { success: false, message: 'Failed to place order' };
    }
  }

  // Call History
  getCallHistory(): CallHistory[] {
    const data = localStorage.getItem(CALL_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  }

  addCallHistory(hospital: Hospital): void {
    const history = this.getCallHistory();
    history.unshift({
      id: crypto.randomUUID(),
      hospital,
      calledAt: new Date().toISOString(),
    });
    localStorage.setItem(CALL_HISTORY_KEY, JSON.stringify(history));
  }

  // Clear medicine cache to force reload from database
  clearMedicineCache(): void {
    localStorage.removeItem(MEDICINES_KEY);
  }

  // Get total medicine count
  getMedicineCount(): number {
    return this.getMedicines().length;
  }

  // Notification Read Tracking
  getReadNotifications(): Set<string> {
    const data = localStorage.getItem(NOTIFICATION_READ_KEY);
    return data ? new Set(JSON.parse(data)) : new Set();
  }

  markNotificationAsRead(orderId: string): void {
    const readNotifications = this.getReadNotifications();
    readNotifications.add(orderId);
    localStorage.setItem(NOTIFICATION_READ_KEY, JSON.stringify([...readNotifications]));
  }

  markAllNotificationsAsRead(): void {
    const orders = this.getOrders();
    const allOrderIds = orders.map(o => o.id);
    localStorage.setItem(NOTIFICATION_READ_KEY, JSON.stringify(allOrderIds));
  }

  getUnreadNotificationCount(): number {
    const orders = this.getPendingOrders();
    const readNotifications = this.getReadNotifications();
    return orders.filter(o => !readNotifications.has(o.id)).length;
  }
}

export const appDataService = new AppDataService();
