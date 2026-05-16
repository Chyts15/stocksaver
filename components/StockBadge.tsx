import type { UrgencyLevel } from '@/lib/calculations'

const styles: Record<UrgencyLevel, string> = {
    critical: 'bg-red-100 text-red-700 border border-red-200',
    warning:  'bg-yellow-100 text-yellow-700 border border-yellow-200',
    ok:       'bg-green-100 text-green-700 border border-green-200',
    unknown:  'bg-slate-100 text-slate-500 border border-slate-200',
}

export function StockBadge({ urgency, label }: { urgency: UrgencyLevel; label: string }) {
    return (
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[urgency]}`}>
      {label}
    </span>
    )
}