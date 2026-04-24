import type { Metadata } from "next";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "PropManage — Listado de Casas",
  description:
    "Gestión centralizada de unidades residenciales y estados financieros.",
};

export default function HousesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />

      <div className="dashboard-stage">
        <Header searchPlaceholder="Buscar casa, propietario o manzana…" />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
