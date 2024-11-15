export type TransactionType = 'debit' | 'credit';

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
  category: string;
  merchantName: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface TransactionError {
  code: string;
  message: string;
}

export interface AuthenticationState {
  isAuthenticated: boolean;
  error?: string;
}