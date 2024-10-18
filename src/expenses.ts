import { useEffect, useState } from "react";

export interface Expense {
  id: number;
  date: string;
  amount: number;
  merchant: string;
  category: string; // could potentially be an ENUM assuming all categories are known
}

interface Expenses {
  totalTransactions: number;
  transactions: { [key: number]: Expense };
}

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expenses | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      fetch("https://tip-transactions.vercel.app/api/transactions?page=1", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch expense");
          }
          return response.json();
        })
        .then((data: Expenses) => {
          setExpenses(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setHasError(true);
          setErrMsg(error);
        });
    };

    fetchExpenses();
  }, [setExpenses, setIsLoading, setHasError]);

  return [expenses, isLoading, hasError, errMsg] as const;
};
