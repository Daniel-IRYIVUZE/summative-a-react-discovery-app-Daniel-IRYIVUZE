import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import type { Book } from "../../types";
import { useAuth } from "../../contexts/AuthContext";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { isAuthenticated, addToCart } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      const id = Number(book.id);
      if (!Number.isNaN(id)) {
        addToCart(id);
      } else {
        // fallback: invalid id format
        console.warn("Invalid book id:", book.id);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/store?book=${book.id}`}>
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-4">
        <Link to={`/store?book=${book.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-gray-600 transition-colors line-clamp-2">
            {book.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(book.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">({book.rating})</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {(Array.isArray(book.genre)
            ? book.genre
            : typeof book.genre === "string"
            ? book.genre.split(",").map((s) => s.trim()).filter(Boolean)
            : []
          ).slice(0, 2).map((genre: string) => (
            <span
              key={genre}
              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-600">${book.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={!isAuthenticated}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isAuthenticated
                ? "bg-gray-600 text-white hover:bg-gray-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            title={!isAuthenticated ? "Please login to add to cart" : ""}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
