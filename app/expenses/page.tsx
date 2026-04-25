"use client";

import { useState } from "react";
import Pagination from "@/components/common/Pagination";

// ── Types ────────────────────────────────────────────────────────────────────

type ExpenseStatus = "paid" | "pending" | "cancelled";
type ExpenseCategory = "maintenance" | "utilities" | "payroll" | "repairs";

interface ExpenseRow {
  id: string;
  reference: string;
  supplier: string;
  supplierInitials: string;
  supplierInitialsColor: "blue" | "purple" | "orange" | "teal" | "rose";
  category: ExpenseCategory;
  amount: string;
  status: ExpenseStatus;
  date: string; // ISO date string for filtering, e.g. "2023-10-12"
  dateLabel: string; // display format
}

// ── Mock data ────────────────────────────────────────────────────────────────

const expenseRows: ExpenseRow[] = [
  {
    id: "EGR-001",
    reference: "INV-2023-1001",
    supplier: "Servicios de Agua (Siapa)",
    supplierInitials: "SA",
    supplierInitialsColor: "blue",
    category: "utilities",
    amount: "$450.00",
    status: "paid",
    date: "2023-10-12",
    dateLabel: "12 Oct 2023",
  },
  {
    id: "EGR-002",
    reference: "REP-2310-045",
    supplier: "Reparaciones FixIt",
    supplierInitials: "RF",
    supplierInitialsColor: "orange",
    category: "repairs",
    amount: "$1,200.00",
    status: "pending",
    date: "2023-10-14",
    dateLabel: "14 Oct 2023",
  },
  {
    id: "EGR-003",
    reference: "PAY-2310-01",
    supplier: "Personal de Seguridad",
    supplierInitials: "PS",
    supplierInitialsColor: "teal",
    category: "payroll",
    amount: "$3,500.00",
    status: "paid",
    date: "2023-10-15",
    dateLabel: "15 Oct 2023",
  },
  {
    id: "EGR-004",
    reference: "INV-2023-1012",
    supplier: "Jardinería El Rosal",
    supplierInitials: "JR",
    supplierInitialsColor: "rose",
    category: "maintenance",
    amount: "$850.00",
    status: "paid",
    date: "2023-10-20",
    dateLabel: "20 Oct 2023",
  },
  {
    id: "EGR-005",
    reference: "INV-2023-1015",
    supplier: "Comisión Federal de Electricidad",
    supplierInitials: "CF",
    supplierInitialsColor: "purple",
    category: "utilities",
    amount: "$980.00",
    status: "pending",
    date: "2023-10-22",
    dateLabel: "22 Oct 2023",
  },
  {
    id: "EGR-006",
    reference: "REP-2310-060",
    supplier: "Técnicos de Elevadores",
    supplierInitials: "TE",
    supplierInitialsColor: "blue",
    category: "repairs",
    amount: "$2,100.00",
    status: "cancelled",
    date: "2023-10-25",
    dateLabel: "25 Oct 2023",
  },
];

// ── Config maps ───────────────────────────────────────────────────────────────

const statusConfig: Record<
  ExpenseStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  paid: {
    label: "PAGADO",
    badgeClass: "badge badge--paid",
    dotClass: "status-dot status-dot--paid",
  },
  pending: {
    label: "PENDIENTE",
    badgeClass: "badge badge--pending",
    dotClass: "status-dot status-dot--pending",
  },
  cancelled: {
    label: "CANCELADO",
    badgeClass: "badge badge--overdue",
    dotClass: "status-dot status-dot--overdue",
  },
};

