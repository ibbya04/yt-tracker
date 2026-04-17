import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function FirmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch the firm AND all its related channels via the deals table
  const { data: firm, error } = await supabase
    .from('firms')
    .select(`
      *,
      deals (
        deal_type,
        acquisition_date,
        source_url,
        channels (*)
      )
    `)
    .eq('id', id)
    .single(); // We only expect one firm

  if (error || !firm) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 mb-8 inline-block">
          ← Back to all channels
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900">{firm.name}</h1>
          <div className="flex gap-4 mt-4">
            {firm.hq_location && (
              <span className="text-sm bg-slate-200 px-2 py-1 rounded text-slate-700">📍 {firm.hq_location}</span>
            )}
            {firm.website_url && (
              <a href={firm.website_url} target="_blank" className="text-sm text-blue-600 hover:underline">
                Official Website ↗
              </a>
            )}
          </div>
        </header>

        <h2 className="text-xl font-semibold mb-6 text-slate-800">Portfolio Channels ({firm.deals.length})</h2>
        
        <div className="grid gap-4">
          {firm.deals.map((deal: any) => (
            <div key={deal.channels.id} className="bg-white p-6 rounded-lg border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={deal.channels.thumbnail_url} className="w-12 h-12 rounded-full" alt="" />
                <div>
                  <h3 className="font-bold text-slate-900">{deal.channels.channel_name}</h3>
                  <p className="text-sm text-slate-500">{deal.deal_type} • Acquired {deal.acquisition_date}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-mono text-slate-600">
                   {Number(deal.channels.subscriber_count).toLocaleString()} Subs
                </p>
                <a 
                  href={deal.source_url} 
                  target="_blank" 
                  className="text-xs text-blue-500 hover:underline mt-1 block"
                >
                  View Evidence ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}