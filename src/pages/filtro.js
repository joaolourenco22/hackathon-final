import { useEffect, useState } from "react";
import Filters from "@/components/Filters";
import KPIs from "@/components/KPIs";
import CandidateCardAll from "@/components/CandidateCardAll";
import ComparisonRadar from "@/components/ComparisonRadar";

function deriveStacks(c) {
  const tags = Array.isArray(c?.tags) ? c.tags.map((x) => String(x).toLowerCase()) : [];
  const role = String(c?.role || '').toLowerCase();
  const addIf = (cond, label, set) => { if (cond) set.add(label); };
  const has = (keys) => keys.some((k) => tags.some((t) => t.includes(k)));
  const s = new Set();
  // Languages
  addIf(has(['javascript','js','node','react','vue','next']) || role.includes('front') || role.includes('back'), 'JavaScript', s);
  addIf(has(['typescript','ts']) || role.includes('front') || role.includes('full'), 'TypeScript', s);
  addIf(has(['python']) || role.includes('data') || role.includes('ml') || role.includes('ai'), 'Python', s);
  addIf(tags.includes('java') || has([' spring','spring ']), 'Java', s);
  addIf(has(['c#','csharp','.net','dotnet']), 'C#', s);
  addIf(has(['c++','cpp']), 'C++', s);
  addIf(tags.includes('php') || has(['laravel']), 'PHP', s);
  addIf(tags.includes('go') || tags.includes('golang'), 'Go', s);
  addIf(tags.includes('ruby') || has(['rails']), 'Ruby', s);
  addIf(tags.includes('rust'), 'Rust', s);
  addIf(tags.includes('kotlin') || role.includes('android'), 'Kotlin', s);
  addIf(tags.includes('swift') || role.includes('ios'), 'Swift', s);
  addIf(has(['sql','postgres','mysql']), 'SQL', s);
  addIf(tags.includes('html'), 'HTML', s);
  addIf(has(['css','sass','tailwind']), 'CSS', s);
  // Frameworks/areas
  addIf(has(['react']), 'React', s);
  addIf(has(['node']), 'Node', s);
  addIf(has(['vue']), 'Vue', s);
  addIf(has(['next']), 'Next.js', s);
  addIf(has(['angular']), 'Angular', s);
  addIf(has(['spring']), 'Spring', s);
  addIf(has(['.net','dotnet','c#']), '.NET', s);
  addIf(has(['django']), 'Django', s);
  addIf(has(['rails']), 'Rails', s);
  addIf(has(['laravel']), 'Laravel', s);
  // Cloud/infra
  addIf(has(['aws']), 'AWS', s);
  addIf(has(['azure']), 'Azure', s);
  addIf(has(['gcp','google cloud']), 'GCP', s);
  addIf(has(['docker']), 'Docker', s);
  addIf(has(['k8s','kubernetes']), 'Kubernetes', s);
  return Array.from(s);
}

