import React, { useMemo } from 'react';
import Radar from './Radar';

export default function ComparisonRadar({ candidates = [], selectedIds = [] }) {
  const datasets = useMemo(() => {
    const palette = ['#7c3aed', '#dc2626', '#16a34a'];
    return candidates
      .filter((c) => selectedIds.includes(c._id))
      .slice(0, 3)
      .map((c, i) => ({ label: c.name, color: palette[i % palette.length], values: [c.hard_score, c.soft_score ?? 0, c.total_score ?? 0] }));
  }, [candidates, selectedIds]);

  return (
    <div className="ui-panel p-4">
      <h2 className="text-sm text-gray-800 mb-2">Radar Comparação (Hard × Soft × Total)</h2>
      <Radar title="Radar Comparação" axes={['Hard', 'Soft', 'Total']} datasets={datasets} maxValue={100} />
      <div className="text-xs text-gray-700 mt-2">Selecione até 3 candidatos para comparar.</div>
    </div>
  );
}
