export type UrgencyLevel = 'critical' | 'warning' | 'ok' | 'unknown'

export interface StockStatus {
    daysUntilEmpty: number | null
    urgency: UrgencyLevel
    label: string
    isUrgent: boolean  // ← new
}

export function getStockStatus(
    currentStock: number,
    reorderThreshold: number,
    avgDailySales: number | null
): StockStatus {
    if (currentStock <= 0) {
        return {
            daysUntilEmpty: 0,
            urgency: 'critical',
            label: 'Out of stock',
            isUrgent: true,
        }
    }

    if (!avgDailySales || avgDailySales <= 0) {
        // Use fallback of 1 for urgency check only
        const fallbackDays = Math.floor(currentStock / 1)
        const isUrgent = currentStock <= reorderThreshold && fallbackDays < 2
        return {
            daysUntilEmpty: null,
            urgency: 'unknown',
            label: 'No sales data',
            isUrgent,
        }
    }

    const days = Math.floor(currentStock / avgDailySales)
    const urgency: UrgencyLevel = days <= 2 ? 'critical' : days <= 7 ? 'warning' : 'ok'
    const isUrgent = currentStock <= reorderThreshold && days < 2

    return {
        daysUntilEmpty: days,
        urgency,
        label: days === 0 ? 'Less than 1 day' : `~${days} day${days === 1 ? '' : 's'}`,
        isUrgent,
    }
}