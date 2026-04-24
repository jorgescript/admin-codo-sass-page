export default function DashboardPage() {
  // ── Chart bar data ──────────────────────────────────────────────────────
  const monthlyBars = [
    { month: "Ene", height: "40%", value: "$12k", colorClass: "chart-bar--1" },
    { month: "Feb", height: "55%", value: "$18k", colorClass: "chart-bar--2" },
    { month: "Mar", height: "45%", value: "$15k", colorClass: "chart-bar--3" },
    { month: "Abr", height: "75%", value: "$24k", colorClass: "chart-bar--4" },
    { month: "May", height: "90%", value: "$29k", colorClass: "chart-bar--5", isCurrent: true },
    { month: "Jun", height: "20%", value: null, colorClass: "chart-bar--empty" },
  ];

  // ── Activity table rows ─────────────────────────────────────────────────
  const activityRows = [
    {
      initials: "RA",
      name: "Ricardo Arjona",
      unit: "Torre A - 402",
      concept: "Cuota Administración Mayo",
      date: "24 Mayo, 2024",
      amount: "$450.00",
      status: "Pagado",
      statusClass: "badge badge--paid",
    },
    {
      initials: "SM",
      name: "Sandra Muvdi",
      unit: "Torre B - 105",
      concept: "Reserva de Piscina",
      date: "23 Mayo, 2024",
      amount: "$25.00",
      status: "Pendiente",
      statusClass: "badge badge--pending",
    },
    {
      initials: "JP",
      name: "Juan Pérez",
      unit: "Torre A - 201",
      concept: "Cuota Administración Mayo",
      date: "22 Mayo, 2024",
      amount: "$450.00",
      status: "Vencido",
      statusClass: "badge badge--overdue",
    },
  ];

  return (
    <div className="page-stack">
      {/* ── Page header ──────────────────────────────────────────────── */}
      <div className="page-header">
        <div>
          <h2 className="text-headline-xl text-on-surface">Resumen Financiero</h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Estado actual del portafolio al 24 de Mayo, 2024
          </p>
        </div>
        <div className="flex gap-md">
          <button className="btn btn--secondary">
            <span className="material-symbols-outlined btn-icon">
              file_download
            </span>
            Exportar Reporte
          </button>
          <button className="btn btn--primary">
            <span className="material-symbols-outlined btn-icon">add</span>
            Nueva Factura
          </button>
        </div>
      </div>

      {/* ── KPI cards ────────────────────────────────────────────────── */}
      <div className="kpi-grid">
        {/* Total Recaudado */}
        <div className="card kpi-card">
          <div className="kpi-card-top">
            <div>
              <p className="text-label-md text-on-surface-variant">Total Recaudado</p>
              <h3 className="text-headline-lg mt-1">$124,500.00</h3>
            </div>
            <div className="kpi-icon kpi-icon--green">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
          </div>
          <div className="kpi-card-footer">
            <span className="badge badge--paid">+12.5%</span>
            <span className="text-label-sm text-on-surface-variant">vs mes anterior</span>
          </div>
        </div>

        {/* Cuotas Pendientes */}
        <div className="card kpi-card">
          <div className="kpi-card-top">
            <div>
              <p className="text-label-md text-on-surface-variant">Cuotas Pendientes</p>
              <h3 className="text-headline-lg mt-1">$42,320.00</h3>
            </div>
            <div className="kpi-icon kpi-icon--blue">
              <span className="material-symbols-outlined">schedule</span>
            </div>
          </div>
          <div className="kpi-card-footer">
            <span className="badge badge--pending">18 unidades</span>
            <span className="text-label-sm text-on-surface-variant">por procesar</span>
          </div>
        </div>

        {/* Morosidad */}
        <div className="card kpi-card">
          <div className="kpi-card-top">
            <div>
              <p className="text-label-md text-on-surface-variant">Morosidad</p>
              <h3 className="text-headline-lg mt-1">4.2%</h3>
            </div>
            <div className="kpi-icon kpi-icon--red">
              <span className="material-symbols-outlined">warning</span>
            </div>
          </div>
          <div className="kpi-card-footer">
            <span className="badge badge--overdue">-0.8%</span>
            <span className="text-label-sm text-on-surface-variant">reducción histórica</span>
          </div>
        </div>
      </div>

      {/* ── Charts row ───────────────────────────────────────────────── */}
      <div className="charts-grid">
        {/* Bar chart — monthly income */}
        <div className="card charts-grid-main">
          <div className="card-header">
            <h4 className="text-headline-md">Ingresos Mensuales</h4>
            <select className="select-sm" aria-label="Select year">
              <option>Año 2024</option>
              <option>Año 2023</option>
            </select>
          </div>
          <div className="card-body">
            <div className="bar-chart" role="img" aria-label="Gráfico de ingresos mensuales">
              {monthlyBars.map(({ month, height, value, colorClass, isCurrent }) => (
                <div
                  key={month}
                  className={`chart-bar-wrap ${isCurrent ? "chart-bar-wrap--current" : ""}`}
                >
                  <div
                    className={`chart-bar ${colorClass}`}
                    style={{ height }}
                    title={value ?? "Proyectado"}
                  >
                    {value && (
                      <span className="chart-bar-tooltip">{value}</span>
                    )}
                  </div>
                  <span className={`chart-bar-label ${isCurrent ? "font-semibold text-on-surface" : ""}`}>
                    {month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donut chart — expense distribution */}
        <div className="card charts-grid-side">
          <div className="card-header">
            <h4 className="text-headline-md">Distribución de Gastos</h4>
          </div>
          <div className="card-body donut-wrap">
            {/* Donut */}
            <div className="donut" role="img" aria-label="68% operativo">
              <div className="donut-ring donut-ring--fill" />
              <div className="donut-center">
                <span className="text-headline-md font-black">68%</span>
                <span className="text-label-sm text-on-surface-variant">Operativo</span>
              </div>
            </div>
            {/* Legend */}
            <ul className="donut-legend">
              <li className="donut-legend-item">
                <span className="donut-dot donut-dot--blue-600" />
                <span className="text-body-sm flex-1">Mantenimiento</span>
                <span className="text-body-sm font-bold">$12,400</span>
              </li>
              <li className="donut-legend-item">
                <span className="donut-dot donut-dot--blue-400" />
                <span className="text-body-sm flex-1">Servicios</span>
                <span className="text-body-sm font-bold">$8,120</span>
              </li>
              <li className="donut-legend-item">
                <span className="donut-dot donut-dot--slate-300" />
                <span className="text-body-sm flex-1">Administrativo</span>
                <span className="text-body-sm font-bold">$3,200</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Recent activity table ─────────────────────────────────────── */}
      <div className="card">
        <div className="card-header">
          <h4 className="text-headline-md">Actividad Reciente</h4>
          <a href="#" className="text-label-md text-on-tertiary-container hover:underline">
            Ver Todo
          </a>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr className="table-head-row">
                <th className="th">Residente / Unidad</th>
                <th className="th">Concepto</th>
                <th className="th">Fecha</th>
                <th className="th">Monto</th>
                <th className="th">Estado</th>
                <th className="th th--right">Acciones</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {activityRows.map((row) => (
                <tr key={row.name} className="tr">
                  <td className="td">
                    <div className="resident-cell">
                      <div className="resident-avatar" aria-hidden="true">
                        {row.initials}
                      </div>
                      <div>
                        <p className="text-body-sm font-bold text-on-surface">{row.name}</p>
                        <p className="text-label-sm text-on-surface-variant">{row.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="td text-body-sm text-on-surface-variant">{row.concept}</td>
                  <td className="td text-body-sm text-on-surface-variant">{row.date}</td>
                  <td className="td text-body-sm font-bold text-on-surface">{row.amount}</td>
                  <td className="td">
                    <span className={row.statusClass}>{row.status}</span>
                  </td>
                  <td className="td td--right">
                    <button
                      className="table-action-btn"
                      aria-label={`Acciones para ${row.name}`}
                    >
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
