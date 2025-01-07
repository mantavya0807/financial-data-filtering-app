// src/components/DataTable.tsx

import React from 'react';
import { IncomeStatement } from '../types';

interface DataTableProps {
  data: IncomeStatement[];
  sortConfig: SortConfig | null;
  onSort: (key: keyof IncomeStatement) => void;
}

type SortConfig = {
  key: keyof IncomeStatement;
  direction: 'ascending' | 'descending';
} | null;

const DataTable: React.FC<DataTableProps> = ({ data, sortConfig, onSort }) => {
  const getSortIndicator = (key: keyof IncomeStatement) => {
    if (!sortConfig) return null;
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-card dark:bg-card-dark rounded-lg shadow-md">
        <thead>
          <tr>
            <th
              className="py-3 px-6 bg-gray-200 dark:bg-gray-700 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('date')}
            >
              Date {getSortIndicator('date')}
            </th>
            <th
              className="py-3 px-6 bg-gray-200 dark:bg-gray-700 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('revenue')}
            >
              Revenue {getSortIndicator('revenue')}
            </th>
            <th
              className="py-3 px-6 bg-gray-200 dark:bg-gray-700 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('netIncome')}
            >
              Net Income {getSortIndicator('netIncome')}
            </th>
            <th className="py-3 px-6 bg-gray-200 dark:bg-gray-700 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Gross Profit
            </th>
            <th className="py-3 px-6 bg-gray-200 dark:bg-gray-700 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              EPS
            </th>
            <th
              className="py-3 px-6 bg-gray-200 dark:bg-gray-700 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('operatingIncome')}
            >
              Operating Income {getSortIndicator('operatingIncome')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="py-4 px-6 text-center text-gray-500 dark:text-gray-400" colSpan={6}>
                No data available.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.date}
                className="transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-600"
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
  );
};

export default DataTable;
