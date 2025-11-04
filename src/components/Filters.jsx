import React from 'react';

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="text-sm text-gray-800">
      {children}
    </label>
  );
}

function TextInput({ id, ...props }) {
  return (
    <input
      id={id}
      className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500 bg-white"
      {...props}
    />
  );
}

function NumberInput({ id, ...props }) {
  return (
    <input
      id={id}
      type="number"
      className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500 bg-white"
      {...props}
    />
  );
}

function Slider({ id, min = 0, max = 1, step = 0.05, ...props }) {
  return <input id={id} type="range" min={min} max={max} step={step} className="w-full accent-violet-600" {...props} />;
}

export default function Filters({ filters, onFiltersChange, weightHard, onWeightHardChange, loading, onApply }) {
  return (
    <section className="ui-panel p-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <div>
          <Label htmlFor="search">Busca</Label>
          <TextInput
            id="search"
            placeholder="Nome, role, tags"
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <TextInput id="role" placeholder="ex: Backend" value={filters.role} onChange={(e) => onFiltersChange({ ...filters, role: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="location">Localização</Label>
          <TextInput id="location" placeholder="ex: Lisboa" value={filters.location} onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="min_hard">Mín. Hard</Label>
          <NumberInput id="min_hard" min={0} max={100} value={filters.min_hard} onChange={(e) => onFiltersChange({ ...filters, min_hard: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="min_soft">Mín. Soft</Label>
          <NumberInput id="min_soft" min={0} max={100} value={filters.min_soft} onChange={(e) => onFiltersChange({ ...filters, min_soft: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="weight">Peso Hard</Label>
          <div className="flex items-center gap-3">
            <Slider id="weight" min={0} max={1} step={0.05} value={weightHard} onChange={(e) => onWeightHardChange(parseFloat(e.target.value))} />
            <span className="text-sm w-10 text-right">{weightHard.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="pt-3">
        <button className="ui-button-primary" onClick={onApply} disabled={loading}>
          {loading ? 'Carregando...' : 'Aplicar Filtros'}
        </button>
      </div>
    </section>
  );
}
