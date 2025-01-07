import React, { useState, useMemo } from 'react';
import { IncomeStatement } from '../types';
import { FaSort, FaSortUp, FaSortDown, FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Transition } from '@headlessui/react';

interface DataTableProps {
  data: IncomeStatement[];
  sortConfig: SortConfig | null;
  onSort: (key: keyof IncomeStatement) => void;
  onSelect: (item: IncomeStatement) => void; // New prop for selection
}

type SortConfig = {
  key: keyof IncomeStatement;
  direction: 'ascending' | 'descending';
} | null;

// Pagination constants
const ITEMS_PER_PAGE = 10;

// Sortable Header Component
const SortableHeader: React.FC<{
  label: string;
  sortKey: keyof IncomeStatement;
  sortConfig: SortConfig | null;
  onSort: (key: keyof IncomeStatement) => void;
}> = ({ label, sortKey, sortConfig, onSort }) => {
  const isActive = sortConfig?.key === sortKey;
  const direction = sortConfig?.direction;

  return (
    <th
      className="py-3 px-6 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none"
      onClick={() => onSort(sortKey)}
      aria-sort={
        isActive
          ? direction === 'ascending'
            ? 'ascending'
            : 'descending'
          : 'none'
      }
    >
      <div className="flex items-center">
        {label}
        <span className="ml-1">
          {!isActive && <FaSort />}
          {isActive && direction === 'ascending' && <FaSortUp />}
          {isActive && direction === 'descending' && <FaSortDown />}
        </span>
      </div>
    </th>
  );
};

const DataTable: React.FC<DataTableProps> = ({ data, sortConfig, onSort, onSelect }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Memoize filtered data for performance
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Get current page data
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // Handle sorting indicator
  // (Already handled in SortableHeader component)

  // Handle page navigation
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="mt-8">
      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            aria-label="Search"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-card dark:bg-card-dark rounded-lg shadow-md">
          <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 z-10">
            <tr>
              <SortableHeader
                label="Date"
                sortKey="date"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <SortableHeader
                label="Revenue"
                sortKey="revenue"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <SortableHeader
                label="Net Income"
                sortKey="netIncome"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Gross Profit
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                EPS
              </th>
              <SortableHeader
                label="Operating Income"
                sortKey="operatingIncome"
                sortConfig={sortConfig}
                onSort={onSort}
              />
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td className="py-4 px-6 text-center text-gray-500 dark:text-gray-400" colSpan={6}>
                  No data available.
                </td>
              </tr>
            ) : (
              currentData.map((item, index) => (
                <tr
                  key={`${item.date}-${index}`}
                  className="transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => onSelect(item)} // Handle row click
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelect(item);
                    }
                  }}
                >
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-200">{item.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-200">
                    {item.revenue !== undefined && item.revenue !== null
                      ? `$${item.revenue.toLocaleString()}`
                      : 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-200">
                    {item.netIncome !== undefined && item.netIncome !== null
                      ? `$${item.netIncome.toLocaleString()}`
                      : 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-200">
                    {item.grossProfit !== undefined && item.grossProfit !== null
                      ? `$${item.grossProfit.toLocaleString()}`
                      : 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-200">
                    {item.eps !== undefined && item.eps !== null ? item.eps : 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-200">
                    {item.operatingIncome !== undefined && item.operatingIncome !== null
                      ? `$${item.operatingIncome.toLocaleString()}`
                      : 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark transition-colors duration-300'
              }`}
              aria-label="Previous Page"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark transition-colors duration-300'
              }`}
              aria-label="Next Page"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
