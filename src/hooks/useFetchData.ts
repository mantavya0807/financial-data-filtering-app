// src/hooks/useFetchData.ts

import { useState, useEffect } from 'react';
import { IncomeStatement } from '../types';

const useFetchData = () => {
  const [data, setData] = useState<IncomeStatement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncomeStatements = async () => {
      const API_KEY = process.env.REACT_APP_FMP_API_KEY;
      
      if (!API_KEY) {
        setError('API key is not configured');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log('Fetched Data:', jsonData); // Debugging line

        const mappedData: IncomeStatement[] = jsonData.map((item: any) => ({
          date: item.date,
          revenue: item.revenue,
          costOfRevenue: item.costOfRevenue,
          grossProfit: item.grossProfit,
          operatingIncome: item.operatingIncome,
          netIncome: item.netIncome,
          eps: item.eps,
        }));

        console.log('Mapped Data:', mappedData); // Debugging line

        setData(mappedData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeStatements();
  }, []);

  return { data, loading, error };
};

export default useFetchData;
