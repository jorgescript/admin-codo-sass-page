import type { Metadata } from "next";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "PropManage — Egresos",
  description: "Gestión e historial de egresos y gastos.",
};

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />

      <div className="dashboard-stage">
        <Header searchPlaceholder="Buscar egreso, categoría o referencia…" />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
