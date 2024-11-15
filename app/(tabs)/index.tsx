import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { useFetchTransactions } from '@/hooks/useFetchTransactions';
import { TransactionCard } from '@/components/TransactionCard';
import { useStyles } from '@/hooks/useStyles';
import { Theme } from '@/hooks/useAppTheme';
import { formatAmount } from '@/lib/formatter';
import { useHideAmountStore } from '@/hooks/stores/useHideAmountStore';

export default function HomeScreen() {
    const router = useRouter();
    const { transactions, isLoading } = useFetchTransactions();
    const styles = useStyles(createStyles);
    const { isAmountVisible } = useHideAmountStore();

    const recentTransactions = transactions.slice(0, 6);

    const totalBalance = useMemo(() =>
        transactions.reduce((acc, curr) =>
            acc + (curr.type === 'credit' ? curr.amount : -curr.amount), 0),
        [transactions]);

    const monthlyIncome = useMemo(() => transactions
        .filter(t => t.type === 'credit')
        .reduce((acc, curr) => acc + curr.amount, 0), [transactions]);

    const monthlyExpenses = useMemo(() => transactions
        .filter(t => t.type === 'debit')
        .reduce((acc, curr) => acc + curr.amount, 0), [transactions]);

    const handleViewAllTransactions = () => {
        router.push('/transactions');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Total Balance</Text>
                <Text style={styles.balanceAmount}>
                    {formatAmount(totalBalance, !isAmountVisible)}
                </Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <View style={styles.statHeader}>
                        <ArrowUpRight size={20} color={styles.incomeIcon.color} />
                        <Text style={styles.statLabel}>Income</Text>
                    </View>
                    <Text style={styles.statAmount}>{formatAmount(monthlyIncome, !isAmountVisible)}</Text>
                </View>

                <View style={styles.statCard}>
                    <View style={styles.statHeader}>
                        <ArrowDownRight size={20} color={styles.expenseIcon.color} />
                        <Text style={styles.statLabel}>Expenses</Text>
                    </View>
                    <Text style={styles.statAmount}>{formatAmount(monthlyExpenses, !isAmountVisible)}</Text>
                </View>
            </View>

            <View style={styles.transactionsSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <TouchableOpacity
                        onPress={handleViewAllTransactions}
                        style={styles.viewAllButton}
                    >
                        <Text style={styles.viewAllText}>View All</Text>
                        <ArrowRight size={16} color={styles.viewAllIcon.color} />
                    </TouchableOpacity>
                </View>

                {recentTransactions.map((transaction) => (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        isAmountVisible={isAmountVisible}
                        onPress={() => router.push(`/transactions/${transaction.id}`)}
                    />
                ))}
            </View>

        </ScrollView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.neutral[50],
    },
    balanceCard: {
        margin: theme.spacing.md,
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.primary.main,
        borderRadius: theme.radius.xl,
    },
    balanceLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: theme.spacing.sm,
    },
    balanceAmount: {
        color: theme.colors.neutral[50],
        ...theme.typography.h1,
    },
    statsContainer: {
        flexDirection: 'row',
        marginHorizontal: theme.spacing.md,
        gap: theme.spacing.md,
    },
    statCard: {
        flex: 1,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.xl,
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    statLabel: {
        color: theme.colors.neutral[600],
    },
    statAmount: {
        ...theme.typography.h4,
        marginTop: theme.spacing.sm,
    },
    incomeIcon: {
        color: theme.colors.success,
    },
    expenseIcon: {
        color: theme.colors.error,
    },
    transactionsSection: {
        marginTop: theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    sectionTitle: {
        ...theme.typography.h3,
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: theme.colors.primary.main,
        marginRight: theme.spacing.xs,
    },
    viewAllIcon: {
        color: theme.colors.primary.main,
    },
    actionsSection: {
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xxl,
        marginHorizontal: theme.spacing.md,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginTop: theme.spacing.md,
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.xl,
    },
    actionIconContainer: {
        width: 48,
        height: 48,
        backgroundColor: theme.colors.primary.light,
        borderRadius: theme.radius.round,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
    },
    actionIcon: {
        color: theme.colors.primary.main,
    },
    actionText: {
        color: theme.colors.neutral[800],
    },
});