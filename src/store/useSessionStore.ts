import { create } from 'zustand';
import { PredictionResponse, MetricsResponse } from '@/lib/api';

interface SessionState {
  // UI State
  isDarkMode: boolean;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  currentBin: string | null;
  
  // Data State
  lastPrediction: PredictionResponse | null;
  predictions: PredictionResponse[];
  metrics: MetricsResponse | null;
  
  // Actions
  setDarkMode: (isDark: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentBin: (bin: string) => void;
  logout: () => void;
  setLastPrediction: (prediction: PredictionResponse | null) => void;
  addPrediction: (prediction: PredictionResponse) => void;
  setMetrics: (metrics: MetricsResponse) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  // Initial state
  isDarkMode: true,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  currentBin: null,
  lastPrediction: null,
  predictions: [],
  metrics: null,

  // Actions
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setCurrentBin: (bin) => set({ currentBin: bin, isLoggedIn: true }),
  logout: () => set({ 
    isLoggedIn: false, 
    currentBin: null,
    lastPrediction: null,
    predictions: [],
    metrics: null,
    error: null,
  }),
  setLastPrediction: (prediction) => set({ lastPrediction: prediction }),
  addPrediction: (prediction) => set((state) => ({
    predictions: [...state.predictions, prediction],
    lastPrediction: prediction,
  })),
  setMetrics: (metrics) => set({ metrics }),
  clearSession: () => set({
    lastPrediction: null,
    predictions: [],
    metrics: null,
    error: null,
  }),
}));
