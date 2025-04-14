import DashboardNav from "@/components/store/layout/dashboard-nav"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomersLoading() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
                <DashboardNav>
                    <main className="flex-1 p-6">
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-10 w-[200px]" />
                                <Skeleton className="h-10 w-[150px]" />
                            </div>

                            {/* Search and Filters */}
                            <div className="flex flex-wrap items-center gap-2">
                                <Skeleton className="h-10 w-[300px]" />
                                <Skeleton className="h-10 w-[120px]" />
                                <Skeleton className="h-10 w-[120px]" />
                            </div>

                            {/* Customer Cards */}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <Skeleton key={i} className="h-[180px] w-full rounded-xl" />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-center">
                                <div className="flex gap-1">
                                    <Skeleton className="h-10 w-10" />
                                    <Skeleton className="h-10 w-10" />
                                    <Skeleton className="h-10 w-10" />
                                    <Skeleton className="h-10 w-10" />
                                    <Skeleton className="h-10 w-10" />
                                </div>
                            </div>
                        </div>
                    </main>
                </DashboardNav>
            </div>
        </div>
    )
}
