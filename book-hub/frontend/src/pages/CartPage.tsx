import React, { useMemo } from "react";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const CartPage: React.FC = () => {
  const { user, updateCartQuantity, removeFromCart, clearCart } = useAuth();

  const cartItems = user?.cart || [];

  // Dummy cart items for demonstration
  const dummyCartItems = [
    {
      book: {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop"
      },
      quantity: 2
    },
    {
      book: {
        id: "2",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 14.50,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop"
      },
      quantity: 1
    }
  ];

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.book.price * item.quantity,
      0
    );
  }, [cartItems]);

  // Calculate total for dummy items
  const dummyTotal = useMemo(() => {
    return dummyCartItems.reduce(
      (sum, item) => sum + item.book.price * item.quantity,
      0
    );
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const bookTitles = cartItems
      .map((item) => `${item.book.title} (x${item.quantity})`)
      .join("%0A");

    const message = `Hello! I'm interested in purchasing the following books:%0A%0A${bookTitles}%0A%0ATotal: $${total.toFixed(
      2
    )}%0A%0APlease provide more information about availability and payment.`;

    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8 hidden">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Start adding some books to your cart to see them here.
          </p>
          <a
            href="/store"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
          >
            Continue Shopping
          </a>
        </div>

        {/* Demo Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Demo - How it looks with items
          </h3>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            {dummyCartItems.map((item) => (
              <div
                key={item.book.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={item.book.image}
                    alt={item.book.title}
                    className="w-16 h-20 object-cover rounded"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.book.title}
                    </h3>
                    <p className="text-gray-600">by {item.book.author}</p>
                    <p className="text-lg font-bold text-gray-600 mt-1">
                      ${item.book.price}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      className="p-1 rounded-full hover:bg-gray-100 opacity-50 cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>

                    <button
                      className="p-1 rounded-full hover:bg-gray-100 opacity-50 cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium flex items-center opacity-50 cursor-not-allowed"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Demo Summary */}
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-gray-600">
                ${dummyTotal.toFixed(2)}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              {dummyCartItems.reduce((sum, item) => sum + item.quantity, 0)} items
            </p>

            <button
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 opacity-50 cursor-not-allowed"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Checkout via WhatsApp
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Demo - buttons are disabled in this preview
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {cartItems.map((item) => (
          <div
            key={item.book.id}
            className="border-b border-gray-200 last:border-b-0"
          >
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={item.book.image}
                alt={item.book.title}
                className="w-16 h-20 object-cover rounded"
              />

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.book.title}
                </h3>
                <p className="text-gray-600">by {item.book.author}</p>
                <p className="text-lg font-bold text-gray-600 mt-1">
                  ${item.book.price}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    updateCartQuantity(Number(item.book.id), item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateCartQuantity(Number(item.book.id), item.quantity + 1)
                  }
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  ${(item.book.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(Number(item.book.id))}
                  className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-gray-600">
            ${total.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
        </p>

        <button
          onClick={handleCheckout}
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Checkout via WhatsApp
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          You'll be redirected to WhatsApp to complete your purchase
        </p>
      </div>
    </div>
  );
};

export default CartPage;