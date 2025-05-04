// app/[locale]/dashboard/page.tsx

import { AuthGuard, HomeDashboard, AsideDashboard } from "@/components";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-[#121212] text-blue-cyan dark:text-blue-cyan">
        <AsideDashboard />
        <HomeDashboard />
      </div>
    </AuthGuard>
  );
}

{/* <Dashboard /> */ }
{/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-38">
          <div>
            <div className="container mx-auto p-8">
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
              <p>Contenido protegido del dashboard</p>
            </div>
          </div>
        </div>
      </div> */}