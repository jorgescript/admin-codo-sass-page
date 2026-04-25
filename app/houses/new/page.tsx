export default function NewHousePage() {
  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h2 className="text-headline-xl text-on-surface">Agregar Nueva Casa</h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Complete el formulario para registrar una nueva unidad residencial en el sistema.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-7">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-xl">
                <span className="material-symbols-outlined text-on-tertiary-container">
                  assignment
                </span>
                <h3 className="text-headline-md">Datos de la Unidad</h3>
              </div>
              <form className="space-y-lg">
                <div className="grid grid-cols-2 gap-md">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-label-md text-on-surface-variant mb-xs">
                      Número de casa
                    </label>
                    <input
                      className="w-full px-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container transition-all outline-none"
                      placeholder="Ej. A-102"
                      type="text"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-label-md text-on-surface-variant mb-xs">
                      Tipo de Propiedad
                    </label>
                    <select className="w-full px-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none">
                      <option>Residencial</option>
                      <option>Comercial</option>
                      <option>Penthouse</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-surface-container-highest my-xl"></div>

                <div>
                  <label className="block text-label-md text-on-surface-variant mb-xs">
                    Nombre del propietario
                  </label>
                  <input
                    className="w-full px-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container transition-all outline-none"
                    placeholder="Nombre completo"
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-2 gap-md">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-label-md text-on-surface-variant mb-xs">
                      Teléfono
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                        phone
                      </span>
                      <input
                        className="w-full pl-10 pr-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none"
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-label-md text-on-surface-variant mb-xs">
                      Email
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                        mail
                      </span>
                      <input
                        className="w-full pl-10 pr-md py-sm border border-outline-variant rounded-lg text-body-md focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none"
                        placeholder="correo@ejemplo.com"
                        type="email"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-xl flex gap-md">
                  <button
                    className="btn btn--primary flex-1 justify-center py-3"
                    type="submit"
                  >
                    <span className="material-symbols-outlined btn-icon">save</span>
                    Registrar Unidad
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
