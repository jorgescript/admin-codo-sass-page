import type { Metadata } from "next";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "PropManage — Dashboard",
  description: "Panel de administración de propiedades y finanzas residenciales.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />

      <div className="dashboard-stage">
        <Header />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}

