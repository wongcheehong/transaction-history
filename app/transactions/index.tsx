import React, { useState, useCallback } from 'react';
import { View, RefreshControl, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Transaction } from '@/types/types';
import { useFetchTransactions } from '@/hooks/useFetchTransactions';
import { authService } from '@/services/auth-service';
import { TransactionCard } from '@/components/TransactionCard';

export default function TransactionsScreen() {
  const router = useRouter();
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const { transactions, isLoading, error, refetch } = useFetchTransactions();

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleTransactionPress = useCallback((transaction: Transaction) => {
    router.push(`/transactions/${transaction.id}`);
  }, [router]);

  const handleToggleAmounts = async () => {
    const authResult = await authService.authenticate();
    if (authResult.isAuthenticated) {
      setIsAmountVisible(!isAmountVisible);
    }
  };

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500 text-center">
          Error loading transactions. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4 bg-white border-b border-gray-200">
        <TouchableOpacity
          onPress={handleToggleAmounts}
          className="bg-blue-500 py-2 px-4 rounded-lg"
        >
          <Text className="text-white text-center">
            {isAmountVisible ? 'Hide Amounts' : 'Show Amounts'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlashList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            isAmountVisible={isAmountVisible}
            onPress={() => handleTransactionPress(item)}
          />
        )}
        estimatedItemSize={100}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        className="flex-1"
      />
    </View>
  );
}