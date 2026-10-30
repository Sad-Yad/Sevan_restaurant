import { useState } from 'react';
import { useCart } from '../context/CartContext';

// Google Apps Script Web App URL — replace with your deployed endpoint
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbws0fn5X3m_QPQ1zpainb7c2JwVJRsqcRJ3lH-0nYhmjikPwyGUWYsjwmMxLZN7357sUA/exec';

function generateOrderId() {
  const now = new Date();
  const datePart = now.toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SVN-${datePart}-${rand}`;
}

export default function Checkout({ isOpen, onClose }) {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState('details'); // details | payment | confirm | success | error
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    paymentMethod: 'cash',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  if (!isOpen || items.length === 0) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (validate()) {
      if (formData.paymentMethod === 'online') {
        setStep('payment');
      } else {
        handlePlaceOrder();
      }
    }
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    const orderId = generateOrderId();
    const now = new Date();
    const orderDateTime = now.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const orderedItems = items
      .map((i) => `${i.name} x${i.quantity}`)
      .join('; ');
    const customizations = items
      .map((i) => {
        const custs = Object.entries(i.customizations || {})
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ');
        return custs ? `${i.name}: ${custs}` : '';
      })
      .filter(Boolean)
      .join('; ');
    const quantities = items.map((i) => i.quantity).join('; ');
    const itemSubtotals = items
      .map((i) => `₹${i.price * i.quantity}`)
      .join('; ');

    const orderPayload = {
      orderId,
      orderDateTime,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      orderedItems,
      customizations: customizations || 'None',
      quantities,
      itemSubtotals,
      totalAmount: subtotal,
      paymentMethod:
        formData.paymentMethod === 'cash'
          ? 'Cash on Delivery / Pay at Restaurant'
          : 'Online Payment',
      paymentStatus:
        formData.paymentMethod === 'cash' ? 'Pending' : 'Demo – Not Processed',
      orderStatus: 'Received',
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      // With no-cors mode we can't read the response, so we treat it as success
      // For production, use cors mode with proper Apps Script configuration
      setOrderResult(orderPayload);
      setStep('success');
      clearCart();
    } catch (err) {
      console.error('Order submission failed:', err);
      setStep('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('details');
    setFormData({ name: '', phone: '', paymentMethod: 'cash' });
    setErrors({});
    setOrderResult(null);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-charcoal/50 z-50"
        onClick={handleClose}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-ivory w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <h2 className="font-heading text-2xl font-semibold text-charcoal">
              {step === 'success'
                ? 'Order Confirmed'
                : step === 'error'
                ? 'Order Failed'
                : step === 'payment'
                ? 'Payment'
                : 'Checkout'}
            </h2>
            <button
              onClick={handleClose}
              className="p-1 text-muted hover:text-charcoal"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-6 py-5">
            {/* ─── SUCCESS ─── */}
            {step === 'success' && orderResult && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                  Thank You!
                </h3>
                <p className="text-muted text-sm mb-4">
                  Your order has been placed successfully.
                </p>
                <div className="bg-beige rounded-lg p-4 text-left space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Order ID</span>
                    <span className="font-medium text-charcoal">
                      {orderResult.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Total Amount</span>
                    <span className="font-medium text-charcoal">
                      ₹{orderResult.totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Payment</span>
                    <span className="font-medium text-charcoal">
                      {orderResult.paymentMethod}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="px-8 py-2.5 bg-gold hover:bg-gold-dark text-white text-sm font-medium tracking-widest uppercase rounded-sm transition-colors"
                >
                  Done
                </button>
              </div>
            )}

            {/* ─── ERROR ─── */}
            {step === 'error' && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                  Something Went Wrong
                </h3>
                <p className="text-muted text-sm mb-6">
                  We couldn't record your order. Please try again or contact the
                  restaurant directly.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setStep('details')}
                    className="px-6 py-2.5 border border-border text-sm font-medium text-charcoal rounded-sm hover:bg-beige transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white text-sm font-medium tracking-widest uppercase rounded-sm transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* ─── PAYMENT DEMO ─── */}
            {step === 'payment' && (
              <div>
                <p className="text-xs text-muted mb-4 text-center uppercase tracking-wide">
                  Demo Payment Interface — No real transaction will be processed
                </p>

                <div className="bg-white border border-border rounded-lg p-5 space-y-5">
                  <div className="text-center">
                    <p className="text-sm text-muted">Amount to Pay</p>
                    <p className="font-heading text-3xl font-semibold text-charcoal mt-1">
                      ₹{subtotal}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted uppercase tracking-wide">
                      Select Payment Method
                    </p>
                    {[
                      { id: 'upi', icon: '📱', label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm' },
                      { id: 'card', icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                      { id: 'netbanking', icon: '🏦', label: 'Net Banking', desc: 'All major banks supported' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-beige transition-colors"
                      >
                        <input
                          type="radio"
                          name="paymentType"
                          defaultChecked={method.id === 'upi'}
                          className="accent-gold"
                        />
                        <span className="text-lg">{method.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            {method.label}
                          </p>
                          <p className="text-xs text-muted">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                    className="w-full py-3 bg-gold hover:bg-gold-dark disabled:opacity-50 text-white text-sm font-medium tracking-widest uppercase rounded-sm transition-colors"
                  >
                    {submitting ? 'Processing...' : `Proceed to Pay ₹${subtotal}`}
                  </button>
                </div>

                <button
                  onClick={() => setStep('details')}
                  className="w-full mt-3 py-2 text-sm text-muted hover:text-charcoal transition-colors"
                >
                  ← Back to Details
                </button>
              </div>
            )}

            {/* ─── DETAILS FORM ─── */}
            {step === 'details' && (
              <form onSubmit={handleSubmitDetails}>
                {/* Order Summary */}
                <div className="mb-6">
                  <h3 className="text-xs font-medium text-muted uppercase tracking-wide mb-3">
                    Order Summary
                  </h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.cartKey}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-charcoal">
                          {item.name} × {item.quantity}
                          {Object.keys(item.customizations || {}).length > 0 && (
                            <span className="text-muted ml-1 text-xs">
                              ({Object.values(item.customizations).join(', ')})
                            </span>
                          )}
                        </span>
                        <span className="font-medium text-charcoal">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border mt-3 pt-3 flex justify-between">
                    <span className="font-medium text-charcoal">Total</span>
                    <span className="text-lg font-semibold text-gold">
                      ₹{subtotal}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-xs font-medium text-muted uppercase tracking-wide">
                    Your Details
                  </h3>

                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="block text-sm text-charcoal mb-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, name: e.target.value }))
                      }
                      className={`w-full px-4 py-2.5 border rounded text-sm bg-white text-charcoal focus:outline-none focus:ring-1 focus:ring-gold/50 ${
                        errors.name ? 'border-red-400' : 'border-border'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-phone"
                      className="block text-sm text-charcoal mb-1"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, phone: e.target.value }))
                      }
                      className={`w-full px-4 py-2.5 border rounded text-sm bg-white text-charcoal focus:outline-none focus:ring-1 focus:ring-gold/50 ${
                        errors.phone ? 'border-red-400' : 'border-border'
                      }`}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="text-xs font-medium text-muted uppercase tracking-wide mb-3">
                    Payment Method
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-beige transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            paymentMethod: e.target.value,
                          }))
                        }
                        className="accent-gold"
                      />
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          Cash on Delivery / Pay at Restaurant
                        </p>
                        <p className="text-xs text-muted">
                          Pay when you receive your order
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-beige transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={formData.paymentMethod === 'online'}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            paymentMethod: e.target.value,
                          }))
                        }
                        className="accent-gold"
                      />
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          Online Payment
                        </p>
                        <p className="text-xs text-muted">
                          UPI, Credit/Debit Card, Net Banking
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-gold hover:bg-gold-dark disabled:opacity-50 text-white text-sm font-medium tracking-widest uppercase rounded-sm transition-colors"
                >
                  {submitting
                    ? 'Placing Order...'
                    : formData.paymentMethod === 'online'
                    ? 'Continue to Payment'
                    : 'Place Order'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

