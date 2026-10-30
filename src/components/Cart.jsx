import { useCart } from '../context/CartContext';

export default function Cart({ isOpen, onClose, onCheckout }) {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/40 z-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-ivory z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-heading text-2xl font-semibold text-charcoal">
            Your Order
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-muted hover:text-charcoal transition-colors"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-border mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-muted text-base">Your cart is empty</p>
              <p className="text-muted/70 text-sm mt-1">
                Add items from the menu to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-border"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-charcoal truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.cartKey)}
                        className="text-muted hover:text-red-500 transition-colors flex-shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>

                    {/* Customizations */}
                    {Object.keys(item.customizations || {}).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Object.entries(item.customizations).map(
                          ([key, val]) => (
                            <span
                              key={key}
                              className="text-xs text-muted bg-beige px-1.5 py-0.5 rounded"
                            >
                              {key}: {val}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded text-xs">
                        <button
                          onClick={() =>
                            updateQuantity(item.cartKey, item.quantity - 1)
                          }
                          className="px-2 py-1 text-muted hover:text-charcoal"
                        >
                          −
                        </button>
                        <span className="px-2 py-1 font-medium text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.cartKey, item.quantity + 1)
                          }
                          className="px-2 py-1 text-muted hover:text-charcoal"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-medium text-charcoal">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base text-muted">Subtotal</span>
              <span className="text-lg font-semibold text-charcoal">
                ₹{subtotal}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3 bg-gold hover:bg-gold-dark text-white text-sm font-medium tracking-widest uppercase rounded-sm transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

