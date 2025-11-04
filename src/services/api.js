// Serviço de chamadas à API do Dashboard do Recrutador

function toQuery(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    searchParams.set(k, String(v));
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

export async function fetchCandidates(params = {}) {
  const res = await fetch(`/api/candidates${toQuery(params)}`);
  if (!res.ok) throw new Error('Erro ao carregar candidatos');
  return res.json();
}

export async function fetchKPIs(params = {}) {
  const res = await fetch(`/api/kpis${toQuery(params)}`);
  if (!res.ok) throw new Error('Erro ao carregar KPIs');
  return res.json();
}

export async function fetchCandidateById(id, params = {}) {
  const res = await fetch(`/api/candidates/${id}${toQuery(params)}`);
  if (!res.ok) throw new Error('Erro ao carregar candidato');
  return res.json();
}

export async function createCandidate(payload) {
  const res = await fetch('/api/candidates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.erro || 'Erro ao criar candidato');
  }
  return res.json();
}

export async function seed(reset = true) {
  const res = await fetch(`/api/seed${toQuery({ reset })}`, { method: 'POST' });
  if (!res.ok) throw new Error('Erro ao semear base de dados');
  return res.json();
}
