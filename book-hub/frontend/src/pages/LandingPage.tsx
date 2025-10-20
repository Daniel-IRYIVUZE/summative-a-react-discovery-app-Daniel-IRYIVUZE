import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, BookOpen, Shield, Image } from "lucide-react";
import BookCard from "../components/books/BookCard";
import { getBooks } from "../utils/localStorage";

const LandingPage: React.FC = () => {
  const featuredBooks = getBooks().slice(0, 6);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const features = [
    {
      icon: BookOpen,
      title: "Vast Collection",
      description:
        "Discover thousands of books across all genres from classic literature to modern bestsellers.",
    },
    {
      icon: Star,
      title: "Curated Selection",
      description:
        "Hand-picked recommendations and curated collections to help you find your next favorite book.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Join a community of book lovers, share reviews, and get personalized recommendations.",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "Safe and secure payment processing with guaranteed satisfaction and easy returns.",
    },
  ];

  const stats = [
    { number: "10+", label: "Books Available" },
    { number: "5+", label: "Happy Readers" },
    { number: "10+", label: "Publishing Partners" },
    { number: "24/7", label: "Customer Support" },
  ];

  // Fallback image URL or data URL for placeholder
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='80' viewBox='0 0 64 80'%3E%3Crect width='64' height='80' fill='%23f3f4f6'/%3E%3Cpath d='M32 40L20 28h24L32 40zm0 0L44 52H20l12-12zm0 0' fill='%239ca3af'/%3E%3C/svg%3E";

  // BookListItem component for list view with better image handling
  const BookListItem = ({ book }: { book: any }) => {
    const [imgError, setImgError] = useState(false);
    
    const handleImageError = () => {
      setImgError(true);
    };

    return (
      <div className="flex items-center space-x-4 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="w-16 h-20 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
          {imgError ? (
            <Image className="w-8 h-8 text-gray-400" />
          ) : (
            <img
              src={book.coverImage || book.image || book.cover || fallbackImage}
              alt={book.title}
              className="w-full h-full object-cover rounded-md"
              onError={handleImageError}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm">{book.author}</p>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {book.description || "No description available"}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-2 flex-shrink-0">
          <span className="text-lg font-bold text-gray-900">
            ${book.price || book.price === 0 ? book.price : "N/A"}
          </span>
          <button className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Your Next
              <span className="block text-gray-200">Favorite Book</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Explore our vast collection of books, find hidden gems, and
              connect with fellow book lovers in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/store"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore Store
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-600 transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BookHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best book discovery experience
              for readers of all kinds.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-600 rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-gray-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Books
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked selections from our extensive collection
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Grid View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="List View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Books Container */}
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
              : "space-y-4"
          }>
            {featuredBooks.map((book: any) => (
              viewMode === 'grid' ? (
                <BookCard key={book.id} book={book} />
              ) : (
                <BookListItem key={book.id} book={book} />
              )
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/store"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              View All Books
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who have discovered their next favorite
            book with BookHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;