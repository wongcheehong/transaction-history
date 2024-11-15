import React, { useCallback } from 'react';
import { View, Text, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Transaction } from '@/types/transaction';
import { useFetchTransactions } from '@/hooks/useFetchTransactions';
import { TransactionCard } from '@/components/TransactionCard';
import { useStyles } from '@/hooks/useStyles';
import { Theme } from '@/hooks/useAppTheme';
import { useHideAmountStore } from '@/hooks/stores/useHideAmountStore';

export default function TransactionsScreen() {
  const router = useRouter();
  const { transactions, isLoading, error, refetch } = useFetchTransactions();
  const styles = useStyles(createStyles);
  const { isAmountVisible } = useHideAmountStore();

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleTransactionPress = useCallback((transaction: Transaction) => {
    router.push(`/transactions/${transaction.id}`);
  }, [router]);


  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading transactions. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
      />
    </View>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
  },
  header: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  toggleButton: {
    backgroundColor: theme.colors.primary.main,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.lg,
  },
  toggleButtonText: {
    color: theme.colors.primary.contrast,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
  },
});