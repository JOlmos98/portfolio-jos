import { AsideDashboard, Users } from "@/components";
import { AuthGuardAdmin } from "@/components/auth/AuthGuardAdmin";

export default function UsersPage() {
  return (
    <AuthGuardAdmin>
      <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-[#121212] text-blue-cyan dark:text-blue-cyan">
        <AsideDashboard />
        <Users/>
      </div>
    </AuthGuardAdmin>
  );
}
