'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

// You can expand this list as you add more data to your DB
const investmentTypes = [
  { label: 'All Types', value: 'all' },
  { label: 'Acquisition', value: 'Acquisition' },
  { label: 'Majority Investment', value: 'Majority Investment' },
  { label: 'Minority Investment', value: 'Minority Investment' },
];

export default function TypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentType = searchParams.get('type') || 'all';

  function handleFilter(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('type');
    } else {
      params.set('type', value);
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-400 uppercase">Investment:</span>
      <select
        value={currentType}
        onChange={(e) => handleFilter(e.target.value)}
        className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer disabled:opacity-50"
        disabled={isPending}
      >
        {investmentTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}