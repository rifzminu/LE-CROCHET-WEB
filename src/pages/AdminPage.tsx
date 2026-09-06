import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Product,
  Category,
  OrderStatus,
  CustomRequestStatus,
} from '../types';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  DollarSign,
  Upload,
  Eye,
  EyeOff,
  X,
  Lock,
  ArrowLeft,
  Search,
  User,
  Shield,
  Key,
  CreditCard,
  Check,
  Mail,
  Phone,
  RefreshCw,
  Smartphone,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    products,
    categories,
    orders,
    customRequests,
    settings,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateOrderStatus,
    updateCustomRequest,
    updateSettings,
    navigateTo,
    showNotification,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'categories' | 'orders' | 'custom-requests' | 'settings'
  >('overview');

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showDirectSetPassword, setShowDirectSetPassword] = useState(false);
  const [directNewPassword, setDirectNewPassword] = useState('');

  // Settings & Admin details state
  const [showSettingsPassword, setShowSettingsPassword] = useState(false);
  const [adminSettingsForm, setAdminSettingsForm] = useState({
    adminName: settings.adminName || '',
    adminRole: settings.adminRole || '',
    adminEmail: settings.adminEmail || settings.contactEmail || '',
    adminPhone: settings.adminPhone || settings.contactPhone || '',
    adminPassword: settings.adminPassword || 'Minnu@098',
    paymentUpiId: settings.paymentUpiId || '',
    paymentInstructions: settings.paymentInstructions || '',
    storeName: settings.storeName || '',
    tagline: settings.tagline || '',
    instagramHandle: settings.instagramHandle || '',
    instagramUrl: settings.instagramUrl || '',
    deliveryFee: settings.deliveryFee.toString(),
    freeDeliveryThreshold: settings.freeDeliveryThreshold.toString(),
    currencySymbol: settings.currencySymbol || '₹',
  });

  // Keep form in sync with settings
  React.useEffect(() => {
    setAdminSettingsForm({
      adminName: settings.adminName || '',
      adminRole: settings.adminRole || '',
      adminEmail: settings.adminEmail || settings.contactEmail || '',
      adminPhone: settings.adminPhone || settings.contactPhone || '',
      adminPassword: settings.adminPassword || 'Minnu@098',
      paymentUpiId: settings.paymentUpiId || '',
      paymentInstructions: settings.paymentInstructions || '',
      storeName: settings.storeName || '',
      tagline: settings.tagline || '',
      instagramHandle: settings.instagramHandle || '',
      instagramUrl: settings.instagramUrl || '',
      deliveryFee: settings.deliveryFee.toString(),
      freeDeliveryThreshold: settings.freeDeliveryThreshold.toString(),
      currencySymbol: settings.currencySymbol || '₹',
    });
  }, [settings]);

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    availableQuantity: '10',
    colors: 'Rose Pink, Cream, Sage Green',
    images: 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=800&q=80',
    details: 'Handmade with 100% Cotton Yarn, Washable',
    careInstructions: 'Spot clean gently with cold water',
    isFeatured: false,
    isPopular: false,
    isNewArrival: true,
  });

  // Category modal / input state
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImg, setNewCatImg] = useState('');

  // Custom request active inspect
  const [inspectRequest, setInspectRequest] = useState<any>(null);
  const [finalPriceInput, setFinalPriceInput] = useState('');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Search in orders / products
  const [adminSearch, setAdminSearch] = useState('');

  // Handle Admin Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (!success) {
      setLoginError(
        `Incorrect passcode. Please check your password, or click 'Change Admin Password' below to set a new one.`
      );
    } else {
      setLoginError('');
      setPasswordInput('');
    }
  };

  const handleResetPasswordToDefault = () => {
    updateSettings({ adminPassword: 'Minnu@098' });
    setPasswordInput('Minnu@098');
    setLoginError('');
    showNotification('Password set to: Minnu@098');
  };

  const handleSaveDirectNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = directNewPassword.trim();
    if (!clean) return;
    updateSettings({ adminPassword: clean });
    setDirectNewPassword('');
    setShowDirectSetPassword(false);
    loginAdmin(clean);
    showNotification(`Admin password changed and logged in!`);
  };

  // If not logged in, show Login Screen
  if (!isAdminLoggedIn) {
    const activePass = settings.adminPassword || 'Minnu@098';

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8F3EA]">
        <div className="max-w-md w-full bg-[#E8DCCB] rounded-3xl border border-[#C7A98A] p-7 sm:p-9 space-y-6 shadow-xl">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#5A3E2B] text-[#F8F3EA] flex items-center justify-center mx-auto shadow-md">
              <Shield className="w-8 h-8 text-[#C7A98A]" />
            </div>
            <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#3B2920]">
              Store Admin Portal
            </h1>
            <p className="text-xs text-[#5A3E2B]/85 leading-relaxed">
              Manage your crochet products, inventory, orders, custom commissions, and business details.
            </p>
          </div>

          {/* Quick Change Password Box */}
          {showDirectSetPassword ? (
            <form
              onSubmit={handleSaveDirectNewPassword}
              className="bg-[#F8F3EA] rounded-2xl border border-[#C7A98A] p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#3B2920] uppercase flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#A67C52]" />
                  Set New Admin Password
                </span>
                <button
                  type="button"
                  onClick={() => setShowDirectSetPassword(false)}
                  className="text-xs text-[#5A3E2B] hover:text-[#3B2920] underline"
                >
                  Cancel
                </button>
              </div>
              <p className="text-[11px] text-[#5A3E2B]/80 leading-tight">
                Enter your desired custom password below. It will be saved immediately:
              </p>
              <input
                type="text"
                required
                value={directNewPassword}
                onChange={(e) => setDirectNewPassword(e.target.value)}
                placeholder="e.g. Minnu@098 or your custom password"
                className="w-full bg-white border border-[#C7A98A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920] focus:outline-none focus:border-[#5A3E2B]"
              />
              <button
                type="submit"
                className="w-full bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Save New Password & Log In
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-100 text-red-800 text-xs rounded-xl border border-red-200 leading-relaxed">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                  Admin Password / Passcode
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder={`Enter password (e.g. ${activePass})`}
                    className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl pl-4 pr-11 py-3 text-sm text-[#3B2920] focus:outline-none focus:border-[#5A3E2B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A3E2B]/70 hover:text-[#3B2920] p-1"
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between mt-2.5 gap-2 text-[11px] text-[#5A3E2B]/85">
                  <div className="flex items-center gap-1.5">
                    <span>Active:</span>
                    <code className="font-bold text-[#3B2920] bg-[#F8F3EA] px-2 py-0.5 rounded border border-[#C7A98A]/60">
                      {activePass}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPasswordInput(activePass)}
                    className="text-[#5A3E2B] hover:text-[#3B2920] font-bold underline cursor-pointer bg-[#F8F3EA]/70 px-2 py-0.5 rounded"
                  >
                    Quick Fill Password
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#C7A98A]" />
                <span>Log Into Admin Dashboard</span>
              </button>

              <div className="pt-2 flex items-center justify-between text-xs text-[#5A3E2B]/80 border-t border-[#C7A98A]/40">
                <button
                  type="button"
                  onClick={() => setShowDirectSetPassword(true)}
                  className="hover:text-[#3B2920] underline font-semibold text-[11px] flex items-center gap-1"
                >
                  <Key className="w-3 h-3 text-[#A67C52]" />
                  <span>Change Password</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-1 hover:text-[#3B2920] underline font-medium text-[11px]"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Customer Store</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Helper to open edit product modal
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProdForm({
      name: prod.name,
      price: prod.price.toString(),
      description: prod.description,
      category: prod.category,
      availableQuantity: prod.availableQuantity.toString(),
      colors: prod.colors.join(', '),
      images: prod.images.join(', '),
      details: prod.details ? prod.details.join(', ') : '',
      careInstructions: prod.careInstructions || '',
      isFeatured: !!prod.isFeatured,
      isPopular: !!prod.isPopular,
      isNewArrival: !!prod.isNewArrival,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdForm({
      name: '',
      price: '',
      description: '',
      category: categories.length > 0 ? categories[0].name : 'Crochet Flowers',
      availableQuantity: '10',
      colors: 'Peach, Cream, Mint',
      images: 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=800&q=80',
      details: 'Handmade with 100% Milk Cotton, Ultra-soft',
      careInstructions: 'Spot clean with mild soap',
      isFeatured: false,
      isPopular: false,
      isNewArrival: true,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(prodForm.price) || 0;
    const qtyNum = parseInt(prodForm.availableQuantity, 10) || 0;

    const imagesArray = prodForm.images
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean);

    const colorsArray = prodForm.colors
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const detailsArray = prodForm.details
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: prodForm.name,
        price: priceNum,
        description: prodForm.description,
        category: prodForm.category,
        availableQuantity: qtyNum,
        colors: colorsArray,
        images: imagesArray,
        details: detailsArray,
        careInstructions: prodForm.careInstructions,
        isFeatured: prodForm.isFeatured,
        isPopular: prodForm.isPopular,
        isNewArrival: prodForm.isNewArrival,
      });
    } else {
      addProduct({
        name: prodForm.name,
        price: priceNum,
        description: prodForm.description,
        category: prodForm.category,
        availableQuantity: qtyNum,
        colors: colorsArray,
        images: imagesArray,
        details: detailsArray,
        careInstructions: prodForm.careInstructions,
        isFeatured: prodForm.isFeatured,
        isPopular: prodForm.isPopular,
        isNewArrival: prodForm.isNewArrival,
      });
    }

    setIsProductModalOpen(false);
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status === 'Order Received' || o.status === 'In Progress'
  ).length;
  const completedOrders = orders.filter((o) => o.status === 'Delivered').length;
  const totalCustomRequests = customRequests.length;
  const pendingCustom = customRequests.filter((r) => r.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#F8F3EA] text-[#3B2920] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#3B2920] text-[#F8F3EA] p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#5A3E2B]">
            <div>
              <span className="font-serif-heading text-xl font-bold tracking-tight text-[#F8F3EA]">
                {settings.storeName}
              </span>
              <p className="text-[10px] uppercase tracking-widest text-[#C7A98A]">
                Admin Dashboard
              </p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#5A3E2B] text-[#F8F3EA] font-semibold'
                  : 'text-[#E8DCCB]/80 hover:bg-[#5A3E2B]/50 hover:text-[#F8F3EA]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#A67C52]" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#5A3E2B] text-[#F8F3EA] font-semibold'
                  : 'text-[#E8DCCB]/80 hover:bg-[#5A3E2B]/50 hover:text-[#F8F3EA]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-[#A67C52]" />
                <span>Products</span>
              </div>
              <span className="bg-[#5A3E2B] px-2 py-0.5 rounded-full text-[10px] text-[#C7A98A]">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-[#5A3E2B] text-[#F8F3EA] font-semibold'
                  : 'text-[#E8DCCB]/80 hover:bg-[#5A3E2B]/50 hover:text-[#F8F3EA]'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderTree className="w-4 h-4 text-[#A67C52]" />
                <span>Categories</span>
              </div>
              <span className="bg-[#5A3E2B] px-2 py-0.5 rounded-full text-[10px] text-[#C7A98A]">
                {categories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#5A3E2B] text-[#F8F3EA] font-semibold'
                  : 'text-[#E8DCCB]/80 hover:bg-[#5A3E2B]/50 hover:text-[#F8F3EA]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-[#A67C52]" />
                <span>Orders</span>
              </div>
              {pendingOrders > 0 && (
                <span className="bg-[#A67C52] text-[#F8F3EA] px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {pendingOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('custom-requests')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'custom-requests'
                  ? 'bg-[#5A3E2B] text-[#F8F3EA] font-semibold'
                  : 'text-[#E8DCCB]/80 hover:bg-[#5A3E2B]/50 hover:text-[#F8F3EA]'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#A67C52]" />
                <span>Custom Requests</span>
              </div>
              {pendingCustom > 0 && (
                <span className="bg-[#A67C52] text-[#F8F3EA] px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {pendingCustom}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#5A3E2B] text-[#F8F3EA] font-semibold'
                  : 'text-[#E8DCCB]/80 hover:bg-[#5A3E2B]/50 hover:text-[#F8F3EA]'
              }`}
            >
              <Settings className="w-4 h-4 text-[#A67C52]" />
              <span>Admin Details & Settings</span>
            </button>
          </nav>
        </div>

        {/* Store Owner / Admin Profile Pill */}
        <div className="pt-4 border-t border-[#5A3E2B] space-y-3 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className="w-full text-left p-3 bg-[#5A3E2B]/40 hover:bg-[#5A3E2B]/80 rounded-2xl border border-[#C7A98A]/30 cursor-pointer transition-all flex items-center gap-3"
            title="Click to edit admin details and settings"
          >
            <div className="w-8 h-8 rounded-full bg-[#A67C52] text-[#F8F3EA] font-bold flex items-center justify-center shrink-0 shadow-xs text-xs">
              {(settings.adminName || 'A').slice(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="font-bold text-[#F8F3EA] truncate text-xs">
                {settings.adminName || 'Admin'}
              </p>
              <p className="text-[10px] text-[#C7A98A] truncate">
                {settings.adminRole || 'Store Owner & Artisan'}
              </p>
            </div>
            <Shield className="w-3.5 h-3.5 text-[#C7A98A] shrink-0" />
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="w-full flex items-center gap-2 px-3 py-2 text-[#C7A98A] hover:text-[#F8F3EA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Customer Website</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-300 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto max-w-6xl">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif-heading text-3xl font-bold text-[#3B2920]">
                  Dashboard Overview
                </h1>
                <p className="text-xs text-[#5A3E2B]/80 mt-0.5">
                  Real-time status of products, orders, and customer requests
                </p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#E8DCCB] p-5 rounded-2xl border border-[#C7A98A] space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#A67C52]">
                  Total Products
                </span>
                <p className="text-3xl font-bold text-[#3B2920]">{totalProducts}</p>
                <p className="text-[11px] text-[#5A3E2B]/70">Live in catalog</p>
              </div>

              <div className="bg-[#E8DCCB] p-5 rounded-2xl border border-[#C7A98A] space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#A67C52]">
                  Total Orders
                </span>
                <p className="text-3xl font-bold text-[#3B2920]">{totalOrders}</p>
                <p className="text-[11px] text-[#5A3E2B]/70">{completedOrders} delivered</p>
              </div>

              <div className="bg-[#E8DCCB] p-5 rounded-2xl border border-[#C7A98A] space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#A67C52]">
                  Pending Orders
                </span>
                <p className="text-3xl font-bold text-[#A67C52]">{pendingOrders}</p>
                <p className="text-[11px] text-[#5A3E2B]/70">Need action / shipping</p>
              </div>

              <div className="bg-[#E8DCCB] p-5 rounded-2xl border border-[#C7A98A] space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#A67C52]">
                  Custom Requests
                </span>
                <p className="text-3xl font-bold text-[#5A3E2B]">{totalCustomRequests}</p>
                <p className="text-[11px] text-[#5A3E2B]/70">{pendingCustom} pending quotes</p>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="font-serif-heading text-xl font-bold text-[#3B2920]">
                  Recent Orders
                </h2>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#A67C52] hover:underline font-semibold"
                >
                  View All ({orders.length})
                </button>
              </div>

              <div className="divide-y divide-[#E8DCCB]">
                {orders.slice(0, 4).map((order) => (
                  <div key={order.id} className="py-3 flex items-center justify-between text-xs gap-4">
                    <div>
                      <span className="font-bold text-[#3B2920]">#{order.id}</span>
                      <p className="text-[#5A3E2B]">{order.customerName} • {order.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#3B2920] block">
                        {settings.currencySymbol}{order.total.toFixed(2)}
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E8DCCB] text-[#5A3E2B]">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif-heading text-3xl font-bold text-[#3B2920]">
                  Product Management
                </h1>
                <p className="text-xs text-[#5A3E2B]/80 mt-0.5">
                  Add, edit, mark sold-out, or remove crochet items
                </p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Table / Cards */}
            <div className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#5A3E2B]">
                  <thead className="bg-[#E8DCCB] text-[#3B2920] font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Item</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DCCB]">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#E8DCCB]/20 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img
                            src={prod.images[0] || 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=100&q=80'}
                            alt={prod.name}
                            className="w-10 h-10 rounded-lg object-cover bg-[#E8DCCB]"
                          />
                          <div>
                            <span className="font-bold text-[#3B2920] text-sm block">{prod.name}</span>
                            <span className="text-[10px] text-[#A67C52]">{prod.colors.join(', ')}</span>
                          </div>
                        </td>
                        <td className="p-4">{prod.category}</td>
                        <td className="p-4 font-bold text-[#3B2920]">
                          {settings.currencySymbol}{prod.price.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            min="0"
                            value={prod.availableQuantity}
                            onChange={(e) =>
                              updateProduct(prod.id, {
                                availableQuantity: parseInt(e.target.value, 10) || 0,
                              })
                            }
                            className="w-16 bg-[#F8F3EA] border border-[#C7A98A] rounded-lg px-2 py-1 text-center font-bold text-[#3B2920]"
                          />
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() =>
                              updateProduct(prod.id, { isSoldOut: !prod.isSoldOut })
                            }
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer ${
                              prod.isSoldOut || prod.availableQuantity <= 0
                                ? 'bg-red-100 text-red-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {prod.isSoldOut || prod.availableQuantity <= 0 ? 'Sold Out' : 'Available'}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            className="p-1.5 text-[#5A3E2B] hover:text-[#A67C52]"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${prod.name}" permanently?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            className="p-1.5 text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif-heading text-3xl font-bold text-[#3B2920]">
                  Category Management
                </h1>
                <p className="text-xs text-[#5A3E2B]/80 mt-0.5">
                  Create, rename, or delete store categories
                </p>
              </div>
            </div>

            {/* Add Category Form */}
            <div className="bg-[#E8DCCB] p-6 rounded-3xl border border-[#C7A98A] space-y-4">
              <h2 className="font-serif-heading text-lg font-bold text-[#3B2920]">
                Add New Category
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Category Name (e.g. Coasters)"
                  className="bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs text-[#3B2920]"
                />
                <input
                  type="text"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Short Description"
                  className="bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs text-[#3B2920]"
                />
                <input
                  type="text"
                  value={newCatImg}
                  onChange={(e) => setNewCatImg(e.target.value)}
                  placeholder="Photo URL"
                  className="bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs text-[#3B2920]"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (newCatName.trim()) {
                    addCategory({
                      name: newCatName.trim(),
                      description: newCatDesc.trim() || undefined,
                      image: newCatImg.trim() || undefined,
                    });
                    setNewCatName('');
                    setNewCatDesc('');
                    setNewCatImg('');
                  }
                }}
                className="bg-[#5A3E2B] text-[#F8F3EA] px-5 py-2 rounded-full text-xs font-semibold hover:bg-[#A67C52] transition-colors cursor-pointer"
              >
                Create Category
              </button>
            </div>

            {/* List Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-[#F8F3EA] p-4 rounded-2xl border border-[#E8DCCB] flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cat.image || 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=100&q=80'}
                      alt={cat.name}
                      className="w-12 h-12 rounded-xl object-cover bg-[#E8DCCB]"
                    />
                    <div>
                      <p className="font-bold text-[#3B2920] text-sm">{cat.name}</p>
                      <p className="text-[11px] text-[#5A3E2B]/70">{cat.description || cat.slug}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const newName = prompt('Rename category to:', cat.name);
                        if (newName && newName.trim()) {
                          updateCategory(cat.id, { name: newName.trim() });
                        }
                      }}
                      className="p-1.5 text-[#5A3E2B] hover:text-[#A67C52]"
                      title="Rename"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete category "${cat.name}"?`)) {
                          deleteCategory(cat.id);
                        }
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-serif-heading text-3xl font-bold text-[#3B2920]">
                Customer Orders
              </h1>
              <p className="text-xs text-[#5A3E2B]/80 mt-0.5">
                Review incoming customer orders, shipping addresses, and advance order status
              </p>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-5 sm:p-6 space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DCCB] pb-3">
                    <div>
                      <span className="font-bold text-[#3B2920] text-base">Order #{order.id}</span>
                      <span className="text-xs text-[#A67C52] ml-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <label htmlFor={`status-select-${order.id}`} className="text-xs font-semibold text-[#5A3E2B]">Status:</label>
                      <select
                        id={`status-select-${order.id}`}
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className="bg-[#E8DCCB] border border-[#C7A98A] rounded-xl px-3 py-1 text-xs font-bold text-[#3B2920] cursor-pointer"
                      >
                        <option value="Order Received">Order Received</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Ready">Ready</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#5A3E2B]">
                    <div>
                      <p><strong className="text-[#3B2920]">Customer:</strong> {order.customerName}</p>
                      <p><strong className="text-[#3B2920]">Phone:</strong> {order.phone}</p>
                      {order.email && <p><strong className="text-[#3B2920]">Email:</strong> {order.email}</p>}
                      <p className="mt-1">
                        <strong className="text-[#3B2920]">Address:</strong> {order.address}, {order.city}, {order.state} {order.pincode}
                      </p>
                      {order.orderNotes && (
                        <p className="mt-1 italic bg-[#E8DCCB]/40 p-2 rounded-lg">
                          "{order.orderNotes}"
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-[#3B2920]">Ordered Items:</p>
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between border-b border-[#E8DCCB]/40 pb-1">
                          <span>{it.quantity}x {it.product.name} {it.selectedColor && `(${it.selectedColor})`}</span>
                          <span>{settings.currencySymbol}{(it.product.price * it.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold text-[#3B2920] pt-1">
                        <span>Total (incl. {settings.currencySymbol}{order.deliveryCharge} delivery):</span>
                        <span>{settings.currencySymbol}{order.total.toFixed(2)}</span>
                      </div>
                      <p className="text-[10px] text-[#A67C52]">Method: {order.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOM REQUESTS */}
        {activeTab === 'custom-requests' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-serif-heading text-3xl font-bold text-[#3B2920]">
                Custom Requests
              </h1>
              <p className="text-xs text-[#5A3E2B]/80 mt-0.5">
                Manage custom customer inquiries, quote final prices, and send administrative notes
              </p>
            </div>

            <div className="space-y-4">
              {customRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-5 sm:p-6 space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DCCB] pb-3">
                    <div>
                      <span className="font-bold text-[#3B2920] text-base">Request #{req.id}</span>
                      <span className="text-xs text-[#A67C52] ml-2">
                        {new Date(req.dateSubmitted).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <label htmlFor={`custom-status-select-${req.id}`} className="text-xs font-semibold text-[#5A3E2B]">Status:</label>
                      <select
                        id={`custom-status-select-${req.id}`}
                        value={req.status}
                        onChange={(e) =>
                          updateCustomRequest(req.id, {
                            status: e.target.value as CustomRequestStatus,
                          })
                        }
                        className="bg-[#E8DCCB] border border-[#C7A98A] rounded-xl px-3 py-1 text-xs font-bold text-[#3B2920] cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs text-[#5A3E2B]">
                    <div className="md:col-span-8 space-y-2">
                      <p><strong className="text-[#3B2920]">Customer:</strong> {req.customerName}</p>
                      <p><strong className="text-[#3B2920]">Contact:</strong> {req.contactNumber} {req.email && `• ${req.email}`}</p>
                      <div className="bg-[#E8DCCB]/40 p-3.5 rounded-2xl border border-[#C7A98A]/30">
                        <p className="font-bold text-[#3B2920] mb-1">Customer Requirements:</p>
                        <p className="leading-relaxed whitespace-pre-wrap">{req.requirements}</p>
                      </div>

                      {/* Admin Note & Final Price */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[11px] font-bold text-[#3B2920] uppercase mb-1">
                            Set Final Price ({settings.currencySymbol})
                          </label>
                          <input
                            type="number"
                            placeholder="e.g. 45"
                            defaultValue={req.finalPrice || ''}
                            onBlur={(e) => {
                              const val = parseFloat(e.target.value);
                              if (!isNaN(val)) {
                                updateCustomRequest(req.id, { finalPrice: val });
                              }
                            }}
                            className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3 py-1.5 text-xs text-[#3B2920]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#3B2920] uppercase mb-1">
                            Admin Internal Note
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Needs baby yellow yarn"
                            defaultValue={req.adminNote || ''}
                            onBlur={(e) => {
                              updateCustomRequest(req.id, { adminNote: e.target.value });
                            }}
                            className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3 py-1.5 text-xs text-[#3B2920]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Reference Image */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-2 bg-[#E8DCCB]/30 rounded-2xl border border-[#E8DCCB]">
                      {req.referenceImage ? (
                        <div className="space-y-1 text-center">
                          <img
                            src={req.referenceImage}
                            alt="Reference"
                            className="w-32 h-32 object-cover rounded-xl border border-[#C7A98A] shadow-xs"
                          />
                          <span className="text-[10px] text-[#A67C52] font-semibold">
                            Customer Reference Photo
                          </span>
                        </div>
                      ) : (
                        <p className="text-[11px] text-[#5A3E2B]/60 italic">
                          No reference image attached
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS & ADMIN DETAILS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif-heading text-3xl font-bold text-[#3B2920]">
                  Admin Details & Store Settings
                </h1>
                <p className="text-xs text-[#5A3E2B]/80 mt-0.5">
                  Update your owner profile, admin login password, contact information, and payment options.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  updateSettings({
                    adminName: adminSettingsForm.adminName.trim() || 'Store Owner',
                    adminRole: adminSettingsForm.adminRole.trim() || 'Artisan & Admin',
                    adminEmail: adminSettingsForm.adminEmail.trim() || settings.contactEmail,
                    adminPhone: adminSettingsForm.adminPhone.trim() || settings.contactPhone,
                    adminPassword: adminSettingsForm.adminPassword.trim() || 'crochet123',
                    paymentUpiId: adminSettingsForm.paymentUpiId.trim(),
                    paymentInstructions: adminSettingsForm.paymentInstructions.trim(),
                    storeName: adminSettingsForm.storeName.trim() || 'MY CROCHET STORE',
                    tagline: adminSettingsForm.tagline.trim(),
                    instagramHandle: adminSettingsForm.instagramHandle.trim().replace(/^@/, ''),
                    instagramUrl: adminSettingsForm.instagramUrl.trim(),
                    deliveryFee: parseFloat(adminSettingsForm.deliveryFee) || 0,
                    freeDeliveryThreshold: parseFloat(adminSettingsForm.freeDeliveryThreshold) || 0,
                    currencySymbol: adminSettingsForm.currencySymbol.trim() || '$',
                  });
                  showNotification('All Admin details and settings saved!');
                }}
                className="bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer self-start sm:self-auto transition-colors"
              >
                <Check className="w-4 h-4 text-[#C7A98A]" />
                <span>Save All Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CARD 1: STORE OWNER / ADMIN PROFILE */}
              <div className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-3 border-b border-[#E8DCCB] pb-3">
                  <div className="w-10 h-10 rounded-full bg-[#5A3E2B] text-[#F8F3EA] flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-[#C7A98A]" />
                  </div>
                  <div>
                    <h2 className="font-serif-heading text-lg font-bold text-[#3B2920]">
                      Store Owner / Admin Details
                    </h2>
                    <p className="text-[11px] text-[#5A3E2B]/75">
                      Your personal identity, title, and public contact information
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                      Admin / Owner Full Name
                    </label>
                    <input
                      type="text"
                      value={adminSettingsForm.adminName}
                      onChange={(e) =>
                        setAdminSettingsForm({ ...adminSettingsForm, adminName: e.target.value })
                      }
                      onBlur={() => updateSettings({ adminName: adminSettingsForm.adminName })}
                      placeholder="e.g. Aria Chen"
                      className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={adminSettingsForm.adminRole}
                      onChange={(e) =>
                        setAdminSettingsForm({ ...adminSettingsForm, adminRole: e.target.value })
                      }
                      onBlur={() => updateSettings({ adminRole: adminSettingsForm.adminRole })}
                      placeholder="e.g. Founder & Crochet Artisan"
                      className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#3B2920] uppercase mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#A67C52]" />
                      <span>Admin Contact Email</span>
                    </label>
                    <input
                      type="email"
                      value={adminSettingsForm.adminEmail}
                      onChange={(e) =>
                        setAdminSettingsForm({ ...adminSettingsForm, adminEmail: e.target.value })
                      }
                      onBlur={() => {
                        updateSettings({
                          adminEmail: adminSettingsForm.adminEmail,
                          contactEmail: adminSettingsForm.adminEmail,
                        });
                      }}
                      placeholder="e.g. admin@crochetstore.com"
                      className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#3B2920] uppercase mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#A67C52]" />
                      <span>Admin Phone / WhatsApp</span>
                    </label>
                    <input
                      type="tel"
                      value={adminSettingsForm.adminPhone}
                      onChange={(e) =>
                        setAdminSettingsForm({ ...adminSettingsForm, adminPhone: e.target.value })
                      }
                      onBlur={() => {
                        updateSettings({
                          adminPhone: adminSettingsForm.adminPhone,
                          contactPhone: adminSettingsForm.adminPhone,
                        });
                      }}
                      placeholder="e.g. +1 (555) 234-5678"
                      className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920]"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: ADMIN SECURITY & PASSCODE */}
              <div className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-3 border-b border-[#E8DCCB] pb-3">
                  <div className="w-10 h-10 rounded-full bg-[#5A3E2B] text-[#F8F3EA] flex items-center justify-center shrink-0">
                    <Key className="w-5 h-5 text-[#C7A98A]" />
                  </div>
                  <div>
                    <h2 className="font-serif-heading text-lg font-bold text-[#3B2920]">
                      Admin Security & Password
                    </h2>
                    <p className="text-[11px] text-[#5A3E2B]/75">
                      Passcode required to access the admin dashboard
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                      Admin Password
                    </label>
                    <div className="relative">
                      <input
                        type={showSettingsPassword ? 'text' : 'password'}
                        value={adminSettingsForm.adminPassword}
                        onChange={(e) =>
                          setAdminSettingsForm({
                            ...adminSettingsForm,
                            adminPassword: e.target.value,
                          })
                        }
                        placeholder="Enter your custom admin passcode"
                        className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-[#3B2920]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSettingsPassword(!showSettingsPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A3E2B]/70 hover:text-[#3B2920] p-1"
                        aria-label="Toggle password visibility"
                      >
                        {showSettingsPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newPass = adminSettingsForm.adminPassword.trim() || 'Minnu@098';
                        updateSettings({
                          adminPassword: newPass,
                        });
                        showNotification(`Admin password updated to "${newPass}"!`);
                      }}
                      className="bg-[#5A3E2B] text-[#F8F3EA] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#A67C52] transition-colors cursor-pointer"
                    >
                      Update Password
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAdminSettingsForm({
                          ...adminSettingsForm,
                          adminPassword: 'Minnu@098',
                        });
                        updateSettings({ adminPassword: 'Minnu@098' });
                        showNotification('Password set to: Minnu@098');
                      }}
                      className="bg-[#E8DCCB] text-[#3B2920] border border-[#C7A98A] px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-[#C7A98A]/40 transition-colors cursor-pointer"
                    >
                      Set to Minnu@098
                    </button>
                  </div>

                  <div className="p-3 bg-[#E8DCCB]/40 rounded-xl border border-[#C7A98A]/30 text-[11px] text-[#5A3E2B] leading-relaxed">
                    <p className="font-semibold text-[#3B2920] mb-0.5">Quick Login Notes:</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>You can log in anytime by clicking the <strong>Admin</strong> button in the website header or footer.</li>
                      <li>Current password: <code className="bg-[#F8F3EA] px-1.5 py-0.5 rounded font-bold text-[#3B2920]">{settings.adminPassword || 'Minnu@098'}</code></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CARD 3: PAYMENTS & UPI ACCEPTANCE */}
              <div className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-3 border-b border-[#E8DCCB] pb-3">
                  <div className="w-10 h-10 rounded-full bg-[#5A3E2B] text-[#F8F3EA] flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-[#C7A98A]" />
                  </div>
                  <div>
                    <h2 className="font-serif-heading text-lg font-bold text-[#3B2920]">
                      Payments & Order Receiving
                    </h2>
                    <p className="text-[11px] text-[#5A3E2B]/75">
                      Configure your UPI ID, currency, and payment guidelines
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#3B2920] uppercase mb-1 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#A67C52]" />
                      <span>Admin UPI ID (GPay / PhonePe / Paytm / BHIM)</span>
                    </label>
                    <input
                      type="text"
                      value={adminSettingsForm.paymentUpiId}
                      onChange={(e) =>
                        setAdminSettingsForm({
                          ...adminSettingsForm,
                          paymentUpiId: e.target.value,
                        })
                      }
                      onBlur={() => updateSettings({ paymentUpiId: adminSettingsForm.paymentUpiId })}
                      placeholder="e.g. crochetcraft@upi or 9876543210@paytm"
                      className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                      Payment Instructions for Customers
                    </label>
                    <textarea
                      rows={2}
                      value={adminSettingsForm.paymentInstructions}
                      onChange={(e) =>
                        setAdminSettingsForm({
                          ...adminSettingsForm,
                          paymentInstructions: e.target.value,
                        })
                      }
                      onBlur={() =>
                        updateSettings({ paymentInstructions: adminSettingsForm.paymentInstructions })
                      }
                      placeholder="e.g. Scan QR or transfer to UPI ID and send screenshot on WhatsApp"
                      className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl p-3 text-xs text-[#3B2920]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                      Store Currency Symbol
                    </label>
                    <input
                      type="text"
                      value={adminSettingsForm.currencySymbol}
                      onChange={(e) =>
                        setAdminSettingsForm({
                          ...adminSettingsForm,
                          currencySymbol: e.target.value,
                        })
                      }
                      onBlur={() => updateSettings({ currencySymbol: adminSettingsForm.currencySymbol })}
                      placeholder=" ₹ "
                      className="w-24 bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#3B2920]"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 4: STORE BRANDING & DELIVERY RATES */}
              <div className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-3 border-b border-[#E8DCCB] pb-3">
                  <div className="w-10 h-10 rounded-full bg-[#5A3E2B] text-[#F8F3EA] flex items-center justify-center shrink-0">
                    <Settings className="w-5 h-5 text-[#C7A98A]" />
                  </div>
                  <div>
                    <h2 className="font-serif-heading text-lg font-bold text-[#3B2920]">
                      Store Branding & Delivery Charges
                    </h2>
                    <p className="text-[11px] text-[#5A3E2B]/75">
                      Store name, Instagram links, and customer shipping rules
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                      Brand / Store Name
                    </label>
                    <input
                      type="text"
                      value={adminSettingsForm.storeName}
                      onChange={(e) =>
                        setAdminSettingsForm({ ...adminSettingsForm, storeName: e.target.value })
                      }
                      onBlur={() => updateSettings({ storeName: adminSettingsForm.storeName })}
                      className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                      Store Tagline / Bio
                    </label>
                    <input
                      type="text"
                      value={adminSettingsForm.tagline}
                      onChange={(e) =>
                        setAdminSettingsForm({ ...adminSettingsForm, tagline: e.target.value })
                      }
                      onBlur={() => updateSettings({ tagline: adminSettingsForm.tagline })}
                      placeholder="e.g. Handmade with love • Little things, made beautifully"
                      className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                        Instagram Handle
                      </label>
                      <input
                        type="text"
                        value={adminSettingsForm.instagramHandle}
                        onChange={(e) =>
                          setAdminSettingsForm({
                            ...adminSettingsForm,
                            instagramHandle: e.target.value,
                          })
                        }
                        onBlur={() =>
                          updateSettings({
                            instagramHandle: adminSettingsForm.instagramHandle.replace(/^@/, ''),
                          })
                        }
                        placeholder="leh_crochet___"
                        className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                        Instagram URL
                      </label>
                      <input
                        type="text"
                        value={adminSettingsForm.instagramUrl}
                        onChange={(e) =>
                          setAdminSettingsForm({
                            ...adminSettingsForm,
                            instagramUrl: e.target.value,
                          })
                        }
                        onBlur={() => updateSettings({ instagramUrl: adminSettingsForm.instagramUrl })}
                        placeholder="https://instagram.com/..."
                        className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                        Currency
                      </label>
                      <select
                        value={adminSettingsForm.currencySymbol}
                        onChange={(e) => {
                          const val = e.target.value;
                          setAdminSettingsForm({
                            ...adminSettingsForm,
                            currencySymbol: val,
                          });
                          updateSettings({ currencySymbol: val });
                        }}
                        className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920]"
                      >
                        <option value="₹">₹ (INR - Indian Rupee)</option>
                        <option value="$">$ (USD)</option>
                        <option value="€">€ (EUR)</option>
                        <option value="£">£ (GBP)</option>
                        <option value="AED">AED</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                        Delivery Fee ({adminSettingsForm.currencySymbol})
                      </label>
                      <input
                        type="number"
                        value={adminSettingsForm.deliveryFee}
                        onChange={(e) =>
                          setAdminSettingsForm({
                            ...adminSettingsForm,
                            deliveryFee: e.target.value,
                          })
                        }
                        onBlur={() =>
                          updateSettings({
                            deliveryFee: parseFloat(adminSettingsForm.deliveryFee) || 0,
                          })
                        }
                        className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                        Free Delivery At ({adminSettingsForm.currencySymbol})
                      </label>
                      <input
                        type="number"
                        value={adminSettingsForm.freeDeliveryThreshold}
                        onChange={(e) =>
                          setAdminSettingsForm({
                            ...adminSettingsForm,
                            freeDeliveryThreshold: e.target.value,
                          })
                        }
                        onBlur={() =>
                          updateSettings({
                            freeDeliveryThreshold:
                              parseFloat(adminSettingsForm.freeDeliveryThreshold) || 0,
                          })
                        }
                        className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#E8DCCB]/50 rounded-2xl border border-[#C7A98A]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5A3E2B]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A67C52]" />
                <span>All changes auto-save when clicking outside any field or clicking "Save All Changes".</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateSettings({
                    adminName: adminSettingsForm.adminName.trim() || 'Store Owner',
                    adminRole: adminSettingsForm.adminRole.trim() || 'Artisan & Admin',
                    adminEmail: adminSettingsForm.adminEmail.trim() || settings.contactEmail,
                    adminPhone: adminSettingsForm.adminPhone.trim() || settings.contactPhone,
                    adminPassword: adminSettingsForm.adminPassword.trim() || 'Minnu@098',
                    paymentUpiId: adminSettingsForm.paymentUpiId.trim(),
                    paymentInstructions: adminSettingsForm.paymentInstructions.trim(),
                    storeName: adminSettingsForm.storeName.trim() || 'LEH_CROCHET',
                    tagline: adminSettingsForm.tagline.trim(),
                    instagramHandle: adminSettingsForm.instagramHandle.trim().replace(/^@/, ''),
                    instagramUrl: adminSettingsForm.instagramUrl.trim(),
                    deliveryFee: parseFloat(adminSettingsForm.deliveryFee) || 0,
                    freeDeliveryThreshold: parseFloat(adminSettingsForm.freeDeliveryThreshold) || 0,
                    currencySymbol: adminSettingsForm.currencySymbol.trim() || '₹',
                  });
                  showNotification('All Admin details and settings saved!');
                }}
                className="bg-[#5A3E2B] text-[#F8F3EA] px-4 py-1.5 rounded-full font-semibold hover:bg-[#A67C52] transition-colors cursor-pointer"
              >
                Save All Changes
              </button>
            </div>
          </div>
        )}
      </main>

      {/* PRODUCT ADD/EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3B2920]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F8F3EA] rounded-3xl border border-[#C7A98A] w-full max-w-xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-3">
              <h2 className="font-serif-heading text-2xl font-bold text-[#3B2920]">
                {editingProductId ? 'Edit Crochet Product' : 'Add New Crochet Product'}
              </h2>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-[#5A3E2B] hover:text-[#3B2920]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  placeholder="e.g. Everlasting Daisy Bouquet"
                  className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                    Price ({settings.currencySymbol})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    placeholder="25.00"
                    className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                    Available Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={prodForm.availableQuantity}
                    onChange={(e) => setProdForm({ ...prodForm, availableQuantity: e.target.value })}
                    className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                    Colors / Variants (comma separated)
                  </label>
                  <input
                    type="text"
                    value={prodForm.colors}
                    onChange={(e) => setProdForm({ ...prodForm, colors: e.target.value })}
                    placeholder="Pink, Cream, Sage"
                    className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  placeholder="Describe stitches, sizing, and styling..."
                  className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl p-3 text-xs text-[#3B2920]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3B2920] uppercase mb-1">
                  Images (comma separated URLs)
                </label>
                <textarea
                  rows={2}
                  value={prodForm.images}
                  onChange={(e) => setProdForm({ ...prodForm, images: e.target.value })}
                  placeholder="https://... , https://..."
                  className="w-full bg-[#F8F3EA] border border-[#C7A98A] rounded-xl p-3 text-xs text-[#3B2920]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isFeatured}
                    onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                    className="text-[#5A3E2B]"
                  />
                  <span>Featured Collection</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isNewArrival}
                    onChange={(e) => setProdForm({ ...prodForm, isNewArrival: e.target.checked })}
                    className="text-[#5A3E2B]"
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E8DCCB]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2 text-xs text-[#5A3E2B] hover:text-[#3B2920]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
