export const formatAmount = (amount: number, showMask = true): string => {
    if (showMask) {
        return '****';
    }

    const formattedAmount = new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      currencyDisplay: 'narrowSymbol',
    }).format(amount);
    
    return formattedAmount;
}

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}