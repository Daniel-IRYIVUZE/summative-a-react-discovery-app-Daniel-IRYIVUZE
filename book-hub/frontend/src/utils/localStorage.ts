import { sampleBooks } from '../data/books';

export const initializeBooks = () => {
  if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify(sampleBooks));
  }
  
  if (!localStorage.getItem('bookHubUsers')) {
    localStorage.setItem('bookHubUsers', JSON.stringify([]));
  }
};

export const getBooks = () => {
  return JSON.parse(localStorage.getItem('books') || '[]');
};

export const getBookById = (id: string) => {
  const books = getBooks();
  return books.find((book: any) => book.id === id);
};

export const addBook = (book: any) => {
  const books = getBooks();
  const newBook = {
    ...book,
    id: Date.now().toString(),
    stock: 10,
  };
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
  return newBook;
};