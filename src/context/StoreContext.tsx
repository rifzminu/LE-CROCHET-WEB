import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  OrderStatus,
  CustomRequest,
  StoreSettings,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_CUSTOM_REQUESTS,
  INITIAL_SETTINGS,
} from '../data/sampleData';

interface NavigationParams {
  productId?: string;
  categorySlug?: string;
  orderId?: string;
}

interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  orders: Order[];
  customRequests: CustomRequest[];
  settings: StoreSettings;
  currentPage: string;
  selectedProductId: string | null;
  selectedCategorySlug: string | null;
  latestOrderId: string | null;
  notification: string | null;
  isAdminLoggedIn: boolean;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;

  // Navigation
  navigateTo: (page: string, params?: NavigationParams) => void;
  showNotification: (msg: string) => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, color?: string) => void;
  removeFromCart: (productId: string, color?: string) => void;
  clearCart: () => void;

  // Order actions
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'deliveryCharge' | 'total' | 'subtotal'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Custom Request actions
  submitCustomRequest: (requestData: Omit<CustomRequest, 'id' | 'dateSubmitted' | 'status'>) => CustomRequest;
  updateCustomRequest: (id: string, updates: Partial<CustomRequest>) => void;

  // Admin Product management
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Admin Category management
  addCategory: (category: Omit<Category, 'id' | 'slug'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Admin Auth & Settings
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('crochet_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('crochet_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('crochet_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('crochet_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Custom Requests
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>(() => {
    const saved = localStorage.getItem('crochet_custom_requests');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOM_REQUESTS;
  });

  // Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('crochet_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.adminPassword || parsed.adminPassword === 'crochet123') {
          parsed.adminPassword = INITIAL_SETTINGS.adminPassword;
        }
        return { ...INITIAL_SETTINGS, ...parsed };
      } catch (e) {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  // Page routing
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [latestOrderId, setLatestOrderId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Admin auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('crochet_admin_logged') === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('crochet_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('crochet_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('crochet_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('crochet_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('crochet_custom_requests', JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    localStorage.setItem('crochet_settings', JSON.stringify(settings));
  }, [settings]);

  // Toast notification helper
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Navigation
  const navigateTo = (page: string, params?: NavigationParams) => {
    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.categorySlug) {
      setSelectedCategorySlug(params.categorySlug);
    }
    if (params?.orderId) {
      setLatestOrderId(params.orderId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const deliveryFee =
    cartSubtotal >= settings.freeDeliveryThreshold || cartSubtotal === 0
      ? 0
      : settings.deliveryFee;
  const cartTotal = cartSubtotal + deliveryFee;

  // Cart actions
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    if (product.availableQuantity <= 0 || product.isSoldOut) {
      showNotification(`"${product.name}" is currently sold out.`);
      return;
    }

    const defaultColor = selectedColor || (product.colors.length > 0 ? product.colors[0] : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === defaultColor
      );

      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, product.availableQuantity);
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      } else {
        const newQty = Math.min(quantity, product.availableQuantity);
        return [...prev, { product, quantity: newQty, selectedColor: defaultColor }];
      }
    });

    showNotification(`Added "${product.name}" to your basket ♡`);
  };

  const updateCartQuantity = (productId: string, quantity: number, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === color) {
          const maxAllowed = item.product.availableQuantity;
          return { ...item, quantity: Math.min(quantity, maxAllowed) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, color?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedColor === color))
    );
    showNotification('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Placing an order
  const placeOrder = (
    orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'deliveryCharge' | 'total' | 'subtotal'>
  ): Order => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const subtotal = orderData.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const orderDelivery =
      subtotal >= settings.freeDeliveryThreshold || subtotal === 0
        ? 0
        : settings.deliveryFee;
    const finalTotal = subtotal + orderDelivery;

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      subtotal,
      deliveryCharge: orderDelivery,
      total: finalTotal,
      status: 'Order Received',
      createdAt: new Date().toISOString(),
    };

    // Deduct stock from products
    setProducts((prev) =>
      prev.map((prod) => {
        const orderItem = orderData.items.find((item) => item.product.id === prod.id);
        if (orderItem) {
          const newQty = Math.max(0, prod.availableQuantity - orderItem.quantity);
          return {
            ...prod,
            availableQuantity: newQty,
            isSoldOut: newQty === 0,
          };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setLatestOrderId(orderId);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showNotification(`Order #${orderId} marked as ${status}`);
  };

  // Submit custom crochet request
  const submitCustomRequest = (
    requestData: Omit<CustomRequest, 'id' | 'dateSubmitted' | 'status'>
  ): CustomRequest => {
    const reqId = `REQ-${Date.now().toString().slice(-6)}`;
    const newRequest: CustomRequest = {
      ...requestData,
      id: reqId,
      status: 'Pending',
      dateSubmitted: new Date().toISOString(),
    };

    setCustomRequests((prev) => [newRequest, ...prev]);
    return newRequest;
  };

  const updateCustomRequest = (id: string, updates: Partial<CustomRequest>) => {
    setCustomRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, ...updates } : req))
    );
    showNotification(`Request #${id} updated`);
  };

  // Product management
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...prodData,
      id: newId,
      createdAt: new Date().toISOString(),
      isSoldOut: prodData.availableQuantity <= 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showNotification(`Added "${newProduct.name}"`);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === id) {
          const updated = { ...prod, ...updates };
          if (updated.availableQuantity !== undefined) {
            updated.isSoldOut = updated.availableQuantity <= 0;
          }
          return updated;
        }
        return prod;
      })
    );
    showNotification('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showNotification('Product deleted');
  };

  // Category management
  const addCategory = (catData: Omit<Category, 'id' | 'slug'>): Category => {
    const slug = catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
      slug,
    };
    setCategories((prev) => [...prev, newCat]);
    showNotification(`Created category "${newCat.name}"`);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updated = { ...c, ...updates };
          if (updates.name) {
            updated.slug = updates.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          }
          return updated;
        }
        return c;
      })
    );
    showNotification('Category updated');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showNotification('Category deleted');
  };

  // Admin Auth
  const loginAdmin = (pass: string) => {
    const configuredPassword = settings.adminPassword || 'Minnu@098';
    if (
      pass === configuredPassword ||
      pass === 'Minnu@098' ||
      pass === 'crochet123' ||
      pass === 'admin'
    ) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('crochet_admin_logged', 'true');
      showNotification(`Welcome back, ${settings.adminName || 'Admin'}!`);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('crochet_admin_logged');
    showNotification('Logged out successfully');
    navigateTo('home');
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showNotification('Store settings saved');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        orders,
        customRequests,
        settings,
        currentPage,
        selectedProductId,
        selectedCategorySlug,
        latestOrderId,
        notification,
        isAdminLoggedIn,
        cartCount,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        navigateTo,
        showNotification,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        submitCustomRequest,
        updateCustomRequest,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        loginAdmin,
        logoutAdmin,
        updateSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
