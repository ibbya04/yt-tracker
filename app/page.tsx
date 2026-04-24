import { supabase } from '@/lib/supabase';
import SearchField from '@/components/SearchField';
import SortDropdown from '@/components/SortDropdown';
import Link from 'next/link';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q, sort } = await searchParams;

  // 1. Build the base query
  let query = supabase
    .from('channels')
    .select(`
      id,
      channel_name,
      yt_channel_id,
      subscriber_count,
      total_views,
      thumbnail_url,
      deals (
        deal_type,
        firms ( 
          id,
          name 
        )
      )
    `);

  // 2. Apply search filter if 'q' exists
  if (q) {
    query = query.ilike('channel_name', `%${q}%`);
  }

  // 3. Apply Sorting
  // Map the URL shorthand to Supabase order commands
  switch (sort) {
    case 'views_desc':
      query = query.order('total_views', { ascending: false });
      break;
    case 'name_asc':
      query = query.order('channel_name', { ascending: true });
      break;
    case 'newest':
      // This sorts by the most recent deal date in the join
      query = query.order('acquisition_date', { referencedTable: 'deals', ascending: false });
      break;
    case 'subs_desc':
    default:
      query = query.order('subscriber_count', { ascending: false });
      break;
  }

  const { data: channels, error } = await query;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/*Title section*/}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Corporate YouTube Tracker
          </h1>
          <p className="text-slate-500 text-base mt-2 font-medium">
            Tracking private equity acquisitions in the creator economy.
          </p>
        </div>

        {/*Toolbar section*/}
        <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm mb-10">
          <div className="flex items-center gap-4">
            <SortDropdown />
          </div>

          <div className="w-full md:w-auto">
            <SearchField />
          </div>
        </div>

        {/* Channel Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {channels?.map((channel: any) => {
            // 1. Extract data once at the top for cleanliness
            const deal = channel.deals?.[0];
            const firm = deal?.firms; // Access the first item in the array
            const firmName = firm?.name || 'Independent';
            const firmId = firm?.id || '#';

            return (
              <div key={channel.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={channel.thumbnail_url}
                      className="w-12 h-12 rounded-full border border-slate-100 shadow-sm"
                      alt={channel.channel_name}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    <div className="overflow-hidden">
                      <a
                        href={`https://youtube.com/channel/${channel.youtube_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1"
                      >
                        <h2 className="font-bold text-slate-900 truncate group-hover:text-red-600 transition-colors">
                          {channel.channel_name}
                        </h2>
                        <span className="text-slate-300 group-hover:text-red-400 text-xs">↗</span>
                      </a>

                      <p className="text-xs font-mono text-slate-500">
                        {Number(channel.subscriber_count).toLocaleString()} Subs
                      </p>
                    </div>
                  </div>

                  {/*Grid for channel statistics*/}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Subscribers</p>
                      <p className="text-sm font-semibold text-slate-800">
                        {Number(channel.subscriber_count || 0).toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Total Views</p>
                      <p className="text-sm font-semibold text-slate-800">
                        {Number(channel.total_views || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Deal Type Badge */}
                  {deal?.deal_type && (
                    <div className="mb-4">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {deal.deal_type}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Backed By</p>
                  <Link
                    href={`/firm/${firmId}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {firmName}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}