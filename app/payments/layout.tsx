import type { Metadata } from "next";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "PropManage — Pagos",
  description:
    "Historial y gestión de pagos de cuotas de mantenimiento y servicios.",
};

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />

      <div className="dashboard-stage">
        <Header searchPlaceholder="Buscar pago, residente o referencia…" />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
