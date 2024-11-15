import { Transaction } from '@/types/types';
import { mockTransactions } from './mockData';

class TransactionService {
  async fetchTransactions(): Promise<Transaction[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockTransactions;
  }

  async fetchTransactionById(id: string): Promise<Transaction | null> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTransactions.find(transaction => transaction.id === id) || null;
  }
}

export const transactionService = new TransactionService();