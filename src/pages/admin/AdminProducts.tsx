import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { Edit2, Plus, Trash2, CheckCircle2, XCircle, Package, IndianRupee } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, updateProduct, addProduct, deleteProduct, showToast } = useStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({ ...p });
    setIsCreatingNew(false);
  };

  const handleStartCreate = () => {
    setEditingProduct(null);
    setIsCreatingNew(true);
    setFormData({
      id: 'prod-' + Date.now().toString(36),
      name: 'Mira Herbal Hair Oil',
      brand: 'Mirakshi Botanicals',
      previousBrand: 'Meera Herbal Hair Oil',
      size: '100ml',
      price: 349,
      codCharge: 50,
      codTotal: 399,
      inStock: true,
      stockCount: 100,
      description: 'Home-made hair oil prepared using 100% natural ingredients.',
      badge: '🌿 100% Natural Hair Care',
      benefits: ['Helps reduce hair fall', 'Supports hair growth', 'Calms scalp itching'],
      imageUrl: products[0]?.imageUrl || '',
      sku: 'MB-MIRA-100',
      category: 'Herbal Hair Care'
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast('Please specify product name and price.', 'error');
      return;
    }

    const price = Number(formData.price) || 349;
    const codCharge = Number(formData.codCharge) || 50;
    const productPayload: Product = {
      id: formData.id || 'prod-' + Date.now(),
      name: formData.name,
      brand: formData.brand || 'Mirakshi Botanicals',
      previousBrand: formData.previousBrand || 'Meera Herbal Hair Oil',
      size: formData.size || '100ml',
      price,
      codCharge,
      codTotal: price + codCharge,
      inStock: formData.inStock !== false,
      stockCount: Number(formData.stockCount) || 100,
      description: formData.description || '',
      badge: formData.badge || '🌿 Natural Care',
      benefits: Array.isArray(formData.benefits) ? formData.benefits : [formData.benefits || 'Natural nourishment'],
      imageUrl: formData.imageUrl || products[0]?.imageUrl || '',
      sku: formData.sku || 'MB-01',
      category: formData.category || 'Herbal Hair Care'
    };

    if (isCreatingNew) {
      await addProduct(productPayload);
    } else {
      await updateProduct(productPayload);
    }

    setEditingProduct(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#174A3A]">
            Product Catalog Management
          </h1>
          <p className="text-xs sm:text-sm text-[#24312B]/75 mt-0.5">
            Configure pricing, sizes, inventory levels, and botanical product copy.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 rounded-xl bg-[#174A3A] hover:bg-[#2F6B4F] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product Variant</span>
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-3xl p-6 border border-[#EEE8D8] shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="flex gap-4 items-start">
              <div className="w-20 h-20 rounded-2xl bg-[#F8F5EC] overflow-hidden shrink-0 border border-[#EEE8D8]">
                <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-[#2F6B4F] uppercase tracking-wider block">
                  {prod.brand} • {prod.size}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#174A3A] truncate">
                  {prod.name}
                </h3>
                <p className="text-xs text-[#24312B]/70 line-clamp-2 mt-1">
                  {prod.description}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <span className="font-bold text-sm text-[#174A3A]">₹{prod.price}</span>
                  <span className="text-[#24312B]/60">COD: ₹{prod.price + prod.codCharge}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {prod.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EEE8D8] flex items-center justify-between text-xs">
              <span className="text-[#24312B]/60 font-mono">SKU: {prod.sku}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(prod)}
                  className="px-3 py-1.5 rounded-lg border border-[#EEE8D8] hover:bg-[#F8F5EC] text-[#174A3A] font-semibold flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
                {products.length > 1 && (
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal Form */}
      {(editingProduct || isCreatingNew) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 border border-[#EEE8D8] shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-[#EEE8D8]">
              <h3 className="font-serif text-xl font-bold text-[#174A3A]">
                {isCreatingNew ? 'Create New Product' : `Edit ${editingProduct?.name}`}
              </h3>
              <button
                onClick={() => { setEditingProduct(null); setIsCreatingNew(false); }}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#174A3A] mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#174A3A] mb-1">Bottle Size *</label>
                  <input
                    type="text"
                    required
                    value={formData.size || ''}
                    onChange={e => setFormData({ ...formData, size: e.target.value })}
                    placeholder="e.g. 100ml"
                    className="w-full px-3 py-2 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#174A3A] mb-1">Online Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price ?? 349}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC] font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#174A3A] mb-1">COD Handling (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.codCharge ?? 50}
                    onChange={e => setFormData({ ...formData, codCharge: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#174A3A] mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={formData.stockCount ?? 100}
                    onChange={e => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#174A3A] mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC] resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#174A3A] mb-1">Badge Text</label>
                <input
                  type="text"
                  value={formData.badge || ''}
                  onChange={e => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. 🌿 100% Natural Hair Care"
                  className="w-full px-3 py-2 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={formData.inStock !== false}
                  onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                  className="accent-[#174A3A] w-4 h-4"
                />
                <label htmlFor="inStockCheck" className="font-semibold text-[#174A3A]">
                  Mark Product Active & Available for Purchase
                </label>
              </div>

              <div className="flex gap-2 pt-4 border-t border-[#EEE8D8]">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-bold text-xs text-white bg-[#174A3A] hover:bg-[#2F6B4F]"
                >
                  Save Product Changes
                </button>
                <button
                  type="button"
                  onClick={() => { setEditingProduct(null); setIsCreatingNew(false); }}
                  className="px-4 py-3 rounded-xl text-xs font-semibold border border-[#EEE8D8]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
