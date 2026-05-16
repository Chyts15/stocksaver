export default function ProductsLoading() {
    return (
        <div className="animate-pulse">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="h-8 w-36 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-24 bg-slate-100 rounded mt-2" />
                </div>
                <div className="h-9 w-28 bg-slate-200 rounded-lg" />
            </div>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5">
                    <div className="h-3 w-64 bg-slate-200 rounded" />
                </div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="px-5 py-4 border-b border-slate-100 flex items-center gap-4">
                        <div className="flex-1">
                            <div className="h-4 w-44 bg-slate-200 rounded mb-1.5" />
                            <div className="h-3 w-20 bg-slate-100 rounded" />
                        </div>
                        <div className="h-4 w-16 bg-slate-100 rounded" />
                        <div className="h-4 w-16 bg-slate-100 rounded" />
                        <div className="h-6 w-20 bg-slate-100 rounded-full" />
                        <div className="flex gap-2 ml-auto">
                            <div className="h-8 w-16 bg-slate-100 rounded-lg" />
                            <div className="h-8 w-16 bg-slate-100 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}