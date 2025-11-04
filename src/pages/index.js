import { useEffect, useMemo, useState } from 'react';
import { fetchCandidates, fetchKPIs, seed } from '@/services/api';
import Filters from '@/components/Filters';
import KPIs from '@/components/KPIs';
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
  }, []);

  useEffect(() => {
    loadAll();
  }, [weightHard]);

  const activeCandidate = useMemo(
    () => candidates.find((c) => c._id === activeId),
    [candidates, activeId]
  );

  return (
    <div className="bg-[#f5f5f8] min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Bem-vindo!</h1>
        </header>
      </div>
    </div>
  );
}