// Mocked candidates
const MOCK_CANDIDATES = [
  {
    _id: 'c1', name: 'Ana Souza', role: 'Desenvolvedora Frontend', location: 'Coimbra',
    work_mode: 'remote', carga: 'full_time', relocate: 'no', years_experience: 4,
    tags: ['react','typescript','javascript','css','tailwind','next'], total_score: 82, hard_score: 78,
    soft_skills: { 'Comunicação': 4, 'Colaboração': 5, 'Liderança': 3, 'Adaptabilidade': 4, 'Resolução de Problemas': 4, 'Criatividade': 4 },
  },
  {
    _id: 'c2', name: 'Bruno Lima', role: 'Engenheiro Backend', location: 'Braga',
    work_mode: 'hybrid', carga: 'full_time', relocate: 'yes', years_experience: 6,
    tags: ['node','typescript','docker','aws','postgres','express'], total_score: 88, hard_score: 84,
    soft_skills: { 'Comunicação': 3, 'Colaboração': 4, 'Liderança': 4, 'Adaptabilidade': 5, 'Resolução de Problemas': 5, 'Criatividade': 3 },
  },
  {
    _id: 'c3', name: 'Carla Mendes', role: 'Cientista de Dados', location: 'Aveiro',
    work_mode: 'remote', carga: 'part_time', relocate: 'no', years_experience: 3,
    tags: ['python','ml','pandas','gcp','sql'], total_score: 79, hard_score: 76,
    soft_skills: { 'Comunicação': 4, 'Colaboração': 4, 'Liderança': 3, 'Adaptabilidade': 4, 'Resolução de Problemas': 5, 'Criatividade': 4 },
  },
  {
    _id: 'c4', name: 'Diego Alves', role: 'DevOps Engineer', location: 'Aveiro',
    work_mode: 'onsite', carga: 'full_time', relocate: 'yes', years_experience: 5,
    tags: ['aws','kubernetes','docker','terraform','go'], total_score: 85, hard_score: 83,
    soft_skills: { 'Comunicação': 3, 'Colaboração': 5, 'Liderança': 3, 'Adaptabilidade': 4, 'Resolução de Problemas': 5, 'Criatividade': 3 },
  },
  {
    _id: 'c5', name: 'Eduarda Pires', role: 'Mobile Developer', location: 'Porto Alegre',
    work_mode: 'hybrid', carga: 'part_time', relocate: 'no', years_experience: 2,
    tags: ['kotlin','android','swift','ios'], total_score: 72, hard_score: 70,
    soft_skills: { 'Comunicação': 5, 'Colaboração': 4, 'Liderança': 2, 'Adaptabilidade': 4, 'Resolução de Problemas': 3, 'Criatividade': 5 },
  },
  {
    _id: 'c6', name: 'Felipe Santos', role: 'Full Stack Developer', location: 'Recife',
    work_mode: 'remote', carga: 'full_time', relocate: 'yes', years_experience: 7,
    tags: ['react','node','typescript','next','postgres','docker'], total_score: 91, hard_score: 90,
    soft_skills: { 'Comunicação': 4, 'Colaboração': 5, 'Liderança': 4, 'Adaptabilidade': 5, 'Resolução de Problemas': 5, 'Criatividade': 4 },
  },
  {
    _id: 'c7', name: 'Gabriela Rocha', role: 'QA Engineer', location: 'Coimbra',
    work_mode: 'onsite', carga: 'full_time', relocate: 'no', years_experience: 4,
    tags: ['cypress','jest','javascript','typescript'], total_score: 74, hard_score: 71,
    soft_skills: { 'Comunicação': 4, 'Colaboração': 5, 'Liderança': 3, 'Adaptabilidade': 3, 'Resolução de Problemas': 4, 'Criatividade': 3 },
  },
  {
    _id: 'c8', name: 'Hugo Pereira', role: 'Engenheiro Backend', location: 'Florianópolis',
    work_mode: 'remote', carga: 'full_time', relocate: 'yes', years_experience: 8,
    tags: ['java','spring','aws','kubernetes','mysql'], total_score: 87, hard_score: 85,
    soft_skills: { 'Comunicação': 3, 'Colaboração': 4, 'Liderança': 5, 'Adaptabilidade': 4, 'Resolução de Problemas': 5, 'Criatividade': 3 },
  },
];

// Expande a lista mock clonando variações leves para testes de filtro
function expandCandidates(base = [], times = 3) {
  const locs = ['Porto', 'Lisboa', 'Algarve', 'Braga'];
  const out = [...base];
  for (let t = 1; t <= times; t++) {
    base.forEach((c, idx) => {
      const id = `${c._id}_x${t}`;
      const name = `${c.name} ${t+1}`;
      const location = locs[(idx + t) % locs.length];
      const tweak = (v) => Math.max(50, Math.min(100, Math.round((Number(v)||0) + (t*3) - (idx%2?2:0))));
      out.push({
        ...c,
        _id: id,
        name,
        location,
        total_score: tweak(c.total_score),
        hard_score: tweak(c.hard_score),
      });
    });
  }
  return out;
}

