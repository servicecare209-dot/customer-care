'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingModalState {
  isOpen: boolean;
  service?: string;
  brand?: string;
}

interface BookingContextType {
  modalState: BookingModalState;
  openBookingModal: (serviceName?: string, brandName?: string) => void;
  closeBookingModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<BookingModalState>({
    isOpen: false,
    service: 'Washing Machine Repair',
    brand: 'General',
  });

  const openBookingModal = (serviceName?: string, brandName?: string) => {
    setModalState({
      isOpen: true,
      service: serviceName || 'Washing Machine Repair',
      brand: brandName || 'General',
    });
  };

  const closeBookingModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <BookingContext.Provider value={{ modalState, openBookingModal, closeBookingModal }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingModal must be used within a BookingProvider');
  }
  return context;
}
