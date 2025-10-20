import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BookOpen, 
  ShoppingCart, 
  ClipboardList, 
  Menu, 
  X, 
  Search,
  Plus,
  Edit,
  Trash2,
  User,
  LogOut,
  Save,
  Loader,
  Mail,
  RefreshCw,
  Eye,
  Calendar,
  Hash,
  Globe,
  Building,
  Tag
} from 'lucide-react';

// Types based on your exact Pydantic schemas
interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
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

interface CartItem {
  id: number;
  user_id: number;
  book_id: number;
  quantity: number;
  book?: Book;
}

interface ServiceRequest {
  id: number;
  user_id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  price: number;
  contact_email: string;
  status: string;
}

// Create types matching your Pydantic schemas
interface BookCreate {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
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

interface CartItemCreate {
  user_id: number;
  book_id: number;
  quantity: number;
}

interface ServiceRequestCreate {
  user_id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  price: number;
  contact_email: string;
}

interface ApiResponse<T> {
  total: number;
  items: T[];
}

interface DashboardStats {
  totalBooks: number;
  totalCartItems: number;
  totalServiceRequests: number;
}

// Axios instance with auth token
const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'books' | 'cart' | 'requests'>('books');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    totalCartItems: 0,
    totalServiceRequests: 0
  });
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Form states
  const [bookForm, setBookForm] = useState<BookCreate>({
    title: '',
    author: '',
    genre: '',
    publication_date: '',
    price: 0,
    rating: 0,
    description: '',
    image: '',
    isbn: '',
    pages: 0,
    language: '',
    publisher: '',
    stock: 0
  });

  const [cartForm, setCartForm] = useState<CartItemCreate>({
    user_id: 1,
    book_id: 0,
    quantity: 1
  });

  const [serviceRequestForm, setServiceRequestForm] = useState<ServiceRequestCreate>({
    user_id: 1,
    title: '',
    author: '',
    genre: '',
    description: '',
    price: 0,
    contact_email: ''
  });

  const itemsPerPage = 10;

  // Fetch all data on component mount and when active section changes
  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch section-specific data when page or search term changes
  useEffect(() => {
    fetchSectionData();
  }, [activeSection, currentPage, searchTerm]);

  const fetchAllData = async () => {
    try {
      await Promise.all([
        fetchBooksStats(),
        fetchCartStats(),
        fetchServiceRequestsStats()
      ]);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const fetchBooksStats = async () => {
    try {
      const response = await api.get<ApiResponse<Book>>('/books/', {
        params: { skip: 0, limit: 1 }
      });
      setStats(prev => ({ ...prev, totalBooks: response.data.total }));
    } catch (error) {
      console.error('Error fetching books stats:', error);
    }
  };

  const fetchCartStats = async () => {
    try {
      const response = await api.get<ApiResponse<CartItem>>('/cart/', {
        params: { skip: 0, limit: 1 }
      });
      setStats(prev => ({ ...prev, totalCartItems: response.data.total }));
    } catch (error) {
      console.error('Error fetching cart stats:', error);
    }
  };

  const fetchServiceRequestsStats = async () => {
    try {
      const response = await api.get<ApiResponse<ServiceRequest>>('/service-requests/', {
        params: { skip: 0, limit: 1 }
      });
      setStats(prev => ({ ...prev, totalServiceRequests: response.data.total }));
    } catch (error) {
      console.error('Error fetching service requests stats:', error);
    }
  };

  const fetchSectionData = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * itemsPerPage;
      
      switch (activeSection) {
        case 'books':
          const booksResponse = await api.get<ApiResponse<Book>>('/books/', {
            params: { 
              skip, 
              limit: itemsPerPage, 
              title: searchTerm || undefined 
            }
          });
          setBooks(booksResponse.data.items);
          setTotalItems(booksResponse.data.total);
          setStats(prev => ({ ...prev, totalBooks: booksResponse.data.total }));
          break;
        
        case 'cart':
          const cartResponse = await api.get<ApiResponse<CartItem>>('/cart/', {
            params: { skip, limit: itemsPerPage }
          });
          setCartItems(cartResponse.data.items);
          setTotalItems(cartResponse.data.total);
          setStats(prev => ({ ...prev, totalCartItems: cartResponse.data.total }));
          break;
        
        case 'requests':
          const requestsResponse = await api.get<ApiResponse<ServiceRequest>>('/service-requests/', {
            params: { 
              skip, 
              limit: itemsPerPage, 
              title: searchTerm || undefined 
            }
          });
          setServiceRequests(requestsResponse.data.items);
          setTotalItems(requestsResponse.data.total);
          setStats(prev => ({ ...prev, totalServiceRequests: requestsResponse.data.total }));
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const refreshAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchBooksStats(),
        fetchCartStats(),
        fetchServiceRequestsStats(),
        fetchSectionData()
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setModalType('add');
    setEditingItem(null);
    setBookForm({
      title: '',
      author: '',
      genre: '',
      publication_date: new Date().toISOString().split('T')[0],
      price: 0,
      rating: 0,
      description: '',
      image: '',
      isbn: '',
      pages: 0,
      language: 'English',
      publisher: '',
      stock: 0
    });
    setCartForm({ user_id: 1, book_id: 0, quantity: 1 });
    setServiceRequestForm({
      user_id: 1,
      title: '',
      author: '',
      genre: '',
      description: '',
      price: 0,
      contact_email: ''
    });
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setModalType('edit');
    setEditingItem(item);
    
    switch (activeSection) {
      case 'books':
        setBookForm({
          title: item.title,
          author: item.author,
          genre: item.genre,
          publication_date: item.publication_date,
          price: item.price,
          rating: item.rating,
          description: item.description,
          image: item.image,
          isbn: item.isbn,
          pages: item.pages,
          language: item.language,
          publisher: item.publisher,
          stock: item.stock
        });
        break;
      case 'cart':
        setCartForm({
          user_id: item.user_id,
          book_id: item.book_id,
          quantity: item.quantity
        });
        break;
      case 'requests':
        setServiceRequestForm({
          user_id: item.user_id,
          title: item.title,
          author: item.author,
          genre: item.genre,
          description: item.description,
          price: item.price,
          contact_email: item.contact_email
        });
        break;
    }
    setShowModal(true);
  };

  const handleViewDetails = (item: any) => {
    setModalType('view');
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      switch (activeSection) {
        case 'books':
          await api.delete(`/books/${id}`);
          setBooks(books.filter(book => book.id !== id));
          setStats(prev => ({ ...prev, totalBooks: prev.totalBooks - 1 }));
          break;
        case 'cart':
          await api.delete(`/cart/${id}`);
          setCartItems(cartItems.filter(item => item.id !== id));
          setStats(prev => ({ ...prev, totalCartItems: prev.totalCartItems - 1 }));
          break;
        case 'requests':
          await api.delete(`/service-requests/${id}`);
          setServiceRequests(serviceRequests.filter(req => req.id !== id));
          setStats(prev => ({ ...prev, totalServiceRequests: prev.totalServiceRequests - 1 }));
          break;
      }
      alert('Item deleted successfully!');
      refreshAllData();
    } catch (error: any) {
      console.error('Error deleting item:', error);
      alert(`Error deleting item: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);

    try {
      switch (activeSection) {
        case 'books':
          if (modalType === 'add') {
            const response = await api.post<Book>('/books/', bookForm);
            setBooks(prev => [response.data, ...prev]);
            setStats(prev => ({ ...prev, totalBooks: prev.totalBooks + 1 }));
            alert('Book added successfully!');
          } else {
            const response = await api.put<Book>(`/books/${editingItem.id}`, bookForm);
            setBooks(prev => prev.map(b => b.id === editingItem.id ? response.data : b));
            alert('Book updated successfully!');
          }
          break;

        case 'cart':
          if (modalType === 'add') {
            const response = await api.post<CartItem>('/cart/', cartForm);
            setCartItems(prev => [response.data, ...prev]);
            setStats(prev => ({ ...prev, totalCartItems: prev.totalCartItems + 1 }));
            alert('Cart item added successfully!');
          } else {
            const response = await api.put<CartItem>(`/cart/${editingItem.id}`, cartForm);
            setCartItems(prev => prev.map(c => c.id === editingItem.id ? response.data : c));
            alert('Cart item updated successfully!');
          }
          break;

        case 'requests':
          if (modalType === 'add') {
            const response = await api.post<ServiceRequest>('/service-requests/', serviceRequestForm);
            setServiceRequests(prev => [response.data, ...prev]);
            setStats(prev => ({ ...prev, totalServiceRequests: prev.totalServiceRequests + 1 }));
            alert('Service request added successfully!');
          } else {
            const updateData = {
              ...serviceRequestForm,
              status: editingItem.status
            };
            const response = await api.put<ServiceRequest>(`/service-requests/${editingItem.id}`, updateData);
            setServiceRequests(prev => prev.map(sr => sr.id === editingItem.id ? response.data : sr));
            alert('Service request updated successfully!');
          }
          break;
      }

      setShowModal(false);
      await refreshAllData();
    } catch (error: any) {
      console.error('Error saving item:', error);
      const errorDetail = error.response?.data?.detail;
      if (Array.isArray(errorDetail)) {
        const errorMessages = errorDetail.map((err: any) => 
          `${err.loc.join('.')}: ${err.msg}`
        ).join('\n');
        alert(`Validation errors:\n${errorMessages}`);
      } else {
        alert(`Error saving item: ${errorDetail || error.message}`);
      }
    } finally {
      setModalLoading(false);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderBooksTable = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Books Management</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Add Book</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Author</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Genre</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Rating</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 font-medium">{book.title}</td>
                <td className="px-6 py-4 text-gray-700">{book.author}</td>
                <td className="px-6 py-4 text-gray-700">{book.genre}</td>
                <td className="px-6 py-4 text-gray-700">${book.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-700">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    book.stock > 10 ? 'bg-green-100 text-green-800' :
                    book.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {book.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{book.rating}/5</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => handleViewDetails(book)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                      onClick={() => handleEdit(book)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => handleDelete(book.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCartTable = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Add Cart Item</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">User ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Book ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 font-medium">{item.user_id}</td>
                <td className="px-6 py-4 text-gray-700">{item.book_id}</td>
                <td className="px-6 py-4 text-gray-700">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {item.quantity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => handleViewDetails(item)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                      onClick={() => handleEdit(item)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => handleDelete(item.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderServiceRequestsTable = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Service Requests</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Add Request</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Author</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Genre</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Contact Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((request) => (
              <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 font-medium">{request.title}</td>
                <td className="px-6 py-4 text-gray-700">{request.author}</td>
                <td className="px-6 py-4 text-gray-700">{request.genre}</td>
                <td className="px-6 py-4 text-gray-700">${request.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center space-x-1">
                    <Mail size={14} className="text-gray-400" />
                    <span>{request.contact_email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'completed' ? 'bg-green-100 text-green-800' :
                    request.status === 'in_progress' ? 'bg-slate-100 text-slate-800' :
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => handleViewDetails(request)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                      onClick={() => handleEdit(request)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => handleDelete(request.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderModal = () => {
    const getModalTitle = () => {
      const action = modalType === 'add' ? 'Add' : modalType === 'edit' ? 'Edit' : 'View Details';
      switch (activeSection) {
        case 'books': return `${action} Book`;
        case 'cart': return `${action} Cart Item`;
        case 'requests': return `${action} Service Request`;
        default: return `${action} Item`;
      }
    };

    const renderBookDetails = () => (
      <div className="space-y-6">
        {editingItem.image && (
          <div className="flex justify-center">
            <img 
              src={editingItem.image} 
              alt={editingItem.title}
              className="h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
                {editingItem.title}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
                {editingItem.author}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
                {editingItem.genre}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Publication Date</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 flex items-center space-x-2">
                <Calendar size={16} className="text-gray-400" />
                <span>{new Date(editingItem.publication_date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
                ${editingItem.price.toFixed(2)}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{editingItem.rating}/5</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  editingItem.stock > 10 ? 'bg-green-100 text-green-800' :
                  editingItem.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {editingItem.stock} units
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 flex items-center space-x-2">
                <Hash size={16} className="text-gray-400" />
                <span>{editingItem.pages} pages</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
              {editingItem.isbn}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 flex items-center space-x-2">
              <Globe size={16} className="text-gray-400" />
              <span>{editingItem.language}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 flex items-center space-x-2">
              <Building size={16} className="text-gray-400" />
              <span>{editingItem.publisher}</span>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 max-h-32 overflow-y-auto">
            {editingItem.description}
          </div>
        </div>
      </div>
    );

    const renderCartDetails = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
              {editingItem.user_id}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Book ID</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
              {editingItem.book_id}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {editingItem.quantity} items
            </span>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-yellow-800">
            <Tag size={16} />
            <span className="text-sm font-medium">Cart Item Information</span>
          </div>
          <p className="text-yellow-700 text-sm mt-2">
            This cart item represents {editingItem.quantity} unit(s) of book ID {editingItem.book_id} 
            in user {editingItem.user_id}'s shopping cart.
          </p>
        </div>
      </div>
    );

    const renderServiceRequestDetails = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
              {editingItem.user_id}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                editingItem.status === 'completed' ? 'bg-green-100 text-green-800' :
                editingItem.status === 'in_progress' ? 'bg-slate-100 text-slate-800' :
                editingItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {editingItem.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
            {editingItem.title}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
              {editingItem.author}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
              {editingItem.genre}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
              ${editingItem.price.toFixed(2)}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 flex items-center space-x-2">
              <Mail size={16} className="text-gray-400" />
              <span>{editingItem.contact_email}</span>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 max-h-32 overflow-y-auto">
            {editingItem.description}
          </div>
        </div>
      </div>
    );

    const renderBookForm = () => (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={bookForm.title}
              onChange={(e) => setBookForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
            <input
              type="text"
              value={bookForm.author}
              onChange={(e) => setBookForm(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
            <input
              type="text"
              value={bookForm.genre}
              onChange={(e) => setBookForm(prev => ({ ...prev, genre: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Publication Date *</label>
            <input
              type="date"
              value={bookForm.publication_date}
              onChange={(e) => setBookForm(prev => ({ ...prev, publication_date: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
            <input
              type="number"
              step="0.01"
              value={bookForm.price}
              onChange={(e) => setBookForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={bookForm.rating}
              onChange={(e) => setBookForm(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            value={bookForm.description}
            onChange={(e) => setBookForm(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ISBN *</label>
            <input
              type="text"
              value={bookForm.isbn}
              onChange={(e) => setBookForm(prev => ({ ...prev, isbn: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pages *</label>
            <input
              type="number"
              value={bookForm.pages}
              onChange={(e) => setBookForm(prev => ({ ...prev, pages: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language *</label>
            <input
              type="text"
              value={bookForm.language}
              onChange={(e) => setBookForm(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Publisher *</label>
            <input
              type="text"
              value={bookForm.publisher}
              onChange={(e) => setBookForm(prev => ({ ...prev, publisher: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
            <input
              type="number"
              value={bookForm.stock}
              onChange={(e) => setBookForm(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              value={bookForm.image}
              onChange={(e) => setBookForm(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    );

    const renderCartForm = () => (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">User ID *</label>
          <input
            type="number"
            value={cartForm.user_id}
            onChange={(e) => setCartForm(prev => ({ ...prev, user_id: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Book ID *</label>
          <input
            type="number"
            value={cartForm.book_id}
            onChange={(e) => setCartForm(prev => ({ ...prev, book_id: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
          <input
            type="number"
            min="1"
            value={cartForm.quantity}
            onChange={(e) => setCartForm(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            required
          />
        </div>
      </div>
    );

    const renderServiceRequestForm = () => (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">User ID *</label>
          <input
            type="number"
            value={serviceRequestForm.user_id}
            onChange={(e) => setServiceRequestForm(prev => ({ ...prev, user_id: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            value={serviceRequestForm.title}
            onChange={(e) => setServiceRequestForm(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
            <input
              type="text"
              value={serviceRequestForm.author}
              onChange={(e) => setServiceRequestForm(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
            <input
              type="text"
              value={serviceRequestForm.genre}
              onChange={(e) => setServiceRequestForm(prev => ({ ...prev, genre: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            value={serviceRequestForm.description}
            onChange={(e) => setServiceRequestForm(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
            <input
              type="number"
              step="0.01"
              value={serviceRequestForm.price}
              onChange={(e) => setServiceRequestForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
            <input
              type="email"
              value={serviceRequestForm.contact_email}
              onChange={(e) => setServiceRequestForm(prev => ({ ...prev, contact_email: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`bg-white rounded-lg w-full max-h-[90vh] overflow-y-auto shadow-xl ${
          modalType === 'view' ? 'max-w-4xl' : 'max-w-2xl'
        }`}>
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{getModalTitle()}</h2>
            <button 
              onClick={() => setShowModal(false)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          {modalType === 'view' ? (
            <div className="p-6">
              {activeSection === 'books' && renderBookDetails()}
              {activeSection === 'cart' && renderCartDetails()}
              {activeSection === 'requests' && renderServiceRequestDetails()}
              
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6">
              {activeSection === 'books' && renderBookForm()}
              {activeSection === 'cart' && renderCartForm()}
              {activeSection === 'requests' && renderServiceRequestForm()}
              
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="flex-1 flex items-center justify-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {modalLoading ? (
                    <Loader className="animate-spin" size={20} />
                  ) : (
                    <Save size={20} />
                  )}
                  <span>{modalLoading ? 'Saving...' : 'Save'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={modalLoading}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-700">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">BookStore Admin</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveSection('books')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'books' 
                ? 'bg-slate-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <BookOpen size={20} />
            <span>Books</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
              >
                <Menu size={24} />
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshAllData}
                disabled={loading}
                className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh Data"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
                <button onClick={()=>window.location.href = "/login"} className="text-gray-500 hover:text-gray-700">
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-500"></div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg p-6 border-l-4 border-slate-500 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Books</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stats.totalBooks}
                      </p>
                    </div>
                    <BookOpen className="text-slate-500" size={32} />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg hidden p-6 border-l-4 border-green-500 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Cart Items</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stats.totalCartItems}
                      </p>
                    </div>
                    <ShoppingCart className="text-green-500" size={32} />
                  </div>
                </div>
                
                <div className="bg-white hidden rounded-lg p-6 border-l-4 border-purple-500 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Service Requests</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stats.totalServiceRequests}
                      </p>
                    </div>
                    <ClipboardList className="text-purple-500" size={32} />
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="mb-6">
                {activeSection === 'books' && renderBooksTable()}
                {activeSection === 'cart' && renderCartTable()}
                {activeSection === 'requests' && renderServiceRequestsTable()}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && renderModal()}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;