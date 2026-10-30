import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity, customizations } = action.payload;
      // Create a unique key based on item id and customizations
      const custKey = JSON.stringify(customizations || {});
      const cartKey = `${item.id}_${custKey}`;

      const existingIndex = state.items.findIndex((i) => i.cartKey === cartKey);
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return { ...state, items: updated };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...item,
            cartKey,
            quantity,
            customizations: customizations || {},
          },
        ],
      };
    }
    case 'UPDATE_QUANTITY': {
      const { cartKey, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.cartKey !== cartKey),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartKey === cartKey ? { ...i, quantity } : i
        ),
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((i) => i.cartKey !== action.payload),
      };
    }
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback((item, quantity = 1, customizations = {}) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity, customizations } });
  }, []);

  const updateQuantity = useCallback((cartKey, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartKey, quantity } });
  }, []);

  const removeItem = useCallback((cartKey) => {
    dispatch({ type: 'REMOVE_ITEM', payload: cartKey });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

