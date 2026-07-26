/**
 * Foodie Fit Native On-Site Cart State Manager
 */

export class CartManager {
  static STORAGE_KEY = 'foodiefit_cart';

  static getCart() {
    try {
      const saved = localStorage.getItem(CartManager.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  static saveCart(cart) {
    try {
      localStorage.setItem(CartManager.STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('foodiefit:cart-updated', { detail: { cart } }));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }

  static addItem(meal, portion = 'Lean', quantity = 1) {
    const cart = CartManager.getCart();
    const existingIndex = cart.findIndex(item => item.id === meal.id && item.portion === portion);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: meal.id,
        name: meal.name,
        slug: meal.slug,
        image: meal.image || '/images/foodiefit-logo.png',
        price: portion === 'Bulk' ? (meal.price + 3.00) : (meal.price || 11.99),
        calories: portion === 'Bulk' ? Math.round((meal.calories || 450) * 1.5) : (meal.calories || 450),
        protein: portion === 'Bulk' ? Math.round((meal.protein || 40) * 1.5) : (meal.protein || 40),
        portion,
        quantity
      });
    }

    CartManager.saveCart(cart);
  }

  static updateQuantity(id, portion, quantity) {
    let cart = CartManager.getCart();
    if (quantity <= 0) {
      cart = cart.filter(item => !(item.id === id && item.portion === portion));
    } else {
      const item = cart.find(item => item.id === id && item.portion === portion);
      if (item) item.quantity = quantity;
    }
    CartManager.saveCart(cart);
  }

  static removeItem(id, portion) {
    CartManager.updateQuantity(id, portion, 0);
  }

  static clearCart() {
    CartManager.saveCart([]);
  }

  static getTotals() {
    const cart = CartManager.getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalProtein = cart.reduce((sum, item) => sum + ((item.protein || 0) * item.quantity), 0);
    const totalCalories = cart.reduce((sum, item) => sum + ((item.calories || 0) * item.quantity), 0);

    return {
      totalItems,
      subtotal,
      totalProtein,
      totalCalories,
      tax: subtotal * 0.08375, // Clark County tax rate
      total: subtotal * 1.08375
    };
  }
}

if (typeof window !== 'undefined') {
  window.CartManager = CartManager;
}
