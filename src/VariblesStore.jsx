import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  status: localStorage.getItem('status') || null,
  ID: localStorage.getItem('ID') || null,

  setToken: (token, status) => {
    localStorage.setItem('token', token);
    localStorage.setItem('status', status);
    set(() => ({ token, status }));
  },
  captureToken: () => {
    const token = localStorage.getItem('token');
    const status = localStorage.getItem('status');
    const ID = localStorage.getItem('ID');
    if (token) {
      set(() => ({ token, status, ID }));
    }
  },
  clearValidacion: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('status');
    set(() => ({ validacion: null }));
  },
  captureTokenFromAPI: (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    set(() => ({ token }));
  },
  captureStatusFromAPI: (status) => {
    localStorage.setItem('status', JSON.stringify(status));
    set(() => ({ status }));
  },
  capturarStatusSMobil: (showOrder) => {
    set(() => ({ showOrder }));
  },
  capturarID: (ID) => {
    localStorage.setItem('ID', JSON.stringify(ID));
    set(() => ({ ID }));
  }
}));
