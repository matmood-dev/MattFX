import { useState, useEffect } from 'react';
import axios from 'axios';
import usePortfolioStore from '../store/portfolioStore';

interface Rates {
  [key: string]: number;
}

const useForexRates = () => {
  const [rates, setRates] = useState<Rates>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const updatePrices = usePortfolioStore((state) => state.updatePrices);

  const fetchRates = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      const newRates = response.data.rates;
      setRates(newRates);
      updatePrices(newRates);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch rates');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [updatePrices]);

  return { rates, loading, error };
};

export default useForexRates;