import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function MenuItem({ item }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState(() => {
    const defaults = {};
    (item.customizations || []).forEach((c) => {
      defaults[c.name] = c.options[0];
    });
    return defaults;
  });
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item, quantity, selectedCustomizations);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden group hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Veg / Non-veg indicator */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center justify-center w-5 h-5 border-2 rounded-sm ${
              item.veg
                ? 'border-green-600'
                : 'border-red-600'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                item.veg ? 'bg-green-600' : 'bg-red-600'
              }`}
            ></span>
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 lg:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading text-xl font-semibold text-charcoal leading-tight">
            {item.name}
          </h3>
          <span className="text-gold font-semibold text-base whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>

        <p className="text-muted text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Customizations */}
        {item.customizations && item.customizations.length > 0 && (
          <div className="space-y-2 mb-4">
            {item.customizations.map((cust) => (
              <div key={cust.name}>
                <label className="text-xs font-medium text-muted uppercase tracking-wide">
                  {cust.name}
                </label>
                <select
                  value={selectedCustomizations[cust.name] || cust.options[0]}
                  onChange={(e) =>
                    setSelectedCustomizations((prev) => ({
                      ...prev,
                      [cust.name]: e.target.value,
                    }))
                  }
                  className="mt-1 w-full text-sm border border-border rounded px-3 py-1.5 bg-ivory text-charcoal focus:outline-none focus:ring-1 focus:ring-gold/50"
                >
                  {cust.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-2.5 py-1.5 text-muted hover:text-charcoal transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-3 py-1.5 text-sm font-medium text-charcoal min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2.5 py-1.5 text-muted hover:text-charcoal transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            className={`flex-1 py-2 text-sm font-medium tracking-wide uppercase rounded transition-all duration-300 ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-gold hover:bg-gold-dark text-white'
            }`}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

