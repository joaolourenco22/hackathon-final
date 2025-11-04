import { useEffect, useMemo, useState } from 'react';
import { fetchCandidates, fetchKPIs, seed } from '@/services/api';
import Filters from '@/components/Filters';
import KPIs from '@/components/KPIs';
import Ranking from '@/components/Ranking';
import IndividualPanel from '@/components/IndividualPanel';
import ComparisonRadar from '@/components/ComparisonRadar';

export default function Home() {
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    location: '',
    min_hard: '',
    min_soft: '',
  });
  const [weightHard, setWeightHard] = useState(0.6);
  const [candidates, setCandidates] = useState([]);
  const [kpis, setKpis] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadAll() {
    setLoading(true);
    try {
      const params = { ...filters, weight_hard: weightHard, sort_by: 'total', order: 'desc', limit: 50 };
      const [list, kpiData] = await Promise.all([fetchCandidates(params), fetchKPIs(params)]);
      setCandidates(list);
      setKpis(kpiData);
      if (list.length && !activeId) setActiveId(list[0]._id);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await loadAll();
        if (!candidates.length) {
          await seed(true);
          await loadAll();
        }
      } catch (e) {
        console.error(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weightHard]);

  const activeCandidate = useMemo(
    () => candidates.find((c) => c._id === activeId),
    [candidates, activeId]
  );

  return (
    <div className="bg-[#f5f5f8] min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard do Recrutador</h1>
          <div className="text-sm text-gray-800">Peso Hard: {(weightHard * 100).toFixed(0)}%</div>
        </header>

        <Filters
          filters={filters}
          onFiltersChange={setFilters}
          weightHard={weightHard}
          onWeightHardChange={setWeightHard}
          loading={loading}
          onApply={loadAll}
        />

        <KPIs kpis={kpis} />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <Ranking
            candidates={candidates}
            selectedIds={selectedIds}
            activeId={activeId}
            onActiveChange={setActiveId}
            onToggleSelect={(id) =>
              setSelectedIds((prev) => {
                const exists = prev.includes(id);
                if (exists) return prev.filter((x) => x !== id);
                if (prev.length >= 3) return prev;
                return [...prev, id];
              })
            }
          />
          <ComparisonRadar candidates={candidates} selectedIds={selectedIds} />
        </section>

        <section className="ui-panel p-4">
          <h2 className="text-sm text-gray-700 mb-2">Radar Individual (Soft Skills)</h2>
          <IndividualPanel candidate={activeCandidate} />
        </section>
      </div>
    </div>
  );
}
