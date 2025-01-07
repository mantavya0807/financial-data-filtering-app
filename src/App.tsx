import React, { useState, useMemo, useEffect } from 'react';
import useFetchData from './hooks/useFetchData.ts';
import DataTable from './components/DataTable.tsx';
import Filters from './components/Filters.tsx';
import IncomeStatementDetail from './components/IncomeStatementDetail.tsx';
import { IncomeStatement, FiltersType } from './types';
import ClipLoader from 'react-spinners/ClipLoader';
import ThemeToggle from './components/ThemeToggle.tsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

type SortConfig = {
  key: keyof IncomeStatement;
  direction: 'ascending' | 'descending';
} | null;

const App: React.FC = () => {
  const { data, loading, error, refetch } = useFetchData();
  const [filters, setFilters] = useState<FiltersType>({
    startYear: 2010,
    endYear: new Date().getFullYear(),
    revenueMin: 0,
    revenueMax: Infinity,
    netIncomeMin: -Infinity,
    netIncomeMax: Infinity,
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [selectedItem, setSelectedItem] = useState<IncomeStatement | null>(null); // New state for selected item

  const handleFilter = (newFilters: FiltersType) => {
    setFilters(newFilters);
    toast.success('Filters applied successfully!');
  };

  const handleSort = (key: keyof IncomeStatement) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSelect = (item: IncomeStatement) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
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
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // Handle dark mode based on system preference or user selection
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Handle error notification
  useEffect(() => {
    if (error) {
      toast.error(
        <div className="flex items-center space-x-2">
          <FaExclamationTriangle className="text-red-500" />
          <span>Error: {error}</span>
        </div>
      );
    }
  }, [error]);

  // Handle data fetching success
  useEffect(() => {
    if (!loading && !error && data.length > 0) {
      toast.success('Data loaded successfully!');
    }
  }, [loading, error, data]);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-500">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="container mx-auto p-6">
        <header className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-primary dark:text-primary-dark mb-4 md:mb-0">
            Apple Inc. Annual Income Statements
          </h1>
          <ThemeToggle />
        </header>
        <Filters onFilter={handleFilter} />
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <ClipLoader size={60} color="#3b82f6" />
          </div>
        )}
        {!loading && error && (
          <div className="flex flex-col items-center mt-8 text-center text-red-500 dark:text-red-400">
            <FaExclamationTriangle className="text-4xl mb-4" />
            <p className="mb-4">Oops! Something went wrong while fetching data.</p>
            <button
              onClick={() => refetch()}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
            >
              <FaRedo className="mr-2" /> Retry
            </button>
          </div>
        )}
        {!loading && !error && (
          <div className="mt-8">
            <DataTable
              data={sortedData}
              sortConfig={sortConfig}
              onSort={handleSort}
              onSelect={handleSelect} // Pass the selection handler
            />
          </div>
        )}

        {/* Detailed View Modal */}
        {selectedItem && (
          <IncomeStatementDetail item={selectedItem} onClose={handleCloseDetail} />
        )}
      </div>
    </div>
  );
};

export default App;
