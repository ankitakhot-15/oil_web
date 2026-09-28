import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductBottleImage } from '../assets/images';
import { Plus, Minus, ShoppingBag, Zap, Truck, ShieldCheck, Sparkles, Check } from 'lucide-react';

export const ProductCard: React.FC = () => {
  const { mainProduct, settings, addToCart, openCheckout } = useStore();
  const [quantity, setQuantity] = useState(1);

  const unitPrice = mainProduct.price || settings.onlinePrice || 349;
  const codCharge = mainProduct.codCharge || settings.codCharge || 50;

  // Dynamic calculations as per prompt:
  // e.g. 1 qty: Online ₹349, COD ₹399
  // 2 qty: Online ₹698, COD ₹748 (₹698 + ₹50)
  const onlineTotal = unitPrice * quantity;
  const codTotal = onlineTotal + codCharge;

  const handleIncrement = () => setQuantity(q => Math.min(10, q + 1));
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <section id="product" className="py-16 sm:py-24 bg-[#F8F5EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#2F6B4F] uppercase">
            Signature Botanical Formulation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#174A3A] mt-2">
            Mira Herbal Hair Oil
          </h2>
          <p className="text-sm sm:text-base text-[#24312B]/75 mt-3">
            Handcrafted in small batches with pure natural herbs and botanical oils for strong, nourished, healthy-looking hair.
          </p>
        </div>

        {/* Product Showcase Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-[#EEE8D8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Product Image & Gallery */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden bg-[#F8F5EC] border border-[#EEE8D8] shadow-inner group">
                <img
                  src={ProductBottleImage}
                  alt="Mira Herbal Hair Oil Bottle"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-[#174A3A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    {mainProduct.badge || '🌿 Natural Hair Care'}
                  </span>
                  <span className="bg-[#C49A4A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    {mainProduct.size || '100ml Bottle'}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-medium text-[#174A3A] shadow-xs">
                  ✨ Handcrafted Batch
                </div>
              </div>

              {/* Delivery notice */}
              <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-[#2F6B4F] font-medium bg-[#8FAF8F]/15 px-4 py-2 rounded-xl">
                <Truck className="w-4 h-4 text-[#174A3A]" />
                <span><strong>🚚 Home Delivery Available</strong> Across India (3-5 Days)</span>
              </div>
            </div>

            {/* Right: Product Details, Pricing, & Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#C49A4A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Formerly known as Meera Herbal Hair Oil</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#174A3A] mt-1">
                  {mainProduct.name} ({mainProduct.size || '100ml'})
                </h3>
                <p className="text-sm sm:text-base text-[#24312B]/80 mt-2 leading-relaxed">
                  {mainProduct.description}
                </p>
              </div>

              {/* Pricing Cards with clear online vs COD breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Online Payment Card */}
                <div className="p-4 rounded-2xl border-2 border-[#174A3A] bg-[#174A3A]/5 relative">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#174A3A]">
                      Online Payment
                    </span>
                    <span className="text-[10px] font-bold bg-[#174A3A] text-white px-2 py-0.5 rounded-full">
                      Save ₹50
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-[#174A3A]">
                      ₹{onlineTotal}
                    </span>
                    <span className="text-xs text-[#24312B]/60">
                      ({quantity} × ₹{unitPrice})
                    </span>
                  </div>
                  <p className="text-xs text-[#2F6B4F] mt-1 font-medium">
                    UPI, Cards, Netbanking • Free Delivery
                  </p>
                </div>

                {/* Cash on Delivery Card */}
                <div className="p-4 rounded-2xl border border-[#EEE8D8] bg-[#F8F5EC]">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#24312B]/80">
                      Cash on Delivery
                    </span>
                    <span className="text-[10px] font-semibold text-[#24312B]/60">
                      +₹{codCharge} COD
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-[#24312B]">
                      ₹{codTotal}
                    </span>
                    <span className="text-xs text-[#24312B]/60">
                      (₹{onlineTotal} + ₹{codCharge})
                    </span>
                  </div>
                  <p className="text-xs text-[#24312B]/60 mt-1">
                    Pay at your doorstep upon arrival
                  </p>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#174A3A]">
                  Key Herbal Benefits:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#24312B]/85">
                  {mainProduct.benefits.slice(0, 4).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#2F6B4F] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-[#24312B]/60 pt-1 italic">
                  *Customers may start noticing a difference from approximately the third wash.
                </div>
              </div>

              {/* Quantity Selector and Action Buttons */}
              <div className="space-y-4 pt-4 border-t border-[#EEE8D8]">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-[#174A3A]">Quantity:</span>
                  <div className="flex items-center border border-[#8FAF8F]/50 rounded-xl bg-white shadow-2xs overflow-hidden">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="p-2.5 text-[#174A3A] hover:bg-[#F8F5EC] disabled:opacity-40 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-base text-[#174A3A]">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= 10}
                      className="p-2.5 text-[#174A3A] hover:bg-[#F8F5EC] disabled:opacity-40 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-[#2F6B4F] font-medium">
                    (Total: {quantity * 100}ml)
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => openCheckout(mainProduct, quantity)}
                    className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-[#174A3A] hover:bg-[#2F6B4F] active:scale-98 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <Zap className="w-5 h-5 text-[#C49A4A] fill-[#C49A4A]" />
                    <span>Buy Now – ₹{onlineTotal}</span>
                  </button>

                  <button
                    onClick={() => addToCart(mainProduct, quantity)}
                    className="w-full py-4 px-6 rounded-xl font-semibold text-base text-[#174A3A] bg-[#8FAF8F]/20 hover:bg-[#8FAF8F]/30 border border-[#8FAF8F]/40 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Trust Micro-Pill */}
              <div className="pt-2 flex items-center gap-4 text-xs text-[#24312B]/70">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#2F6B4F]" /> 100% Genuine Quality
                </span>
                <span>•</span>
                <span>Direct from Traditional Kitchen</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
