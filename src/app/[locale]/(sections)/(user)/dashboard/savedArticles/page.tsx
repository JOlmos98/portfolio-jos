import { AuthGuard, AsideDashboard, SavedArticles } from "@/components";

export default function DashboardSavedArticlesPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-[#121212] text-blue-cyan dark:text-blue-cyan">
        <AsideDashboard />
        <SavedArticles/>
        {/* <HomeDashboard /> */}
      </div>
    </AuthGuard>
  );
}