import { AuthGuard, AsideDashboard, NewArticle } from "@/components";

export default function DashboardNewArticlePage() {
  return (
    <AuthGuard>
      <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-[#121212] text-blue-cyan dark:text-blue-cyan">
        <AsideDashboard />
        <div className="text-center">
        <NewArticle />
        </div>
        {/* <HomeDashboard /> */}
      </div>
    </AuthGuard>
  );
}