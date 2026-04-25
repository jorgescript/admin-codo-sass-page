// ── Payments page — Historial de Pagos ──────────────────────────────────────
"use client";

import { useState } from "react";
import Pagination from "@/components/common/Pagination";

// ── Types ────────────────────────────────────────────────────────────────────

type PaymentStatus = "completed" | "pending" | "failed";
type PaymentMethod = "transferencia" | "efectivo" | "tarjeta";

interface PaymentRow {
  id: string;
  reference: string;
  payerInitials: string;
  payerInitialsColor: "blue" | "purple" | "orange" | "teal" | "rose";
  payerName: string;
  unit: string;
  method: PaymentMethod;
  amount: string;
  status: PaymentStatus;
  date: string; // ISO date string for filtering, e.g. "2023-10-12"
  dateLabel: string; // display format
}

// ── Mock data ────────────────────────────────────────────────────────────────

const paymentRows: PaymentRow[] = [
  {
    id: "PAY-001",
    reference: "REF-2310-0091",
    payerInitials: "RL",
    payerInitialsColor: "blue",
    payerName: "Ricardo Ledesma",
    unit: "Manzana A — Casa 04",
    method: "transferencia",
    amount: "$1,500.00",
    status: "completed",
    date: "2023-10-12",
    dateLabel: "12 Oct 2023",
  },
  {
    id: "PAY-002",
    reference: "REF-2309-0085",
    payerInitials: "AM",
    payerInitialsColor: "purple",
    payerName: "Andrea Mendoza",
    unit: "Manzana A — Casa 12",
    method: "efectivo",
    amount: "$1,500.00",
    status: "pending",
    date: "2023-09-08",
    dateLabel: "08 Sep 2023",
  },
  {
    id: "PAY-003",
    reference: "REF-2307-0064",
    payerInitials: "JV",
    payerInitialsColor: "orange",
    payerName: "Jorge Villarreal",
    unit: "Manzana B — Casa 01",
    method: "tarjeta",
    amount: "$1,500.00",
    status: "failed",
    date: "2023-07-15",
    dateLabel: "15 Jul 2023",
  },
  {
    id: "PAY-004",
    reference: "REF-2311-0102",
    payerInitials: "SG",
    payerInitialsColor: "teal",
    payerName: "Sofia Garcia",
    unit: "Manzana C — Casa 05",
    method: "transferencia",
    amount: "$1,500.00",
    status: "completed",
    date: "2023-11-01",
    dateLabel: "01 Nov 2023",
  },
  {
    id: "PAY-005",
    reference: "REF-2311-0110",
    payerInitials: "LM",
    payerInitialsColor: "rose",
    payerName: "Laura Martínez",
    unit: "Manzana B — Casa 07",
    method: "efectivo",
    amount: "$1,500.00",
    status: "completed",
    date: "2023-11-05",
    dateLabel: "05 Nov 2023",
  },
  {
    id: "PAY-006",
    reference: "REF-2310-0098",
    payerInitials: "CR",
    payerInitialsColor: "blue",
    payerName: "Carlos Ríos",
    unit: "Manzana A — Casa 09",
    method: "tarjeta",
    amount: "$1,500.00",
    status: "pending",
    date: "2023-10-20",
    dateLabel: "20 Oct 2023",
  },
];

// ── Config maps ───────────────────────────────────────────────────────────────

const statusConfig: Record<
  PaymentStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  completed: {
    label: "COMPLETADO",
    badgeClass: "badge badge--paid",
    dotClass: "status-dot status-dot--paid",
  },
  pending: {
    label: "PENDIENTE",
    badgeClass: "badge badge--pending",
    dotClass: "status-dot status-dot--pending",
  },
  failed: {
    label: "FALLIDO",
    badgeClass: "badge badge--overdue",
    dotClass: "status-dot status-dot--overdue",
  },
};

const methodConfig: Record<PaymentMethod, { icon: string; label: string }> = {
  transferencia: { icon: "account_balance", label: "Transferencia" },
  efectivo: { icon: "payments", label: "Efectivo" },
  tarjeta: { icon: "credit_card", label: "Tarjeta" },
};

const initialsColorMap: Record<string, string> = {
  blue: "owner-avatar--blue",
  purple: "owner-avatar--purple",
  orange: "owner-avatar--orange",
  teal: "owner-avatar--teal",
  rose: "owner-avatar--rose",
};

