export default function DashboardLoading() {
    return (
        <div className="animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="h-8 w-48 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-32 bg-slate-100 rounded mt-2" />
                </div>
                <div className="h-9 w-28 bg-slate-200 rounded-lg" />
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="h-3 w-24 bg-slate-100 rounded mb-3" />
                        <div className="h-8 w-12 bg-slate-200 rounded" />
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5">
                    <div className="h-3 w-64 bg-slate-200 rounded" />
                </div>
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="px-5 py-4 border-b border-slate-100 flex items-center gap-4">
                        <div className="flex-1">
                            <div className="h-4 w-40 bg-slate-200 rounded mb-1.5" />
                            <div className="h-3 w-20 bg-slate-100 rounded" />
                        </div>
                        <div className="h-4 w-16 bg-slate-100 rounded" />
                        <div className="h-4 w-16 bg-slate-100 rounded" />
                        <div className="h-6 w-20 bg-slate-100 rounded-full" />
                        <div className="h-8 w-24 bg-slate-100 rounded-lg ml-auto" />
                    </div>
                ))}
            </div>
        </div>
    )
}