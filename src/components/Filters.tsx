import React, { useState, useRef, useEffect } from 'react';
import { FiltersType } from '../types';
import { FaCalendarAlt, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import { Transition } from '@headlessui/react';

interface FiltersProps {
  onFilter: (filters: FiltersType) => void;
}

const YearPicker: React.FC<{
  label: string;
  year: number;
  setYear: (year: number) => void;
  minYear: number;
  maxYear: number;
}> = ({ label, year, setYear, minYear, maxYear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const years = [];
  for (let y = minYear; y <= maxYear; y++) {
    years.push(y);
  }

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        onClick={() => setIsOpen(!isOpen)}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex items-center space-x-2"
      >
        <FaCalendarAlt />
        <span>{label}</span>
      </label>
      <input
        type="text"
        value={year}
        readOnly
        className="mt-1 p-3 border rounded-md w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute z-10 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md max-h-60 w-full overflow-auto shadow-lg">
          {years.map((y) => (
            <div
              key={y}
              onClick={() => {
                setYear(y);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-primary hover:text-white dark:hover:bg-primary ${
                y === year ? 'bg-primary text-white' : ''
              }`}
            >
              {y}
            </div>
          ))}
        </div>
      </Transition>
    </div>
  );
};

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState<number>(2010);
  const [endYear, setEndYear] = useState<number>(currentYear);
  const [revenueMin, setRevenueMin] = useState<number>(0);
  const [revenueMax, setRevenueMax] = useState<number>(Infinity);
  const [netIncomeMin, setNetIncomeMin] = useState<number>(-Infinity);
  const [netIncomeMax, setNetIncomeMax] = useState<number>(Infinity);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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
    setShowResetConfirm(false);
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="bg-card dark:bg-card-dark p-6 rounded-lg shadow-lg space-y-6 transition-colors duration-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date Range */}
          <div>
            <YearPicker
              label="Start Year"
              year={startYear}
              setYear={setStartYear}
              minYear={2010}
              maxYear={endYear}
            />
          </div>
          <div>
            <YearPicker
              label="End Year"
              year={endYear}
              setYear={setEndYear}
              minYear={startYear}
              maxYear={currentYear}
            />
          </div>

          {/* Revenue Range */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
              <FaMoneyBillWave />
              <span>Revenue Min ($)</span>
            </label>
            <input
              type="number"
              value={revenueMin}
              onChange={(e) => setRevenueMin(Number(e.target.value))}
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition-transform transform hover:scale-105"
              placeholder="0"
              min={0}
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
              <FaMoneyBillWave />
              <span>Revenue Max ($)</span>
            </label>
            <input
              type="number"
              value={revenueMax === Infinity ? '' : revenueMax}
              onChange={(e) =>
                setRevenueMax(e.target.value ? Number(e.target.value) : Infinity)
              }
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition-transform transform hover:scale-105"
              placeholder="No Limit"
              min={revenueMin}
            />
          </div>

          {/* Net Income Range */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
              <FaChartLine />
              <span>Net Income Min ($)</span>
            </label>
            <input
              type="number"
              value={netIncomeMin === -Infinity ? '' : netIncomeMin}
              onChange={(e) =>
                setNetIncomeMin(
                  e.target.value ? Number(e.target.value) : -Infinity
                )
              }
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition-transform transform hover:scale-105"
              placeholder="-∞"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
              <FaChartLine />
              <span>Net Income Max ($)</span>
            </label>
            <input
              type="number"
              value={netIncomeMax === Infinity ? '' : netIncomeMax}
              onChange={(e) =>
                setNetIncomeMax(
                  e.target.value ? Number(e.target.value) : Infinity
                )
              }
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition-transform transform hover:scale-105"
              placeholder="∞"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300 transform hover:scale-105"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300 transform hover:scale-105"
          >
            Reset Filters
          </button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      <Transition
        show={showResetConfirm}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Confirm Reset
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Are you sure you want to reset all filters to their default values?
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Filters;
