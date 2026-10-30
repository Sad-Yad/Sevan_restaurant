import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-ivory">
        <Navbar onCartClick={() => setCartOpen(true)} />
        <Hero />
        <Menu />
        <About />
        <Footer />

        {/* Cart Slide-out */}
        <Cart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={handleCheckout}
        />

        {/* Checkout Modal */}
        <Checkout
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
        />
      </div>
    </CartProvider>
  );
}