export default function Fil() {
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    location: "",
    min_hard: "",
    min_soft: "",
    home_office: "",
    experience: "",
    modalidade: "",
    carga: "",
    relocate: "",
    stacks: [],
  });
  const [roles, setRoles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [kpis, setKpis] = useState(null);
  const initialExpanded = expandCandidates(MOCK_CANDIDATES, 7);
  const fixedLocs = ['Porto', 'Lisboa', 'Algarve', 'Braga'];
  const normalized = initialExpanded.map((c, i) => ({ ...c, location: fixedLocs[i % fixedLocs.length] }));
  const [candidates, setCandidates] = useState(normalized);
  const [list, setList] = useState(normalized);
  const [selectedIds, setSelectedIds] = useState([]);

  function computeSoftScore(c) {
    const vals = c && c.soft_skills ? Object.values(c.soft_skills).map(Number).filter((n) => Number.isFinite(n)) : [];
    if (!vals.length) return 0;
    const avg = vals.reduce((s, n) => s + n, 0) / vals.length; // 1-5
    return Math.round((avg / 5) * 100); // 0-100
  }

  useEffect(() => {
    try {
      const uniq = (arr) => Array.from(new Set(arr.filter(Boolean))).sort((a, b) => String(a).localeCompare(String(b)));
      setRoles(uniq(candidates.map((c) => c.role)));
      setLocations(uniq(candidates.map((c) => c.location)));
      const stacksSet = new Set();
      candidates.forEach((c) => deriveStacks(c).forEach((x) => stacksSet.add(x)));
      setStacks(Array.from(stacksSet).sort((a, b) => a.localeCompare(b)));
      setList(candidates.slice().sort((a, b) => Number(b.total_score||0) - Number(a.total_score||0)));
      const avgHard = candidates.reduce((s, c) => s + (Number(c.hard_score) || 0), 0) / Math.max(candidates.length, 1);
      setKpis({ count: candidates.length, average_hard: avgHard / 10 });
    } catch (e) {
      console.error(e);
    }
  }, [candidates]);

  async function onApply(nextFilters) {
    setLoading(true);
    try {
      const f = nextFilters || filters;
      const disableRegion = f.home_office === 'yes' || f.modalidade === 'remote';
      const minYearsMap = { '0-1': 0, '2-3': 2, '4-6': 4, '7+': 7 };
      const minYears = f.experience ? minYearsMap[f.experience] : undefined;
      const minSoftLikert = Number(f.min_soft);
      const minSoftPct = Number.isFinite(minSoftLikert) && minSoftLikert > 0 ? (minSoftLikert / 5) * 100 : 0;
      const softOf = (c) => (Number.isFinite(c.soft_score) ? Number(c.soft_score) : computeSoftScore(c));

      const filtered = candidates.filter((c) => {
        if (f.role && c.role !== f.role) return false;
        if (!disableRegion && f.location && c.location !== f.location) return false;
        if (f.modalidade && c.work_mode !== f.modalidade) return false;
        if (f.carga && c.carga !== f.carga) return false;
        if (f.relocate && (f.relocate === 'yes' ? c.relocate !== 'yes' : c.relocate !== 'no')) return false;
        if (typeof minYears === 'number' && !(Number(c.years_experience) >= minYears)) return false;
        if (Array.isArray(f.stacks) && f.stacks.length) {
          const cs = new Set(deriveStacks(c));
          const allSelectedPresent = f.stacks.every((s) => cs.has(s));
          if (!allSelectedPresent) return false;
        }
        if (f.home_office === 'yes' && !(c.work_mode === 'remote' || c.work_mode === 'hybrid')) return false;
        if (f.home_office === 'no' && !(c.work_mode === 'onsite')) return false;
        if (minSoftPct > 0 && softOf(c) < minSoftPct) return false;
        return true;
      });

      const sortBy = (f.sort_by || 'total');
      filtered.sort((a, b) => {
        if (sortBy === 'soft') return softOf(b) - softOf(a);
        if (sortBy === 'hard') return Number(b.hard_score || 0) - Number(a.hard_score || 0);
        return Number(b.total_score || 0) - Number(a.total_score || 0);
      });
      setList(filtered);

      const avgHard = filtered.reduce((s, c) => s + (Number(c.hard_score) || 0), 0) / Math.max(filtered.length, 1);
      setKpis({ count: filtered.length, average_hard: avgHard / 10 });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function toggleSelected(id) {
    setSelectedIds((prev) => {
      const has = prev.includes(id);
      if (has) return prev.filter((x) => x !== id);
      // limit to 3 selected
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }

  return (
    <>
      <h1 className="text-xl font-semibold px-4 pt-4">Filtrar Candidatos</h1>
      <div className="p-4 space-y-4">
        <Filters
          filters={filters}
          onFiltersChange={setFilters}
          loading={loading}
          onApply={onApply}
          roles={roles}
          locations={locations}
          stacks={stacks}
        />

        <KPIs kpis={kpis} />

        {/* Seleção para comparação */}
        <section className="ui-panel p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-sm text-gray-800">Selecionados para comparação ({selectedIds.length}/3)</div>
            <div className="flex gap-2 flex-wrap">
              {selectedIds.map((id) => {
                const c = list.find((x) => x._id === id) || candidates.find((x) => x._id === id);
                return c ? (
                  <span key={id} className="ui-chip inline-flex items-center">
                    {c.name}
                    <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => toggleSelected(id)}>×</button>
                  </span>
                ) : null;
              })}
              {selectedIds.length > 0 && (
                <button className="text-sm text-violet-700 hover:text-violet-900" onClick={() => setSelectedIds([])}>Limpar seleção</button>
              )}
            </div>
          </div>
          {selectedIds.length >= 2 && (
            <div className="mt-3">
              <ComparisonRadar candidates={list} selectedIds={selectedIds} />
            </div>
          )}
        </section>

        {/* Lista de candidatos mock */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c, i) => (
            <CandidateCardAll
              key={c._id}
              candidate={c}
              index={i}
              selected={selectedIds.includes(c._id)}
              onToggleSelected={() => toggleSelected(c._id)}
            />
          ))}
        </section>
      </div>
    </>
  );
}
