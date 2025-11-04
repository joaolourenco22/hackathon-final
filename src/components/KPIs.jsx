import React from 'react';

function KPI({ label, value }) {
  return (
    <div className="p-4 ui-panel">
      <div className="text-xs text-gray-800">{label}</div>
      <div className="text-2xl font-semibold" aria-label={label}>
        {value ?? '—'}
      </div>
    </div>
  );
}

export default function KPIs({ kpis }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <KPI label="Média Hard" value={kpis?.average_hard ? kpis.average_hard.toFixed(1) : '—'} />
      <KPI label="Média Soft" value={kpis?.average_soft ? kpis.average_soft.toFixed(1) : '—'} />
      <KPI label="Top 10% Threshold" value={kpis?.top10_percent_threshold ? kpis.top10_percent_threshold.toFixed(1) : '—'} />
      <KPI label="Total" value={kpis?.count ?? '—'} />
    </section>
  );
}
