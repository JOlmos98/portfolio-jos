import { AuthGuard, AsideDashboard, Settings } from "@/components";

export default function DashboardSettingsPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-[#121212] text-blue-cyan dark:text-blue-cyan">
        <AsideDashboard />
        <Settings/>
        {/* <HomeDashboard /> */}
      </div>
    </AuthGuard>
  );
}