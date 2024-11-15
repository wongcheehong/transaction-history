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

  formatAmount(amount: number, type: 'debit' | 'credit'): string {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
    
    return type === 'debit' ? `-${formattedAmount}` : formattedAmount;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

export const transactionService = new TransactionService();