// ── Page component ────────────────────────────────────────────────────────────

const ROWS_PER_PAGE = 5;

/** Unique unit values derived from data, sorted alphabetically */
const unitOptions = Array.from(
  new Set(paymentRows.map((r) => r.unit))
).sort();

export default function PaymentsPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterUnit, setFilterUnit] = useState<string>("all");
  const [filterDateFrom, setFilterDateFrom] = useState<string>("");
  const [filterDateTo, setFilterDateTo] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Derived: filtered rows ─────────────────────────────────────────────────

  const filtered = paymentRows.filter((row) => {
    if (filterStatus !== "all" && row.status !== filterStatus) return false;
    if (filterUnit !== "all" && row.unit !== filterUnit) return false;
    if (filterDateFrom && row.date < filterDateFrom) return false;
    if (filterDateTo && row.date > filterDateTo) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * ROWS_PER_PAGE,
    safePage * ROWS_PER_PAGE
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function clearFilters() {
    setFilterStatus("all");
    setFilterUnit("all");
    setFilterDateFrom("");
    setFilterDateTo("");
    setCurrentPage(1);
  }

  // Reset to page 1 whenever a filter changes
  function updateFilter<T>(setter: (v: T) => void, value: T) {
    setter(value);
    setCurrentPage(1);
  }

  return (
    <div className="page-stack">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="page-header">
        <div>
          <h2 className="text-headline-xl text-on-surface">
            Historial de Pagos
          </h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Seguimiento de cuotas, métodos de pago y estados de transacción.
          </p>
        </div>
        <div className="flex gap-md">
          <button className="btn btn--secondary">
            <span className="material-symbols-outlined btn-icon">download</span>
            Exportar CSV
          </button>
          <button className="btn btn--primary">
            <span className="material-symbols-outlined btn-icon">add</span>
            Registrar Pago
          </button>
        </div>
      </div>

      {/* ── KPI cards (2 widgets) ────────────────────────────────────────── */}
      <div className="kpi-grid kpi-grid--2">
        {/* Total Recaudado */}
        <div className="card kpi-card">
          <div className="kpi-card-top">
            <div>
              <p className="text-label-md text-on-surface-variant">
                Total Recaudado
              </p>
              <h3 className="text-headline-lg mt-1">$142,500.00</h3>
            </div>
            <div className="kpi-icon kpi-icon--green">
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>
            </div>
          </div>
          <div className="kpi-card-footer">
            <span className="badge badge--paid">+8.2%</span>
            <span className="text-label-sm text-on-surface-variant">
              vs mes anterior
            </span>
          </div>
        </div>

        {/* Pagos Pendientes */}
        <div className="card kpi-card">
          <div className="kpi-card-top">
            <div>
              <p className="text-label-md text-on-surface-variant">
                Pagos Pendientes
              </p>
              <h3 className="text-headline-lg mt-1">$16,260.00</h3>
            </div>
            <div className="kpi-icon kpi-icon--amber">
              <span className="material-symbols-outlined">schedule</span>
            </div>
          </div>
          <div className="kpi-card-footer">
            <span className="badge badge--pending">11 pagos</span>
            <span className="text-label-sm text-on-surface-variant">
              por confirmar
            </span>
          </div>
        </div>
      </div>

      {/* ── Filters bar ─────────────────────────────────────────────────── */}
      <div className="filters-bar">
        {/* Unit / Casa */}
        <div className="filter-chip">
          <span className="filter-chip-label">Casa:</span>
          <select
            className="filter-select"
            aria-label="Filtrar por casa"
            value={filterUnit}
            onChange={(e) => updateFilter(setFilterUnit, e.target.value)}
          >
            <option value="all">Todas</option>
            {unitOptions.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="filter-chip">
          <span className="filter-chip-label">Pago:</span>
          <select
            className="filter-select"
            aria-label="Filtrar por estado"
            value={filterStatus}
            onChange={(e) => updateFilter(setFilterStatus, e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="completed">Completado</option>
            <option value="pending">Pendiente</option>
            <option value="failed">Fallido</option>
          </select>
        </div>

        {/* Date from */}
        <div className="filter-chip">
          <span className="filter-chip-label">Desde:</span>
          <input
            className="filter-select filter-date-input"
            type="date"
            aria-label="Fecha inicial"
            value={filterDateFrom}
            onChange={(e) => updateFilter(setFilterDateFrom, e.target.value)}
          />
        </div>


        {/* Date to */}
        <div className="filter-chip">
          <span className="filter-chip-label">Hasta:</span>
          <input
            className="filter-select filter-date-input"
            type="date"
            aria-label="Fecha final"
            value={filterDateTo}
            onChange={(e) => updateFilter(setFilterDateTo, e.target.value)}
          />
        </div>

        <button className="filter-clear-btn" onClick={clearFilters}>
          Limpiar Filtros
        </button>
      </div>

      {/* ── Main data table ─────────────────────────────────────────────── */}
      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr className="table-head-row">
                <th className="th">Referencia</th>
                <th className="th">Residente / Unidad</th>
                <th className="th" style={{ textAlign: "center" }}>
                  Método
                </th>
                <th className="th th--right">Monto</th>
                <th className="th" style={{ textAlign: "center" }}>
                  Estado
                </th>
                <th className="th th--right">Fecha</th>
                <th className="th" style={{ textAlign: "center" }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="td"
                    style={{ textAlign: "center", padding: "2.5rem 0" }}
                  >
                    <div className="payments-empty-state">
                      <span className="material-symbols-outlined payments-empty-icon">
                        search_off
                      </span>
                      <p className="text-body-md text-on-surface-variant">
                        No se encontraron pagos con los filtros seleccionados.
                      </p>
                      <button
                        className="filter-clear-btn"
                        onClick={clearFilters}
                        style={{ marginLeft: 0, marginTop: "0.5rem" }}
                      >
                        Limpiar Filtros
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((row) => {
                  const { label, badgeClass, dotClass } =
                    statusConfig[row.status];
                  const avatarClass = initialsColorMap[row.payerInitialsColor];
                  const method = methodConfig[row.method];
                  return (
                    <tr key={row.id} className="tr payments-row">
                      {/* Reference */}
                      <td className="td">
                        <div className="payments-ref-cell">
                          <p className="text-body-sm font-bold text-on-surface">
                            {row.id}
                          </p>
                          <p className="text-label-sm text-on-surface-variant">
                            {row.reference}
                          </p>
                        </div>
                      </td>

                      {/* Payer */}
                      <td className="td">
                        <div className="resident-cell">
                          <div
                            className={`owner-avatar ${avatarClass}`}
                            aria-hidden="true"
                          >
                            {row.payerInitials}
                          </div>
                          <div>
                            <p className="text-body-sm font-bold text-on-surface">
                              {row.payerName}
                            </p>
                            <p className="text-label-sm text-on-surface-variant">
                              {row.unit}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Method */}
                      <td className="td" style={{ textAlign: "center" }}>
                        <div className="payments-method-cell">
                          <span className="material-symbols-outlined payments-method-icon">
                            {method.icon}
                          </span>
                          <span className="text-label-sm text-on-surface-variant">
                            {method.label}
                          </span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="td td--right">
                        <span className="text-body-sm font-bold text-on-surface">
                          {row.amount}
                        </span>
                      </td>

                      {/* Status badge */}
                      <td className="td" style={{ textAlign: "center" }}>
                        <span className={`${badgeClass} houses-badge`}>
                          <span className={dotClass} aria-hidden="true" />
                          {label}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="td td--right text-body-sm text-on-surface-variant">
                        {row.dateLabel}
                      </td>

                      {/* Actions */}
                      <td className="td houses-actions-cell">
                        <div className="houses-actions">
                          <button
                            className="table-action-btn"
                            aria-label={`Ver detalle de ${row.id}`}
                            title="Ver Detalle"
                          >
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </button>
                          <button
                            className="table-action-btn"
                            aria-label={`Descargar recibo de ${row.id}`}
                            title="Descargar Recibo"
                          >
                            <span className="material-symbols-outlined">
                              receipt_long
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ───────────────────────────────────────────────── */}
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          label={`Mostrando ${paginated.length === 0 ? 0 : (safePage - 1) * ROWS_PER_PAGE + 1} a ${Math.min(safePage * ROWS_PER_PAGE, filtered.length)} de ${filtered.length} pagos`}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
