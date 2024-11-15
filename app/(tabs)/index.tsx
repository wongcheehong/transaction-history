import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useRouter } from 'expo-router';
import { ArrowRight, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { useFetchTransactions } from '@/hooks/useFetchTransactions';
import { TransactionCard } from '@/components/TransactionCard';

export default function HomeScreen() {
    const router = useRouter();
    const { transactions, isLoading } = useFetchTransactions();

    // Calculate total balance and recent activity
    const recentTransactions = transactions.slice(0, 3);
    const totalBalance = transactions.reduce((acc, curr) => {
        return acc + (curr.type === 'credit' ? curr.amount : -curr.amount);
    }, 0);

    const monthlyIncome = transactions
        .filter(t => t.type === 'credit')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const monthlyExpenses = transactions
        .filter(t => t.type === 'debit')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const handleViewAllTransactions = () => {
        router.push('/transactions');
    };

    return (
        <ScrollView className="flex-1 bg-gray-50">
            {/* Balance Card */}
            <View className="m-4 p-6 bg-blue-500 rounded-xl">
                <Text className="text-white/80 mb-2">Total Balance</Text>
                <Text className="text-white text-3xl font-semibold">
                    ${totalBalance.toFixed(2)}
                </Text>
            </View>

            {/* Quick Stats */}
            <View className="flex-row mx-4 space-x-4">
                <View className="flex-1 p-4 bg-white rounded-xl">
                    <View className="flex-row items-center space-x-2">
                        <ArrowUpRight size={20} color="#22c55e" />
                        <Text className="text-gray-600">Income</Text>
                    </View>
                    <Text className="text-lg font-semibold mt-2">${monthlyIncome.toFixed(2)}</Text>
                </View>

                <View className="flex-1 p-4 bg-white rounded-xl">
                    <View className="flex-row items-center space-x-2">
                        <ArrowDownRight size={20} color="#ef4444" />
                        <Text className="text-gray-600">Expenses</Text>
                    </View>
                    <Text className="text-lg font-semibold mt-2">${monthlyExpenses.toFixed(2)}</Text>
                </View>
            </View>

            {/* Recent Transactions */}
            <View className="mt-6">
                <View className="flex-row justify-between items-center mx-4 mb-2">
                    <Text className="text-lg font-semibold">Recent Transactions</Text>
                    <TouchableOpacity
                        onPress={handleViewAllTransactions}
                        className="flex-row items-center"
                    >
                        <Text className="text-blue-500 mr-1">View All</Text>
                        <ArrowRight size={16} color="#3b82f6" />
                    </TouchableOpacity>
                </View>

                {recentTransactions.map((transaction) => (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        isAmountVisible={true}
                        onPress={() => router.push(`/transactions/${transaction.id}`)}
                    />
                ))}
            </View>

            {/* Quick Actions */}
            <View className="mt-6 mb-8 mx-4">
                <Text className="text-lg font-semibold mb-4">Quick Actions</Text>
                <View className="flex-row space-x-4">
                    <TouchableOpacity className="flex-1 items-center p-4 bg-white rounded-xl">
                        <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                            <DollarSign size={24} color="#3b82f6" />
                        </View>
                        <Text className="text-gray-800">Send Money</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-1 items-center p-4 bg-white rounded-xl">
                        <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                            <PieChart size={24} color="#3b82f6" />
                        </View>
                        <Text className="text-gray-800">Analytics</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}