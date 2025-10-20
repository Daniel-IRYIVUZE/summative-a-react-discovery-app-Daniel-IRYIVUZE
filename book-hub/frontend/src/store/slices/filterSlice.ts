import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FilterState } from '../../types';

const initialState: FilterState = {
  searchQuery: '',
  selectedGenres: [],
  minPrice: 0,
  maxPrice: 100,
  minRating: 0,
  sortBy: 'title',
  sortOrder: 'asc',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<any>) => {
      state.searchQuery = action.payload;
    },
    setSelectedGenres: (state, action: PayloadAction<any[]>) => {
      state.selectedGenres = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: any; max: any }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setMinRating: (state, action: PayloadAction<any>) => {
      state.minRating = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedGenres = [];
      state.minPrice = 0;
      state.maxPrice = 100;
      state.minRating = 0;
      state.sortBy = 'title';
      state.sortOrder = 'asc';
    },
  },
});

export const {
  setSearchQuery,
  setSelectedGenres,
  setPriceRange,
  setMinRating,
  setSortBy,
  setSortOrder,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;