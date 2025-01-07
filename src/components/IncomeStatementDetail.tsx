import React, { Fragment } from 'react';
import { IncomeStatement } from '../types';
import { FaTimes } from 'react-icons/fa';
import { Dialog, Transition } from '@headlessui/react';

interface IncomeStatementDetailProps {
  item: IncomeStatement;
  onClose: () => void;
}

const IncomeStatementDetail: React.FC<IncomeStatementDetailProps> = ({ item, onClose }) => {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center bg-black bg-opacity-50">
          {/* This element is to center the modal contents */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-card dark:bg-card-dark shadow-xl rounded-lg">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:outline-none"
                aria-label="Close Modal"
              >
                <FaTimes size={20} />
              </button>

              <Dialog.Title
                as="h3"
                className="text-2xl font-bold mb-4 text-primary dark:text-primary-dark"
              >
                Income Statement Details - {item.calendarYear}
              </Dialog.Title>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Information */}
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-primary dark:text-primary-dark">Basic Information</h4>
                  <ul className="space-y-1">
                    <li><strong>Date:</strong> {item.date}</li>
                    <li><strong>Symbol:</strong> {item.symbol}</li>
                    <li><strong>Reported Currency:</strong> {item.reportedCurrency}</li>
                    <li><strong>CIK:</strong> {item.cik}</li>
                    <li><strong>Filing Date:</strong> {item.fillingDate}</li>
                    <li><strong>Accepted Date:</strong> {item.acceptedDate}</li>
                    <li><strong>Calendar Year:</strong> {item.calendarYear}</li>
                    <li><strong>Period:</strong> {item.period}</li>
                  </ul>
                </div>

                {/* Financial Metrics */}
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-primary dark:text-primary-dark">Financial Metrics</h4>
                  <ul className="space-y-1">
                    <li><strong>Revenue:</strong> ${item.revenue.toLocaleString()}</li>
                    <li><strong>Cost of Revenue:</strong> ${item.costOfRevenue.toLocaleString()}</li>
                    <li><strong>Gross Profit:</strong> ${item.grossProfit.toLocaleString()}</li>
                    <li><strong>Gross Profit Ratio:</strong> {(item.grossProfitRatio * 100).toFixed(2)}%</li>
                    <li><strong>Research & Development Expenses:</strong> ${item.researchAndDevelopmentExpenses.toLocaleString()}</li>
                    <li><strong>Selling General & Administrative Expenses:</strong> ${item.sellingGeneralAndAdministrativeExpenses.toLocaleString()}</li>
                    <li><strong>Operating Expenses:</strong> ${item.operatingExpenses.toLocaleString()}</li>
                    <li><strong>Operating Income:</strong> ${item.operatingIncome.toLocaleString()}</li>
                    <li><strong>Operating Income Ratio:</strong> {(item.operatingIncomeRatio * 100).toFixed(2)}%</li>
                    <li><strong>Net Income:</strong> ${item.netIncome.toLocaleString()}</li>
                    <li><strong>Net Income Ratio:</strong> {(item.netIncomeRatio * 100).toFixed(2)}%</li>
                    <li><strong>EPS:</strong> {item.eps}</li>
                    <li><strong>EPS Diluted:</strong> {item.epsdiluted}</li>
                  </ul>
                </div>

                {/* Additional Information */}
                <div className="md:col-span-2">
                  <h4 className="text-xl font-semibold mb-2 text-primary dark:text-primary-dark">Additional Information</h4>
                  <ul className="space-y-1">
                    <li><strong>EBITDA:</strong> ${item.ebitda.toLocaleString()}</li>
                    <li><strong>EBITDARatio:</strong> {(item.ebitdaratio * 100).toFixed(2)}%</li>
                    <li><strong>Income Before Tax:</strong> ${item.incomeBeforeTax.toLocaleString()}</li>
                    <li><strong>Income Before Tax Ratio:</strong> {(item.incomeBeforeTaxRatio * 100).toFixed(2)}%</li>
                    <li><strong>Income Tax Expense:</strong> ${item.incomeTaxExpense.toLocaleString()}</li>
                    <li><strong>Weighted Average Shares Out:</strong> {item.weightedAverageShsOut.toLocaleString()}</li>
                    <li><strong>Weighted Average Shares Out Diluted:</strong> {item.weightedAverageShsOutDil.toLocaleString()}</li>
                    <li>
                      <strong>Link:</strong> 
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary dark:text-primary-dark underline">
                        SEC Filing
                      </a>
                    </li>
                    <li>
                      <strong>Final Link:</strong> 
                      <a href={item.finalLink} target="_blank" rel="noopener noreferrer" className="text-primary dark:text-primary-dark underline">
                        Detailed Report
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default IncomeStatementDetail;
