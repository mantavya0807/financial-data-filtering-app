// src/types/index.ts

export interface IncomeStatement {
  date: string; // e.g., "2024-09-28"
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  eps: number;
  // Add other fields if necessary
}
