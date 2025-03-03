'use client';

import { useState } from 'react';
import { useCrypto } from '../context/CryptoContext';

const CryptoDashboard = () => {
  const { cryptoData, loading, error, refreshData } = useCrypto();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  const filteredData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Crypto Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={refreshData} className="refresh-button">
          Refresh
        </button>
      </div>
      <ul className="crypto-list">
        {filteredData.map((crypto) => (
          <li key={crypto.id} className="crypto-item">
            <div className="crypto-info">
              <img src={crypto.image} alt={crypto.name} className="crypto-image" />
              <div>
                <p className="crypto-name">{crypto.name}</p>
                <p className="crypto-symbol">{crypto.symbol.toUpperCase()}</p>
              </div>
            </div>
            <p className="crypto-price">${crypto.current_price.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoDashboard;