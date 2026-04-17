import { supabase } from '@/lib/supabase';
import SearchField from '@/components/SearchField';
import Link from 'next/link';

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;

  // 1. Build the base query
  let query = supabase
    .from('channels')
    .select(`
      id,
      channel_name,
      subscriber_count,
      thumbnail_url,
      deals (
        deal_type,
        firms ( id, name )
      )
    `);

  // 2. Apply search filter if 'q' exists
  if (q) {
    query = query.ilike('channel_name', `%${q}%`);
  }

  const { data: channels, error } = await query;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Corporate YouTube Tracker
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Mapping M&A activity in the creator economy
            </p>
          </div>
          
          <SearchField />
        </header>

        {channels?.length === 0 ? (
          <div className="p-20 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">No channels found matching "{q}"</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {channels?.map((channel) => {
              const deal = channel.deals?.[0];
              const firmName = deal?.firms?.name || 'Independent';
              return (
                <div key={channel.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-5">
                   <div className="flex items-center gap-4 mb-4">
                    <img src={channel.thumbnail_url} className="w-12 h-12 rounded-full border" alt="" />
                    <div>
                      <h2 className="font-bold text-slate-900">{channel.channel_name}</h2>
                      <p className="text-sm text-slate-500">{Number(channel.subscriber_count).toLocaleString()} subs</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Owned By</span>
                    <Link href={`/firm/${deal?.firms?.id}`} className="block text-sm font-medium text-blue-600 hover:underline">
                      {firmName}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}