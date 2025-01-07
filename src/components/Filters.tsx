// src/components/Filters.tsx

import React, { useState } from 'react';
import { FiltersType } from '../types';

interface FiltersProps {
  onFilter: (filters: FiltersType) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState<number>(2010);
  const [endYear, setEndYear] = useState<number>(currentYear);
  const [revenueMin, setRevenueMin] = useState<number>(0);
  const [revenueMax, setRevenueMax] = useState<number>(Infinity);
  const [netIncomeMin, setNetIncomeMin] = useState<number>(-Infinity);
  const [netIncomeMax, setNetIncomeMax] = useState<number>(Infinity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      startYear,
      endYear,
      revenueMin,
      revenueMax,
      netIncomeMin,
      netIncomeMax,
    });
  };

  const handleReset = () => {
    setStartYear(2010);
    setEndYear(currentYear);
    setRevenueMin(0);
    setRevenueMax(Infinity);
    setNetIncomeMin(-Infinity);
    setNetIncomeMax(Infinity);
    onFilter({
      startYear: 2010,
      endYear: currentYear,
      revenueMin: 0,
      revenueMax: Infinity,
      netIncomeMin: -Infinity,
      netIncomeMax: Infinity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card dark:bg-card-dark p-6 rounded-lg shadow-lg space-y-6 transition-colors duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Year</label>
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            min={2010}
            max={endYear}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Year</label>
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
            className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            min={startYear}
            max={currentYear}
          />
        </div>

        {/* Revenue Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Revenue Min ($)</label>
          <input
            type="number"
            value={revenueMin}
            onChange={(e) => setRevenueMin(Number(e.target.value))}
            className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="0"
            min={0}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Revenue Max ($)</label>
          <input
            type="number"
            value={revenueMax === Infinity ? '' : revenueMax}
            onChange={(e) => setRevenueMax(e.target.value ? Number(e.target.value) : Infinity)}
            className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="No Limit"
            min={revenueMin}
          />
        </div>

        {/* Net Income Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Net Income Min ($)</label>
          <input
            type="number"
            value={netIncomeMin === -Infinity ? '' : netIncomeMin}
            onChange={(e) => setNetIncomeMin(e.target.value ? Number(e.target.value) : -Infinity)}
            className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="-∞"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Net Income Max ($)</label>
          <input
            type="number"
            value={netIncomeMax === Infinity ? '' : netIncomeMax}
            onChange={(e) => setNetIncomeMax(e.target.value ? Number(e.target.value) : Infinity)}
            className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="∞"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
};

export default Filters;
