import { Transaction } from "@/types/types";

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: -125.50,
    date: '2024-03-14T10:30:00Z',
    description: 'Coffee Shop Purchase',
    type: 'debit',
    category: 'Food & Dining',
    merchantName: 'Starbucks',
    reference: 'TXN123456',
    status: 'completed'
  },
  {
    id: '2',
    amount: 1500.00,
    date: '2024-03-13T09:00:00Z',
    description: 'Salary Deposit',
    type: 'credit',
    category: 'Income',
    merchantName: 'Employer Inc',
    reference: 'SAL789012',
    status: 'completed'
  },
];