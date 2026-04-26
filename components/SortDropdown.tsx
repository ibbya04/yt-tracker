'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const sortOptions = [
  { label: 'Size (Subscribers)', value: 'subs_desc' },
  { label: 'Total Views', value: 'views_desc' },
  { label: 'Alphabetical', value: 'name_asc' },
  { label: 'Recent Acquisitions', value: 'newest' },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSort = searchParams.get('sort') || 'subs_desc';

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-400 uppercase">Sort By:</span>
      <select
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
        className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none transition-all cursor-pointer"
        disabled={isPending}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}