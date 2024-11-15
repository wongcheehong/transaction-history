import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Transaction } from '@/types/types';
import { transactionService } from '@/services/transaction-service';
import { useStyles } from '@/hooks/useStyles';
import { Theme } from '@/hooks/useAppTheme';

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
  const styles = useStyles(createStyles);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
          <Text style={styles.description}>
            {transaction.description}
          </Text>
          <Text style={styles.date}>
            {transactionService.formatDate(transaction.date)}
          </Text>
        </View>

        <View style={styles.rightContent}>
          <Text
            style={[
              styles.amount,
              transaction.type === 'debit' ? styles.debitAmount : styles.creditAmount
            ]}
          >
            {isAmountVisible
              ? transactionService.formatAmount(transaction.amount, transaction.type)
              : '•••••'}
          </Text>
          <Text style={styles.category}>
            {transaction.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200]
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftContent: {
    flex: 1
  },
  rightContent: {
    alignItems: 'flex-end'
  },
  description: {
    color: theme.colors.gray[800],
    ...theme.typography.body1,
    fontWeight: '600'
  },
  date: {
    color: theme.colors.gray[500],
    ...theme.typography.body2,
    marginTop: theme.spacing.xs
  },
  amount: {
    ...theme.typography.body1,
    fontWeight: '600',
    width: 80
  },
  debitAmount: {
    color: theme.colors.error
  },
  creditAmount: {
    color: theme.colors.success
  },
  category: {
    color: theme.colors.gray[500],
    ...theme.typography.caption,
    textAlign: 'right'
  }
});