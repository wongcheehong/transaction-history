import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Transaction } from '@/types/types';
import { transactionService } from '@/services/transaction-service';

interface TransactionCardProps {
  transaction: Transaction;
  isAmountVisible: boolean;
  onPress: () => void;
}

export function TransactionCard({
  transaction,
  isAmountVisible,
  onPress
}: TransactionCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white p-4 mb-2 border-b border-gray-200"
    >
      <View className="flex flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-gray-800 font-semibold">
            {transaction.description}
          </Text>
          <Text className="text-gray-500 text-sm mt-1">
            {transactionService.formatDate(transaction.date)}
          </Text>
        </View>

        <View className="items-end">
          <Text
            className={`font-semibold w-20 ${transaction.type === 'debit' ? 'text-red-500' : 'text-green-500'
              }`}
          >
            {isAmountVisible
              ? transactionService.formatAmount(transaction.amount, transaction.type)
              : '•••••'}
          </Text>
          <Text className="text-gray-500 text-xs text-right">
            {transaction.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}