export default function NewExpensePage() {
  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h2 className="text-headline-xl text-on-surface">Registrar Nuevo Gasto</h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Complete el formulario para registrar un egreso operativo o administrativo del condominio.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-7">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-xl">
                <span className="material-symbols-outlined text-on-tertiary-container">
                  account_balance_wallet
                </span>
                <h3 className="text-headline-md">Datos del Gasto</h3>
              </div>
              <form className="space-y-lg">
                <div>
                  <label className="block text-label-md text-on-surface-variant mb-xs">
                    Concepto / Descripción
                  </label>
                  <input
                    className="w-full px-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container transition-all outline-none"
                    placeholder="Ej. Reparación de bomba de agua"
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-2 gap-md">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-label-md text-on-surface-variant mb-xs">
                      Categoría
                    </label>
                    <select className="w-full px-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none">
                      <option>Mantenimiento</option>
                      <option>Servicios (Agua, Luz)</option>
                      <option>Jardinería</option>
                      <option>Seguridad</option>
                      <option>Administrativo</option>
                      <option>Otros</option>
                    </select>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-label-md text-on-surface-variant mb-xs">
                      Proveedor
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                        storefront
                      </span>
                      <input
                        className="w-full pl-10 pr-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none"
                        placeholder="Nombre de la empresa o persona"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-surface-container-highest my-xl"></div>

                <div className="grid grid-cols-2 gap-md">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-label-md text-on-surface-variant mb-xs">
                      Fecha del Gasto
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                        event
                      </span>
                      <input
                        className="w-full pl-10 pr-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-label-md text-on-surface-variant mb-xs">
                      Monto
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                        attach_money
                      </span>
                      <input
                        className="w-full pl-10 pr-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-label-md text-on-surface-variant mb-xs">
                    Factura / Referencia
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                      receipt
                    </span>
                    <input
                      className="w-full pl-10 pr-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container transition-all outline-none"
                      placeholder="Folio fiscal o número de recibo"
                      type="text"
                    />
                  </div>
                </div>

                <div className="pt-xl flex gap-md">
                  <button
                    className="btn btn--primary flex-1 justify-center py-3"
                    type="submit"
                  >
                    <span className="material-symbols-outlined btn-icon">save</span>
                    Registrar Gasto
                  </button>
                  <button
                    className="btn btn--secondary px-lg py-3"
                    type="button"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