const categoryConfig: Record<ExpenseCategory, { icon: string; label: string }> = {
  maintenance: { icon: "cleaning_services", label: "Mantenimiento" },
  utilities: { icon: "bolt", label: "Servicios (Luz/Agua)" },
  payroll: { icon: "payments", label: "Nómina" },
  repairs: { icon: "plumbing", label: "Reparaciones" },
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

const categoryOptions = Array.from(
  new Set(expenseRows.map((r) => r.category))
).sort();

export default function ExpensesPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterDateFrom, setFilterDateFrom] = useState<string>("");
  const [filterDateTo, setFilterDateTo] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Derived: filtered rows ─────────────────────────────────────────────────

  const filtered = expenseRows.filter((row) => {
    if (filterStatus !== "all" && row.status !== filterStatus) return false;
    if (filterCategory !== "all" && row.category !== filterCategory) return false;
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
    setFilterCategory("all");
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
            Historial de Egresos
          </h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Seguimiento de gastos, categorías y estado de transacciones.
          </p>
        </div>
        <div className="flex gap-md">
          <button className="btn btn--secondary">
            <span className="material-symbols-outlined btn-icon">download</span>
            Exportar CSV
          </button>
          <button className="btn btn--primary">
            <span className="material-symbols-outlined btn-icon">add</span>
            Registrar Egreso
          </button>
        </div>
      </div>

      {/* ── KPI cards (2 widgets) ────────────────────────────────────────── */}
      <div className="kpi-grid kpi-grid--2">
        {/* Total Expenses */}
        <div className="card kpi-card">
          <div className="kpi-card-top">
            <div>
              <p className="text-label-md text-on-surface-variant">
                Total de Egresos
              </p>
              <h3 className="text-headline-lg mt-1">$45,350.00</h3>
            </div>
            <div className="kpi-icon kpi-icon--rose">
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>
            </div>
          </div>
          <div className="kpi-card-footer">
            <span className="badge badge--overdue">-3.5%</span>
            <span className="text-label-sm text-on-surface-variant">
              vs mes anterior
            </span>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="card kpi-card">
          <div className="kpi-card-top">
            <div>
              <p className="text-label-md text-on-surface-variant">
                Pagos Pendientes
              </p>
              <h3 className="text-headline-lg mt-1">$2,180.00</h3>
            </div>
            <div className="kpi-icon kpi-icon--amber">
              <span className="material-symbols-outlined">schedule</span>
            </div>
          </div>
          <div className="kpi-card-footer">
            <span className="badge badge--pending">2 facturas</span>
            <span className="text-label-sm text-on-surface-variant">
              por pagar
            </span>
          </div>
        </div>
      </div>

      {/* ── Filters bar ─────────────────────────────────────────────────── */}
      <div className="filters-bar">
        {/* Category */}
        <div className="filter-chip">
          <span className="filter-chip-label">Categoría:</span>
          <select
            className="filter-select"
            aria-label="Filtrar por categoría"
            value={filterCategory}
            onChange={(e) => updateFilter(setFilterCategory, e.target.value)}
          >
            <option value="all">Todas</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {categoryConfig[cat as ExpenseCategory].label}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="filter-chip">
          <span className="filter-chip-label">Estado:</span>
          <select
            className="filter-select"
            aria-label="Filtrar por estado"
            value={filterStatus}
            onChange={(e) => updateFilter(setFilterStatus, e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="paid">Pagado</option>
            <option value="pending">Pendiente</option>
            <option value="cancelled">Cancelado</option>
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
                <th className="th">Proveedor</th>
                <th className="th" style={{ textAlign: "center" }}>
                  Categoría
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
                        No se encontraron egresos con los filtros seleccionados.
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
                  const avatarClass = initialsColorMap[row.supplierInitialsColor];
                  const cat = categoryConfig[row.category];
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

                      {/* Supplier */}
                      <td className="td">
                        <div className="resident-cell">
                          <div
                            className={`owner-avatar ${avatarClass}`}
                            aria-hidden="true"
                          >
                            {row.supplierInitials}
                          </div>
                          <div>
                            <p className="text-body-sm font-bold text-on-surface">
                              {row.supplier}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="td" style={{ textAlign: "center" }}>
                        <div className="payments-method-cell">
                          <span className="material-symbols-outlined payments-method-icon">
                            {cat.icon}
                          </span>
                          <span className="text-label-sm text-on-surface-variant">
                            {cat.label}
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
                            aria-label={`Descargar factura de ${row.id}`}
                            title="Descargar Factura"
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
          label={`Mostrando ${paginated.length === 0 ? 0 : (safePage - 1) * ROWS_PER_PAGE + 1} a ${Math.min(safePage * ROWS_PER_PAGE, filtered.length)} de ${filtered.length} egresos`}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
