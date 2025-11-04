import React from 'react';
import Radar from './Radar';

export default function IndividualPanel({ candidate }) {
  if (!candidate) {
    return <div className="text-sm text-gray-600">Selecione um candidato no ranking.</div>;
  }

  const axes = ['Comunicação', 'Trabalho em Equipe', 'Resolução de Problemas', 'Adaptabilidade', 'Liderança', 'Criatividade'];
  const values = [
    candidate.soft_skills?.communication ?? 0,
    candidate.soft_skills?.teamwork ?? 0,
    candidate.soft_skills?.problem_solving ?? 0,
    candidate.soft_skills?.adaptability ?? 0,
    candidate.soft_skills?.leadership ?? 0,
    candidate.soft_skills?.creativity ?? 0,
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="md:col-span-2">
        <Radar title={`Soft Skills de ${candidate.name}`} axes={axes} datasets={[{ label: candidate.name, color: '#7c3aed', values }]} maxValue={100} />
      </div>
      <div className="space-y-1 text-sm">
        <div className="font-semibold">{candidate.name}</div>
        <div className="text-gray-800">
          {candidate.role} • {candidate.location}
        </div>
        <div className="text-gray-800">Exp.: {candidate.years_experience} anos</div>
        <div className="flex flex-wrap gap-1 pt-2">
          {(candidate.tags || []).map((t) => (
            <span key={t} className="px-2 py-0.5 bg-violet-50 text-violet-700 rounded-full text-xs">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
