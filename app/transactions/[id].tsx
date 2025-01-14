import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Transaction } from '@/types/transaction';
import { transactionService } from '@/services/transaction-service';
import { DetailRow } from '@/components/DetailRow';
import { useStyles } from '@/hooks/useStyles';
import { Theme } from '@/hooks/useAppTheme';
import { formatAmount, formatDate } from '@/lib/formatter';
import { useHideAmountStore } from '@/hooks/stores/useHideAmountStore';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isAmountVisible } = useHideAmountStore();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const styles = useStyles(createStyles);

  useEffect(() => {
    const loadTransaction = async () => {
      try {
        const data = await transactionService.fetchTransactionById(id);
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
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={styles.loader.color} />
      </View>
    );
  }

  if (error || !transaction) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const amountStyle = transaction.type === 'debit'
    ? styles.debitAmount
    : styles.creditAmount;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>
            {transaction.description}
          </Text>
          <Text style={[styles.amount, amountStyle]}>
            {formatAmount(transaction.amount, !isAmountVisible)}
          </Text>
        </View>

        <View style={styles.detailsSection}>
          <DetailRow label="Date" value={formatDate(transaction.date)} />
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

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
  },
  headerSection: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.neutral[800],
  },
  amount: {
    ...theme.typography.h2,
    marginTop: theme.spacing.sm,
  },
  debitAmount: {
    color: theme.colors.error,
  },
  creditAmount: {
    color: theme.colors.success,
  },
  detailsSection: {
    gap: theme.spacing.sm,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
  },
  loader: {
    color: theme.colors.primary.main,
  },
});