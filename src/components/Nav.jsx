import React from 'react';

export default function Nav() {
  return (
    <nav role="navigation" aria-label="Principal" className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-6 bg-violet-600 rounded-sm" aria-hidden="true" />
          <span className="font-semibold text-gray-900">Recruiter Dashboard</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="/" className="text-gray-900 hover:text-violet-700">Dashboard</a>
        </div>
      </div>
    </nav>
  );
}

