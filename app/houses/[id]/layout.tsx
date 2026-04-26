import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PropManage — Detalle de Casa",
  description:
    "Información detallada, financiera e historial de pagos de la unidad residencial.",
};

export default function HouseDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
