// ── House Details page — Detalle de Casa ─────────────────────────────────────
"use client";

import { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";

// ── Types ─────────────────────────────────────────────────────────────────────

type TxStatus = "completed" | "pending" | "failed";
type TxMethod = "transferencia" | "tarjeta" | "efectivo";

interface Transaction {
  id: string;
  date: string;       // ISO – for filtering
  dateLabel: string;  // display
  concept: string;
  method: TxMethod;
  amount: string;
  status: TxStatus;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const transactions: Transaction[] = [
  {
    id: "#TRX-88210",
    date: "2024-05-05",
    dateLabel: "05 May, 2024",
    concept: "Mensualidad Mayo",
    method: "transferencia",
    amount: "$2,750.00",
    status: "completed",
  },
  {
    id: "#TRX-87954",
    date: "2024-04-03",
    dateLabel: "03 Abr, 2024",
    concept: "Mensualidad Abril",
    method: "tarjeta",
    amount: "$2,750.00",
    status: "completed",
  },
  {
    id: "#TRX-87421",
    date: "2024-03-12",
    dateLabel: "12 Mar, 2024",
    concept: "Mantenimiento Extra",
    method: "efectivo",
    amount: "$120.00",
    status: "pending",
  },
  {
    id: "#TRX-86119",
    date: "2024-03-02",
    dateLabel: "02 Mar, 2024",
    concept: "Mensualidad Marzo",
    method: "transferencia",
    amount: "$2,750.00",
    status: "completed",
  },
  {
    id: "#TRX-85678",
    date: "2024-02-05",
    dateLabel: "05 Feb, 2024",
    concept: "Mensualidad Febrero",
    method: "transferencia",
    amount: "$2,750.00",
    status: "completed",
  },
  {
    id: "#TRX-84990",
    date: "2024-01-08",
    dateLabel: "08 Ene, 2024",
    concept: "Mensualidad Enero",
    method: "tarjeta",
    amount: "$2,750.00",
    status: "failed",
  },
  {
    id: "#TRX-83401",
    date: "2023-12-05",
    dateLabel: "05 Dic, 2023",
    concept: "Mensualidad Diciembre",
    method: "efectivo",
    amount: "$2,750.00",
    status: "completed",
  },
  {
    id: "#TRX-82100",
    date: "2023-11-04",
    dateLabel: "04 Nov, 2023",
    concept: "Cuota Especial Evento",
    method: "transferencia",
    amount: "$500.00",
    status: "completed",
  },
];

// ── Config maps ────────────────────────────────────────────────────────────────

const statusConfig: Record<
  TxStatus,
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

const methodConfig: Record<TxMethod, { icon: string; label: string }> = {
  transferencia: { icon: "account_balance", label: "Transferencia" },
  tarjeta: { icon: "credit_card", label: "Tarjeta" },
  efectivo: { icon: "payments", label: "Efectivo" },
};

const conceptOptions = Array.from(new Set(transactions.map((t) => t.concept))).sort();

// ── Pagination constant ────────────────────────────────────────────────────────

const ROWS_PER_PAGE = 5;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HouseDetailsPage() {
  // ── Filter state ──────────────────────────────────────────────────────────
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterMethod, setFilterMethod] = useState<string>("all");
  const [filterConcept, setFilterConcept] = useState<string>("all");
  const [filterDateFrom, setFilterDateFrom] = useState<string>("");
  const [filterDateTo, setFilterDateTo] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Derived: filtered + paginated ─────────────────────────────────────────
  const filtered = transactions.filter((tx) => {
    if (filterStatus !== "all" && tx.status !== filterStatus) return false;
    if (filterMethod !== "all" && tx.method !== filterMethod) return false;
    if (filterConcept !== "all" && tx.concept !== filterConcept) return false;
    if (filterDateFrom && tx.date < filterDateFrom) return false;
    if (filterDateTo && tx.date > filterDateTo) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * ROWS_PER_PAGE,
    safePage * ROWS_PER_PAGE
  );

  function updateFilter<T>(setter: (v: T) => void, value: T) {
    setter(value);
    setCurrentPage(1);
  }

  function clearFilters() {
    setFilterStatus("all");
    setFilterMethod("all");
    setFilterConcept("all");
    setFilterDateFrom("");
    setFilterDateTo("");
    setCurrentPage(1);
  }

  return (
    <div className="page-stack">
      {/* ── Breadcrumb / back ────────────────────────────────────────────── */}
      <div className="hd-breadcrumb">
        <Link href="/houses" className="hd-breadcrumb-back" aria-label="Volver al listado">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <span className="text-on-surface-variant text-body-sm">/</span>
        <Link href="/houses" className="hd-breadcrumb-link">
          Casas
        </Link>
        <span className="text-on-surface-variant text-body-sm">/</span>
        <span className="text-body-sm text-on-surface font-semibold">
          Unidad 402 — Premium Suite
        </span>
      </div>

      {/* ── Bento grid ──────────────────────────────────────────────────── */}
      <div className="hd-bento-grid">

        {/* ── Main unit card (col 8) ──────────────────────────────────────── */}
        <div className="hd-unit-card">
          {/* Hero image */}
          <div className="hd-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIPHaXKfSXUXeEtnp5eu6dzA9LZcowvUwvKoj_G8r9AmWsdMzS-5i8iaUFopnONPTSJsPO5DitfPDUxCeGvFzZP_9--1cD7LxsKkn1hNtNf2xRuvejG1sCYvvm7Au9XWygKLvaRJxFeuwqZwNXsj_-cBwbJUD6EHJuT8sgk1JKhH9SLJ367sLvA4rFz2PsrK8ZTX6OXMkcSi76VtHbG0xbOY34jokH9FVgeS25tP0VTsdHw6PYFBcfB-QWlf9skHoB3c8XtDnmvISr"
              alt="Imagen exterior de la unidad residencial"
              className="hd-hero-img"
            />
            <div className="hd-hero-overlay" />
            <div className="hd-hero-meta">
              <span className="hd-status-badge">Alquilado</span>
              <h1 className="text-headline-xl" style={{ color: "#fff", fontWeight: 700 }}>
                Unidad 402 — Premium Suite
              </h1>
              <p className="hd-hero-address">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  location_on
                </span>
                Calle Principal #123, Ciudad de México
              </p>
            </div>
          </div>

          {/* Quick stats bar */}
          <div className="hd-stats-bar">
            <div className="hd-stat">
              <span className="hd-stat-label">Habitaciones</span>
              <span className="hd-stat-value">3</span>
            </div>
            <div className="hd-stat hd-stat--bordered">
              <span className="hd-stat-label">Baños</span>
              <span className="hd-stat-value">2.5</span>
            </div>
            <div className="hd-stat hd-stat--bordered">
              <span className="hd-stat-label">Área</span>
              <span className="hd-stat-value">124 m²</span>
            </div>
            <div className="hd-stat hd-stat--bordered">
              <span className="hd-stat-label">Estacionamiento</span>
              <span className="hd-stat-value">2</span>
            </div>
          </div>

          {/* Notes */}
          <div className="hd-notes">
            <h3 className="text-headline-md text-on-surface" style={{ marginBottom: "0.75rem" }}>
              Notas de la Unidad
            </h3>
            <p className="text-body-lg text-on-surface-variant" style={{ lineHeight: 1.7 }}>
              Mantenimiento preventivo de aire acondicionado realizado en Enero 2024.
              El residente reportó una leve filtración en el baño principal, programada
              para reparación el próximo lunes. Unidad incluye acabados de lujo y
              sistema inteligente de iluminación.
            </p>
          </div>
        </div>

        {/* ── Right column (col 4) ────────────────────────────────────────── */}
        <div className="hd-side-col">

          {/* Financial summary card */}
          <div className="card hd-finance-card">
            <div className="hd-finance-top">
              <div>
                <p className="text-label-md text-on-surface-variant">Balance Pendiente</p>
                <span className="hd-finance-amount">$1,250.00</span>
              </div>
              <span className="hd-finance-icon-wrap">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </span>
            </div>

            <div className="hd-finance-lines">
              <div className="hd-finance-line">
                <span className="text-body-sm text-on-surface-variant">Alquiler Mensual</span>
                <span className="hd-finance-line-amount">$2,400.00</span>
              </div>
              <div className="hd-finance-line">
                <span className="text-body-sm text-on-surface-variant">Mantenimiento</span>
                <span className="hd-finance-line-amount">$350.00</span>
              </div>
              <div className="hd-finance-line hd-finance-line--last">
                <span className="text-body-sm text-on-surface-variant">Otros Cargos</span>
                <span className="hd-finance-line-amount">$0.00</span>
              </div>
            </div>

            <button className="hd-debt-btn">
              <span className="material-symbols-outlined" style={{ fontSize: 17 }}>
                receipt_long
              </span>
              Ver Detalles de Deuda
            </button>
          </div>

          {/* Owner info card */}
          <div className="card hd-owner-card">
            <h4 className="text-label-md text-on-surface-variant" style={{ marginBottom: "1rem" }}>
              Información del Propietario
            </h4>

            <div className="hd-owner-header">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqNUcv47GQgwNCNn3bLQK7L-ntmmij-aKjPYsyThAUv_-ztUxGnL6QYNj8rfoatzJagTw1sNPMtk8n-ckpUhvumkVvY5I8nEct5Ey2F3vxyvU_yqrIHK4y5F91Qth9tH0SlicP_lUMTBqaO9d2Y6pvBRFPkqCLHDEjS9z1GnB1qeItl5G88HuqGZFHJ9GJK6-6UzvabAGA7bSE4cm4hkEJWXDhQ2LiwJeU6WdAniVkUcqspqYuxH3WloSZeXL-KBo8Ox2cQDXjCWVC"
                alt="Foto del propietario"
                className="hd-owner-avatar"
              />
              <div>
                <h5 className="text-body-sm font-bold text-on-surface">
                  Dr. Roberto Valenzuela
                </h5>
                <p className="text-label-sm text-on-surface-variant">Inversionista Senior</p>
              </div>
            </div>

            <div className="hd-owner-contacts">
              <div className="hd-owner-contact-row">
                <span className="material-symbols-outlined hd-contact-icon">mail</span>
                <span className="text-body-sm text-on-surface-variant">r.valenzuela@email.com</span>
              </div>
              <div className="hd-owner-contact-row">
                <span className="material-symbols-outlined hd-contact-icon">phone</span>
                <span className="text-body-sm text-on-surface-variant">+52 55 1234 5678</span>
              </div>
              <div className="hd-owner-contact-row">
                <span className="material-symbols-outlined hd-contact-icon">history</span>
                <span className="text-body-sm text-on-surface-variant">Propietario desde: Mar 2021</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Payment history table (col 12) ─────────────────────────────── */}
        <div className="hd-table-card card">

          {/* Card header */}
          <div className="card-header">
            <div>
              <h3 className="text-headline-md text-on-surface">Historial de Pagos</h3>
              <p className="text-body-sm text-on-surface-variant" style={{ marginTop: 2 }}>
                Registro completo de transacciones realizadas por la unidad
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

          {/* ── Filters bar ──────────────────────────────────────────────── */}
          <div className="filters-bar" style={{ borderRadius: 0, border: "none", borderBottom: "1px solid var(--color-outline-variant)" }}>
            {/* Concepto */}
            <div className="filter-chip">
              <span className="filter-chip-label">Concepto:</span>
              <select
                className="filter-select"
                aria-label="Filtrar por concepto"
                value={filterConcept}
                onChange={(e) => updateFilter(setFilterConcept, e.target.value)}
              >
                <option value="all">Todos</option>
                {conceptOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Estado */}
            <div className="filter-chip">
              <span className="filter-chip-label">Estado:</span>
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

            {/* Método */}
            <div className="filter-chip">
              <span className="filter-chip-label">Método:</span>
              <select
                className="filter-select"
                aria-label="Filtrar por método"
                value={filterMethod}
                onChange={(e) => updateFilter(setFilterMethod, e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="transferencia">Transferencia</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="efectivo">Efectivo</option>
              </select>
            </div>

            {/* Desde */}
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

            {/* Hasta */}
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

          {/* ── Table ────────────────────────────────────────────────────── */}
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr className="table-head-row">
                  <th className="th">ID Transacción</th>
                  <th className="th">Fecha de Pago</th>
                  <th className="th">Concepto</th>
                  <th className="th" style={{ textAlign: "center" }}>Método</th>
                  <th className="th th--right">Monto</th>
                  <th className="th" style={{ textAlign: "center" }}>Estado</th>
                  <th className="th" style={{ textAlign: "center" }}>Acción</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="td" style={{ textAlign: "center", padding: "2.5rem 0" }}>
                      <div className="payments-empty-state">
                        <span className="material-symbols-outlined payments-empty-icon">
                          search_off
                        </span>
                        <p className="text-body-md text-on-surface-variant">
                          No se encontraron transacciones con los filtros seleccionados.
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
                  paginated.map((tx) => {
                    const { label, badgeClass, dotClass } = statusConfig[tx.status];
                    const method = methodConfig[tx.method];
                    return (
                      <tr key={tx.id} className="tr houses-row">
                        {/* ID */}
                        <td className="td">
                          <span className="text-body-sm font-bold text-on-surface">
                            {tx.id}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="td text-body-sm text-on-surface-variant">
                          {tx.dateLabel}
                        </td>

                        {/* Concept */}
                        <td className="td">
                          <span className="text-body-sm font-semibold text-on-surface">
                            {tx.concept}
                          </span>
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
                            {tx.amount}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="td" style={{ textAlign: "center" }}>
                          <span className={`${badgeClass} houses-badge`}>
                            <span className={dotClass} aria-hidden="true" />
                            {label}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="td houses-actions-cell">
                          <div className="houses-actions">
                            <button
                              className="table-action-btn"
                              aria-label={`Ver detalle de ${tx.id}`}
                              title="Ver Detalle"
                            >
                              <span className="material-symbols-outlined">visibility</span>
                            </button>
                            <button
                              className="table-action-btn"
                              aria-label={`Descargar recibo de ${tx.id}`}
                              title="Descargar Recibo"
                            >
                              <span className="material-symbols-outlined">receipt_long</span>
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

          {/* ── Pagination ────────────────────────────────────────────────── */}
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            label={`Mostrando ${
              paginated.length === 0 ? 0 : (safePage - 1) * ROWS_PER_PAGE + 1
            } a ${Math.min(safePage * ROWS_PER_PAGE, filtered.length)} de ${
              filtered.length
            } transacciones`}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
