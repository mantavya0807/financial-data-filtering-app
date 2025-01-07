// src/App.tsx

import React, { useState, useMemo, useEffect } from 'react';
import useFetchData from './hooks/useFetchData.ts';
import DataTable from './components/DataTable.tsx';
import Filters, { FiltersType } from './components/Filters.tsx';
import { IncomeStatement } from './types';
import ClipLoader from 'react-spinners/ClipLoader';

type SortConfig = {
  key: keyof IncomeStatement;
  direction: 'ascending' | 'descending';
} | null;

const App: React.FC = () => {
  const { data, loading, error } = useFetchData();
  const [filters, setFilters] = useState<FiltersType>({
    startYear: 2010,
    endYear: new Date().getFullYear(),
    revenueMin: 0,
    revenueMax: Infinity,
    netIncomeMin: -Infinity,
    netIncomeMax: Infinity,
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleFilter = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const handleSort = (key: keyof IncomeStatement) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const year = new Date(item.date).getFullYear();
      return (
        year >= filters.startYear &&
        year <= filters.endYear &&
        item.revenue >= filters.revenueMin &&
        item.revenue <= filters.revenueMax &&
        item.netIncome >= filters.netIncomeMin &&
        item.netIncome <= filters.netIncomeMax
      );
    });
  }, [data, filters]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // Optional: Automatically switch to dark mode based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-500">
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-primary dark:text-primary-dark">
            Apple Inc. Annual Income Statements
          </h1>
          {/* Optional: Dark Mode Toggle can be added here */}
        </header>
        <Filters onFilter={handleFilter} />
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <ClipLoader size={60} color="#3b82f6" />
          </div>
        )}
        {error && <p className="mt-8 text-center text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <DataTable data={sortedData} sortConfig={sortConfig} onSort={handleSort} />
        )}
      </div>
    </div>
  );
};

export default App;
