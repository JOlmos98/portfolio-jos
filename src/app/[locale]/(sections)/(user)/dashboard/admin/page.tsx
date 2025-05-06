import { Admin, AsideDashboard } from "@/components";
import { AuthGuardAdmin } from "@/components/auth/AuthGuardAdmin";

export default function DashboardNewArticlePage() {
  return (
    <AuthGuardAdmin>
      <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-[#121212] text-blue-cyan dark:text-blue-cyan">
        <AsideDashboard />
        <Admin/>
      </div>
    </AuthGuardAdmin>
  );
}