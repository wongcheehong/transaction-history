import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Transaction } from '@/types/types';
import { transactionService } from '@/services/transaction-service';
import { DetailRow } from '@/components/DetailRow';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransaction = async () => {
      try {
        const data = await transactionService.fetchTransactionById(id as string);
        if (!data) {
          setError('Transaction not found');
          return;
        }
        setTransaction(data);
      } catch (err) {
        setError('Failed to load transaction details');
      } finally {
        setIsLoading(false);
      }
    };

    loadTransaction();
  }, [id]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !transaction) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">
            {transaction.description}
          </Text>
          <Text className={`text-xl mt-2 ${transaction.type === 'debit' ? 'text-red-500' : 'text-green-500'
            }`}>
            {transactionService.formatAmount(transaction.amount, transaction.type)}
          </Text>
        </View>

        <View className="space-y-4">
          <DetailRow label="Date" value={transactionService.formatDate(transaction.date)} />
          <DetailRow label="Type" value={transaction.type.toUpperCase()} />
          <DetailRow label="Category" value={transaction.category} />
          <DetailRow label="Merchant" value={transaction.merchantName} />
          <DetailRow label="Reference" value={transaction.reference} />
          <DetailRow label="Status" value={transaction.status.toUpperCase()} />
        </View>
      </View>
    </ScrollView>
  );
}