export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  availableQuantity: number;
  colors: string[];
  details?: string[];
  careInstructions?: string;
  isSoldOut?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type OrderStatus =
  | 'Order Received'
  | 'Confirmed'
  | 'In Progress'
  | 'Ready'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  orderNotes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
}

export type CustomRequestStatus =
  | 'Pending'
  | 'Reviewing'
  | 'Accepted'
  | 'Rejected'
  | 'In Progress'
  | 'Completed';

export interface CustomRequest {
  id: string;
  customerName: string;
  contactNumber: string;
  email?: string;
  requirements: string;
  referenceImage?: string;
  dateSubmitted: string;
  status: CustomRequestStatus;
  finalPrice?: number;
  adminNote?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  instagramHandle: string;
  instagramUrl: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  contactEmail: string;
  contactPhone: string;
  currencySymbol: string;
  adminName?: string;
  adminRole?: string;
  adminEmail?: string;
  adminPhone?: string;
  adminPassword?: string;
  paymentUpiId?: string;
  paymentInstructions?: string;
}
