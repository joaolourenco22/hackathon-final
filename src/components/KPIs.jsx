import React from 'react';

function KPI({ label, value }) {
  const display =
    value === null || value === undefined || value === '' ? '-' : value;
  return (
    <div className="p-4 ui-panel">
      <div className="text-xs text-gray-800">{label}</div>
      <div className="text-2xl font-semibold" aria-label={label}>
        {display}
      </div>
    </div>
  );
}

export default function KPIs({ kpis, jobsCount }) {
  const avgHard =
    typeof kpis?.average_hard === 'number'
      ? kpis.average_hard.toFixed(1)
      : undefined;
  const avgSoft =
    typeof kpis?.average_soft === 'number'
      ? kpis.average_soft.toFixed(1)
      : undefined;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <KPI label="Candidatos" value={kpis?.count} />
      <KPI label="Vagas" value={jobsCount} />
      <KPI label="Media Hard" value={avgHard} />
    </section>
  );
}
