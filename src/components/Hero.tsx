import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductBottleImage } from '../assets/images';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openCheckout, settings } = useStore();

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-[#F8F5EC] via-[#F8F5EC] to-[#EEE8D8]/50">
      {/* Subtle botanical decorative ambient background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#8FAF8F]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#C49A4A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#174A3A]/8 border border-[#174A3A]/15 text-[#174A3A] text-xs sm:text-sm font-medium tracking-wide shadow-xs">
              <Sparkles className="w-4 h-4 text-[#C49A4A]" />
              <span>Formerly Meera Herbal Hair Oil • 100% Home-Made</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#174A3A] leading-[1.15]">
              {settings.heroHeading || 'Natural Care. Healthier-Looking Hair.'}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-[#24312B]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {settings.heroSubheading || 'Discover Mira Herbal Hair Oil – traditionally prepared with natural ingredients for your everyday hair-care routine.'}
            </p>

            {/* Highlights Mini Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left text-xs sm:text-sm font-medium text-[#24312B]/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0" />
                <span>Supports Hair Growth</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0" />
                <span>Helps Reduce Hair Fall</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0" />
                <span>Scalp & Dandruff Care</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => openCheckout()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-[#174A3A] hover:bg-[#2F6B4F] active:scale-98 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Order Now – ₹{settings.onlinePrice || 349}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#benefits"
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-semibold text-[#174A3A] bg-white/80 hover:bg-white border border-[#8FAF8F]/40 active:scale-98 shadow-xs hover:shadow-sm transition-all text-center"
              >
                Explore Benefits
              </a>
            </div>

            {/* Pricing transparency tag */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-[#24312B]/70 pt-1">
              <span>💳 Online: <strong>₹{settings.onlinePrice || 349}</strong></span>
              <span>•</span>
              <span>📦 Cash on Delivery: <strong>₹{(settings.onlinePrice || 349) + (settings.codCharge || 50)}</strong></span>
              <span>•</span>
              <span>🚚 Free/Fast Delivery</span>
            </div>
          </div>

          {/* Right Column: Premium Product Photography Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md">
              {/* Decorative botanical halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8FAF8F]/30 to-[#C49A4A]/20 rounded-3xl transform -rotate-3 scale-98 blur-sm" />

              {/* Main Product Frame */}
              <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-[#EEE8D8] overflow-hidden group">
                {/* Badge on Image */}
                <div className="absolute top-8 left-8 z-20">
                  <span className="bg-[#174A3A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <span>🌿</span>
                    <span>100ml Pure Herbal Oil</span>
                  </span>
                </div>

                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F8F5EC] flex items-center justify-center">
                  <img
                    src={ProductBottleImage}
                    alt="Mira Herbal Hair Oil by Mirakshi Botanicals"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom Card Summary */}
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#EEE8D8]">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#174A3A]">Mira Herbal Hair Oil</h3>
                    <p className="text-xs text-[#2F6B4F]">Home-made natural botanical formulation</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#24312B]/60 block">Starting at</span>
                    <span className="font-bold text-xl text-[#174A3A]">₹{settings.onlinePrice || 349}</span>
                  </div>
                </div>
              </div>

              {/* Floating Trust Pill */}
              <div className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-md border border-[#8FAF8F]/30 rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2.5 text-xs font-medium text-[#174A3A]">
                <ShieldCheck className="w-4 h-4 text-[#2F6B4F]" />
                <span>Noticeable results from approx. 3rd wash*</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
