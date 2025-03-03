'use client'; 

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Crypto {
    id: string;
    name: string;
    current_price: number;
    symbol: string;
    image: string;
}

interface CryptoContextType {
  cryptoData: Crypto[];
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider = ({ children }: { children: ReactNode }) => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get<Crypto[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false'
      );
      setCryptoData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    fetchCryptoData();
  };

  return (
    <CryptoContext.Provider value={{ cryptoData, loading, error, refreshData }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};