// Book related types
export interface Book {
  id: string | number; // Updated to handle both string and number IDs
  title: string;
  author: string;
  genre: string | string[]; // Can be string (comma-separated) or array
  publicationDate: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  isbn: string;
  
  pages: number;
  language: string;
  publisher: string;
  stock: number;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cart: CartItem[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface FilterState {
  searchQuery: string;
  selectedGenres: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'title' | 'author' | 'price' | 'rating' | 'publicationDate';
  sortOrder: 'asc' | 'desc';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
}