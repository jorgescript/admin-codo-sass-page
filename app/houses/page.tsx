// ── Houses page — Listado de Casas ──────────────────────────────────────────

import Pagination from "@/components/common/Pagination";

interface HouseRow {
  id: string;
  unit: string;
  ownerInitials: string;
  ownerInitialsColor: string; // Tailwind bg/text color pair as CSS var alias
  ownerName: string;
  status: "paid" | "pending" | "overdue";
  lastPayment: string;

}

const houseRows: HouseRow[] = [
  {
    id: "#40921",
    unit: "Manzana A — Casa 04",
    ownerInitials: "RL",
    ownerInitialsColor: "blue",
    ownerName: "Ricardo Ledesma",
    status: "paid",
    lastPayment: "12 Oct 2023",
  },
  {
    id: "#40922",
    unit: "Manzana A — Casa 12",
    ownerInitials: "AM",
    ownerInitialsColor: "purple",
    ownerName: "Andrea Mendoza",
    status: "pending",
    lastPayment: "08 Sep 2023",
  },
  {
    id: "#40925",
    unit: "Manzana B — Casa 01",
    ownerInitials: "JV",
    ownerInitialsColor: "orange",
    ownerName: "Jorge Villarreal",
    status: "overdue",
    lastPayment: "15 Jul 2023",
  },
  {
    id: "#40930",
    unit: "Manzana C — Casa 05",
    ownerInitials: "SG",
    ownerInitialsColor: "teal",
    ownerName: "Sofia Garcia",
    status: "paid",
    lastPayment: "01 Nov 2023",
  },
];

const statusConfig = {
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
  overdue: {
    label: "ATRASADO",
    badgeClass: "badge badge--overdue",
    dotClass: "status-dot status-dot--overdue",
  },
};

const initialsColorMap: Record<string, string> = {
  blue: "owner-avatar--blue",
  purple: "owner-avatar--purple",
  orange: "owner-avatar--orange",
  teal: "owner-avatar--teal",
};

export default function HousesPage() {
  return (
    <div className="page-stack">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="page-header">
        <div>
          <h2 className="text-headline-xl text-on-surface">Listado de Casas</h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Gestión centralizada de unidades residenciales y estados financieros.
          </p>
        </div>
        <div className="flex gap-md">
          <button className="btn btn--secondary">
            <span className="material-symbols-outlined btn-icon">download</span>
            Exportar CSV
          </button>
          <button className="btn btn--primary">
            <span className="material-symbols-outlined btn-icon">add</span>
            Nueva Unidad
          </button>
        </div>
      </div>

      {/* ── KPI cards ───────────────────────────────────────────────────── */}
      <div className="kpi-grid">
        {/* Total Pagado */}
        <div className="card kpi-card">
          <div className="kpi-card-top">
            <div>
              <p className="text-label-md text-on-surface-variant">Total Pagado</p>
              <h3 className="text-headline-lg mt-1">$142,500.00</h3>
            </div>
            <div className="kpi-icon kpi-icon--green">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
          </div>
          <div className="kpi-card-footer">
            <span className="badge badge--paid">+2.4%</span>
            <span className="text-label-sm text-on-surface-variant">vs mes anterior</span>
          </div>
        </div>

        {/* Pendiente */}
        <div className="card kpi-card">
          <div className="kpi-card-top">
            <div>
              <p className="text-label-md text-on-surface-variant">Pendiente</p>
              <h3 className="text-headline-lg mt-1">$12,840.00</h3>
            </div>
            <div className="kpi-icon kpi-icon--blue">
              <span className="material-symbols-outlined">pending</span>
            </div>
          </div>
          <div className="kpi-card-footer">
            <span className="badge badge--pending">8 unidades</span>
            <span className="text-label-sm text-on-surface-variant">por cobrar</span>
          </div>
        </div>

        {/* Atrasado */}
        <div className="card kpi-card">
          <div className="kpi-card-top">
            <div>
              <p className="text-label-md text-on-surface-variant">Atrasado</p>
              <h3 className="text-headline-lg mt-1">$3,420.00</h3>
            </div>
            <div className="kpi-icon kpi-icon--red">
              <span className="material-symbols-outlined">error_outline</span>
            </div>
          </div>
          <div className="kpi-card-footer">
            <span className="badge badge--overdue">3 unidades</span>
            <span className="text-label-sm text-on-surface-variant">en mora</span>
          </div>
        </div>
      </div>

      {/* ── Filters bar ─────────────────────────────────────────────────── */}
      <div className="filters-bar">
        <div className="filter-chip">
          <span className="filter-chip-label">Estado:</span>
          <select className="filter-select" aria-label="Filtrar por estado">
            <option>Todos</option>
            <option>Pagado</option>
            <option>Pendiente</option>
            <option>Atrasado</option>
          </select>
        </div>

        <div className="filter-chip">
          <span className="filter-chip-label">Manzana:</span>
          <select className="filter-select" aria-label="Filtrar por manzana">
            <option>Todas</option>
            <option>A — Residencial</option>
            <option>B — Residencial</option>
            <option>C — Club</option>
          </select>
        </div>

        <div className="filter-chip">
          <span className="filter-chip-label">Fecha:</span>
          <input
            className="filter-select"
            type="month"
            aria-label="Filtrar por mes"
          />
        </div>

        <button className="filter-clear-btn">Limpiar Filtros</button>
      </div>

      {/* ── Main data table ─────────────────────────────────────────────── */}
      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr className="table-head-row">
                <th className="th">Unidad / Casa</th>
                <th className="th">Propietario</th>
                <th className="th" style={{ textAlign: "center" }}>Estado de Pago</th>
                <th className="th th--right">Último Pago</th>
                <th className="th" style={{ textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {houseRows.map((row) => {
                const { label, badgeClass, dotClass } = statusConfig[row.status];
                const avatarClass = initialsColorMap[row.ownerInitialsColor];
                return (
                  <tr key={row.id} className="tr houses-row">
                    {/* Unit cell */}
                    <td className="td">
                      <div className="house-unit-cell">
                        <div className="house-unit-icon">
                          <span className="material-symbols-outlined">home</span>
                        </div>
                        <div>
                          <p className="text-body-sm font-bold text-on-surface">
                            {row.unit}
                          </p>
                          <p className="text-label-sm text-on-surface-variant">
                            ID: {row.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Owner cell */}
                    <td className="td">
                      <div className="resident-cell">
                        <div className={`owner-avatar ${avatarClass}`} aria-hidden="true">
                          {row.ownerInitials}
                        </div>
                        <span className="text-body-sm text-on-surface">
                          {row.ownerName}
                        </span>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="td" style={{ textAlign: "center" }}>
                      <span className={`${badgeClass} houses-badge`}>
                        <span className={dotClass} aria-hidden="true" />
                        {label}
                      </span>
                    </td>

                    {/* Last payment */}
                    <td className="td td--right text-body-sm text-on-surface-variant">
                      {row.lastPayment}
                    </td>

                    {/* Actions */}
                    <td className="td houses-actions-cell">
                      <div className="houses-actions">
                        <button
                          className="table-action-btn"
                          aria-label={`Ver detalle de ${row.unit}`}
                          title="Ver Detalle"
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                        <button
                          className="table-action-btn"
                          aria-label={`Editar ${row.unit}`}
                          title="Editar"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ─────────────────────────────────────────────────── */}
        <Pagination
          currentPage={1}
          totalPages={60}
          label="Mostrando 1 a 4 de 240 unidades"
        />
      </div>
    </div>
  );
}
