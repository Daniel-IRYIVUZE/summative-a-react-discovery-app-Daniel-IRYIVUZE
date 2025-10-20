import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Search, Filter, X, Grid, List, Star, Calendar, User } from "lucide-react";
import type { RootState } from "../store";
import {
  setSearchQuery,
  setSelectedGenres,
  setPriceRange,
  setMinRating,
  setSortBy,
  setSortOrder,
  resetFilters,
} from "../store/slices/filterSlice";
import BookCard from "../components/books/BookCard";
import { getBooks } from "../utils/localStorage";
import { useDispatch } from "react-redux";

const StorePage: React.FC = () => {
  // Define all types internally
  type Book = {
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    rating: number;
    genre: string[];
    stock: number;
    coverImage?: string;
    image?: string;
    cover?: string;
    publicationDate?: string;
    publisher?: string;
  };

  type ViewMode = 'grid' | 'list';
  type SortBy = 'title' | 'author' | 'price' | 'rating' | 'publicationDate';
  type SortOrder = 'asc' | 'desc';

  type BookListItemProps = {
    book: Book;
  };

  type BookDetailModalProps = {};

  // Mock API service that uses localStorage
  const apiService = {
    getBooks: async (): Promise<Book[]> => {
      try {
        const books = getBooks();
        return books as Book[];
      } catch (error) {
        console.error('Error loading books from localStorage:', error);
        return [];
      }
    },

    getGenres: async (): Promise<{ name: string }[]> => {
      try {
        const books = getBooks() as Book[];
        const genres = new Set<string>();
        books.forEach((book: Book) => {
          if (book.genre && Array.isArray(book.genre)) {
            book.genre.forEach((genre: string) => genres.add(genre));
          }
        });
        return Array.from(genres).map(genre => ({ name: genre }));
      } catch (error) {
        console.error('Error loading genres from books:', error);
        return [];
      }
    }
  };

  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  
  // State declarations
  const [books, setBooks] = useState<Book[]>([]);
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load books and genres from localStorage
  useEffect(() => {
    const loadBooksAndGenres = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const [booksData, genresData] = await Promise.all([
          apiService.getBooks(),
          apiService.getGenres()
        ]);
        
        setBooks(booksData);
        setAllGenres(genresData.map((g) => g.name));
      } catch (error) {
        console.error('Error loading data:', error);
        // Final fallback - try direct localStorage access
        try {
          const localBooks = getBooks();
          setBooks(localBooks as Book[]);
          
          const genres = new Set<string>();
          localBooks.forEach((book: any) => {
            if (book.genre && Array.isArray(book.genre)) {
              book.genre.forEach((genre: string) => genres.add(genre));
            }
          });
          setAllGenres(Array.from(genres).sort());
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          setBooks([]);
          setAllGenres([]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBooksAndGenres();
  }, []);

  // Filter and sort books based on current filters
  const filteredBooks = useMemo((): Book[] => {
    if (!books.length) return [];

    let filtered = books.filter((book: Book): boolean => {
      // Search query filter
      const matchesSearch: boolean =
        book.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(filters.searchQuery.toLowerCase());

      // Genre filter
      const matchesGenre: boolean =
        filters.selectedGenres.length === 0 ||
        filters.selectedGenres.some((genre: string) => book.genre.includes(genre));

      // Price filter - FIXED: Use minPrice and maxPrice instead of priceRange
      const matchesPrice: boolean =
        book.price >= (filters as any).minPrice && 
        book.price <= (filters as any).maxPrice;

      // Rating filter
      const matchesRating: boolean = book.rating >= filters.minRating;

      return matchesSearch && matchesGenre && matchesPrice && matchesRating;
    });

    // Sort books
    filtered.sort((a: Book, b: Book): number => {
      let aValue: string | number | undefined = a[filters.sortBy as keyof Book] as any;
      let bValue: string | number | undefined = b[filters.sortBy as keyof Book] as any;

      // Handle undefined values
      if (aValue === undefined) aValue = '';
      if (bValue === undefined) bValue = '';

      if (filters.sortBy === "price" || filters.sortBy === "rating") {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      if (filters.sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [books, filters]);

  const maxPrice = useMemo((): number => {
    if (!books.length) return 100; // Default max price if no books
    return Math.max(...books.map((book: Book) => book.price));
  }, [books]);

  // BookListItem component for list view
  const BookListItem: React.FC<BookListItemProps> = ({ book }) => {
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      // Add to cart logic here
      console.log('Add to cart:', book.id);
    };

    const handleBookClick = (): void => {
      setSelectedBook(book);
      setIsModalOpen(true);
    };

    return (
      <div 
        className="flex items-center space-x-4 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleBookClick}
      >
        <img
          src={book.coverImage || book.image || book.cover || "/book-placeholder.png"}
          alt={book.title}
          className="w-16 h-20 object-cover rounded-md flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm">{book.author}</p>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {book.description}
          </p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="flex items-center text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              {book.rating}
            </span>
            <span className="text-sm text-gray-600">{book.genre.join(", ")}</span>
            {book.stock > 0 ? (
              <span className="text-sm text-green-600">In Stock ({book.stock})</span>
            ) : (
              <span className="text-sm text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2 flex-shrink-0">
          <span className="text-lg font-bold text-gray-900">${book.price.toFixed(2)}</span>
          <button 
            className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={book.stock === 0}
          >
            {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    );
  };

  // Book Detail Modal
  const BookDetailModal: React.FC<BookDetailModalProps> = () => {
    if (!selectedBook) return null;

    const handleCloseModal = (): void => {
      setIsModalOpen(false);
    };

    const handleAddToCart = (): void => {
      // Add to cart logic here
      console.log('Add to cart:', selectedBook.id);
    };

    const handleAddToWishlist = (): void => {
      // Add to wishlist logic here
      console.log('Add to wishlist:', selectedBook.id);
    };

    const isOutOfStock = selectedBook.stock === 0;

    return (
      <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col md:flex-row">
            {/* Book Cover */}
            <div className="md:w-1/3 p-6">
              <img
                src={selectedBook.coverImage || selectedBook.image || selectedBook.cover || "/book-placeholder.png"}
                alt={selectedBook.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            
            {/* Book Details */}
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedBook.title}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <p className="text-lg text-gray-600 mb-4">by {selectedBook.author}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-lg font-semibold">{selectedBook.rating}</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">${selectedBook.price.toFixed(2)}</span>
                {isOutOfStock ? (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                ) : (
                  <span className="text-green-600 font-medium">In Stock ({selectedBook.stock})</span>
                )}
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBook.genre.map((genre: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Published: {selectedBook.publicationDate || "N/A"}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  Publisher: {selectedBook.publisher || "N/A"}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedBook.description}</p>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button 
                  className="flex-1 border border-gray-600 text-gray-600 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Event handlers for main component
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>, genre: string): void => {
    const newGenres = e.target.checked
      ? [...filters.selectedGenres, genre]
      : filters.selectedGenres.filter((g: string) => g !== genre);
    dispatch(setSelectedGenres(newGenres));
  };

  // FIXED: Use minPrice and maxPrice instead of priceRange
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(
      setPriceRange({
        min: Number(e.target.value),
        max: (filters as any).maxPrice,
      })
    );
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(
      setPriceRange({
        min: (filters as any).minPrice,
        max: Number(e.target.value),
      })
    );
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setMinRating(Number(e.target.value)));
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setSortBy(e.target.value as SortBy));
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setSortOrder(e.target.value as SortOrder));
  };

  const handleResetFilters = (): void => {
    dispatch(resetFilters());
  };

  const handleViewModeChange = (mode: ViewMode): void => {
    setViewMode(mode);
  };

  const handleBookSelect = (book: Book): void => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleClearSearch = (): void => {
    dispatch(setSearchQuery(""));
  };

  const handleClearGenre = (genre: string): void => {
    dispatch(
      setSelectedGenres(
        filters.selectedGenres.filter((g: string) => g !== genre)
      )
    );
  };

  // FIXED: Use minPrice and maxPrice instead of priceRange
  const handleClearPrice = (): void => {
    dispatch(setPriceRange({ min: 0, max: maxPrice }));
  };

  const handleClearRating = (): void => {
    dispatch(setMinRating(0));
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading books...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={handleResetFilters}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Reset
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search books..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>

            {/* Genres */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genres
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {allGenres.map((genre: string) => (
                  <label key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.selectedGenres.includes(genre)}
                      onChange={(e) => handleGenreChange(e, genre)}
                      className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range - FIXED: Use minPrice and maxPrice */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {/* FIXED: Access minPrice and maxPrice directly from filters */}
                Price Range: ${(filters as any).minPrice} - ${(filters as any).maxPrice}
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={(filters as any).minPrice}
                  onChange={handleMinPriceChange}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={(filters as any).maxPrice}
                  onChange={handleMaxPriceChange}
                  className="w-full"
                />
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating: {filters.minRating}+
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.minRating}
                onChange={handleRatingChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Books Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book Store</h1>
              <p className="text-gray-600">
                Showing {filteredBooks.length} of {books.length} books
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="Grid View"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Sort By */}
              <select
                value={filters.sortBy}
                onChange={handleSortByChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="publicationDate">Publication Date</option>
              </select>

              {/* Sort Order */}
              <select
                value={filters.sortOrder}
                onChange={handleSortOrderChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Active Filters - FIXED: Use minPrice and maxPrice */}
          {(filters.searchQuery ||
            filters.selectedGenres.length > 0 ||
            (filters as any).minPrice > 0 ||
            (filters as any).maxPrice < maxPrice ||
            filters.minRating > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Search: "{filters.searchQuery}"
                  <button
                    onClick={handleClearSearch}
                    className="ml-1 hover:text-gray-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.selectedGenres.map((genre: string) => (
                <span
                  key={genre}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {genre}
                  <button
                    onClick={() => handleClearGenre(genre)}
                    className="ml-1 hover:text-gray-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {/* FIXED: Use minPrice and maxPrice */}
              {((filters as any).minPrice > 0 || (filters as any).maxPrice < maxPrice) && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Price: ${(filters as any).minPrice}-${(filters as any).maxPrice}
                  <button
                    onClick={handleClearPrice}
                    className="ml-1 hover:text-gray-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.minRating > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Rating: {filters.minRating}+
                  <button
                    onClick={handleClearRating}
                    className="ml-1 hover:text-gray-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Books Display */}
          {filteredBooks.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {filteredBooks.map((book: Book) => (
                viewMode === 'grid' ? (
                  <div 
                    key={book.id}
                    onClick={() => handleBookSelect(book)}
                    className="cursor-pointer"
                  >
                    <BookCard book={book} />
                  </div>
                ) : (
                  <BookListItem key={book.id} book={book} />
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No books found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Book Detail Modal */}
      {isModalOpen && <BookDetailModal />}
    </div>
  );
};

export default StorePage;