import { useState, useEffect, useCallback } from 'react';
import { IncomeStatement } from '../types';

interface FetchDataResult {
  data: IncomeStatement[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useFetchData = (): FetchDataResult => {
  const [data, setData] = useState<IncomeStatement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
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

      const mappedData: IncomeStatement[] = jsonData.map((item: any) => ({
        date: item.date,
        symbol: item.symbol,
        reportedCurrency: item.reportedCurrency,
        cik: item.cik,
        fillingDate: item.fillingDate,
        acceptedDate: item.acceptedDate,
        calendarYear: item.calendarYear,
        period: item.period,
        revenue: item.revenue,
        costOfRevenue: item.costOfRevenue,
        grossProfit: item.grossProfit,
        grossProfitRatio: item.grossProfitRatio,
        researchAndDevelopmentExpenses: item.researchAndDevelopmentExpenses,
        generalAndAdministrativeExpenses: item.generalAndAdministrativeExpenses,
        sellingAndMarketingExpenses: item.sellingAndMarketingExpenses,
        sellingGeneralAndAdministrativeExpenses: item.sellingGeneralAndAdministrativeExpenses,
        otherExpenses: item.otherExpenses,
        operatingExpenses: item.operatingExpenses,
        costAndExpenses: item.costAndExpenses,
        interestIncome: item.interestIncome,
        interestExpense: item.interestExpense,
        depreciationAndAmortization: item.depreciationAndAmortization,
        ebitda: item.ebitda,
        ebitdaratio: item.ebitdaratio,
        operatingIncome: item.operatingIncome,
        operatingIncomeRatio: item.operatingIncomeRatio,
        totalOtherIncomeExpensesNet: item.totalOtherIncomeExpensesNet,
        incomeBeforeTax: item.incomeBeforeTax,
        incomeBeforeTaxRatio: item.incomeBeforeTaxRatio,
        incomeTaxExpense: item.incomeTaxExpense,
        netIncome: item.netIncome,
        netIncomeRatio: item.netIncomeRatio,
        eps: item.eps,
        epsdiluted: item.epsdiluted,
        weightedAverageShsOut: item.weightedAverageShsOut,
        weightedAverageShsOutDil: item.weightedAverageShsOutDil,
        link: item.link,
        finalLink: item.finalLink,
      }));

      setData(mappedData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetchData;
