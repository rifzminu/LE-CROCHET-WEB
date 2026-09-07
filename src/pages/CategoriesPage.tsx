import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, products, navigateTo } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="border-b border-[#E8DCCB] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920]">
            Crochet Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#5A3E2B]/80 mt-1">
            Browse our handmade pieces organized by category
          </p>
        </div>

        <button
          onClick={() => navigateTo('custom-order')}
          className="text-xs bg-[#5A3E2B] text-[#F8F3EA] px-4 py-2 rounded-full font-semibold hover:bg-[#A67C52] transition-colors self-start sm:self-auto cursor-pointer"
        >
          Custom Crochet Request
        </button>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const count = products.filter(
              (p) =>
                p.category.toLowerCase() === category.name.toLowerCase() ||
                p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === category.slug
            ).length;

            return (
              <div
                key={category.id}
                onClick={() => navigateTo('shop', { categorySlug: category.slug })}
                className="group bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] hover:border-[#A67C52] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#E8DCCB] relative">
                  <img
                    src={category.image || 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=800&q=80'}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#F8F3EA]/90 backdrop-blur-xs text-[#5A3E2B] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#C7A98A]/40">
                    {count} {count === 1 ? 'item' : 'items'}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif-heading text-xl font-bold text-[#3B2920] group-hover:text-[#A67C52] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-[#5A3E2B]/80 mt-1 leading-relaxed">
                      {category.description || 'Thoughtfully hand-stitched pieces made with care.'}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center text-xs font-semibold text-[#A67C52] group-hover:text-[#5A3E2B] transition-colors gap-1.5">
                    <span>Browse Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#E8DCCB]/30 rounded-3xl border border-[#E8DCCB] p-8 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#E8DCCB] text-[#A67C52] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif-heading text-xl font-bold text-[#3B2920]">
            Collections Coming Soon
          </h3>
          <p className="text-xs text-[#5A3E2B]/80 leading-relaxed">
            New handmade collections are in the making! Feel free to send us a custom crochet request for any specific item you'd like.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('custom-order')}
              className="bg-[#5A3E2B] text-[#F8F3EA] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#A67C52] transition-colors cursor-pointer"
            >
              Request Custom Piece
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
