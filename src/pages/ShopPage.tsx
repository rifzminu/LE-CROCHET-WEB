import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, categories, selectedCategorySlug, navigateTo, settings } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    selectedCategorySlug || 'all'
  );
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'in-stock'>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync category if navigated with category slug
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setSelectedCategory(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchCat = product.category.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchCat) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          const matchedCategoryObj = categories.find((c) => c.slug === selectedCategory);
          const targetName = matchedCategoryObj ? matchedCategoryObj.name : selectedCategory;
          if (
            product.category.toLowerCase() !== targetName.toLowerCase() &&
            product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') !== selectedCategory
          ) {
            return false;
          }
        }

        // Availability filter
        if (filterAvailability === 'in-stock') {
          if (product.isSoldOut || product.availableQuantity <= 0) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.price - b.price;
        }
        if (sortBy === 'price-high') {
          return b.price - a.price;
        }
        // newest default
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, searchQuery, selectedCategory, sortBy, filterAvailability, categories]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('newest');
    setFilterAvailability('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    sortBy !== 'newest' ||
    filterAvailability !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8DCCB] pb-6">
        <div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920]">
            Shop Handmade
          </h1>
          <p className="text-xs sm:text-sm text-[#5A3E2B]/80 mt-1">
            Small pieces, carefully made with love & cozy yarn.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#A67C52]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
          </span>
          <button
            onClick={() => navigateTo('custom-order')}
            className="text-xs bg-[#E8DCCB] text-[#3B2920] px-3.5 py-1.5 rounded-full border border-[#C7A98A]/50 hover:bg-[#C7A98A]/30 transition-colors"
          >
            Need Custom?
          </button>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#A67C52] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flowers, bags, plushies, keychains..."
              className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-[#3B2920] placeholder-[#5A3E2B]/50 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A3E2B]/60 hover:text-[#3B2920]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Desktop Filter & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Sort selector */}
            <div className="flex items-center gap-2 bg-[#F8F3EA] border border-[#E8DCCB] rounded-xl px-3 py-1.5 text-xs text-[#5A3E2B]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#A67C52]" />
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium focus:outline-none cursor-pointer text-[#3B2920]"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* In-stock toggle */}
            <button
              onClick={() =>
                setFilterAvailability(filterAvailability === 'all' ? 'in-stock' : 'all')
              }
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                filterAvailability === 'in-stock'
                  ? 'bg-[#5A3E2B] text-[#F8F3EA] border-[#5A3E2B]'
                  : 'bg-[#F8F3EA] text-[#5A3E2B] border-[#E8DCCB] hover:border-[#A67C52]'
              }`}
            >
              In Stock Only
            </button>

            {/* Clear filters pill */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#A67C52] hover:text-[#5A3E2B] font-semibold underline underline-offset-2"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#5A3E2B] text-[#F8F3EA] shadow-xs'
                : 'bg-[#E8DCCB]/60 text-[#5A3E2B] hover:bg-[#E8DCCB]'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-[#5A3E2B] text-[#F8F3EA] font-semibold shadow-xs'
                  : 'bg-[#E8DCCB]/60 text-[#5A3E2B] hover:bg-[#E8DCCB]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-[#E8DCCB]/30 rounded-3xl border border-[#E8DCCB] p-8 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#E8DCCB] text-[#A67C52] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif-heading text-xl font-bold text-[#3B2920]">
            No matching crochet pieces
          </h3>
          <p className="text-xs text-[#5A3E2B]/80 leading-relaxed">
            We couldn't find any products matching your current filters. You can clear your filters or submit a custom order request!
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={clearAllFilters}
              className="bg-[#5A3E2B] text-[#F8F3EA] px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#A67C52] transition-colors"
            >
              Show All Products
            </button>
            <button
              onClick={() => navigateTo('custom-order')}
              className="bg-[#E8DCCB] text-[#3B2920] px-4 py-2 rounded-full text-xs font-semibold border border-[#C7A98A] hover:bg-[#C7A98A]/30 transition-colors"
            >
              Request Custom
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
