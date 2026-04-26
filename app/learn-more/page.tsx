export default function LearnMore() {
    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-8 py-16">
                {/* Header */}
                <header className="mb-12 border-b border-slate-100 pb-8">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Why This Is Important and The PE Playbook 
                    </h2>
                    <p className="text-slate-500 mt-2 text-lg">
                        An insight into the $4 billion shift from "Creators" to "Corporate Assets."
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-10">

                        <section>
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">The "Rollup" Strategy</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Private Equity firms often use a strategy called a <strong>Rollup</strong>. They buy multiple similar channels (e.g., in the Science or Finance niche) for 3–5x their annual earnings and put them under one "roof."
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                By centralizing legal, thumbnail testing, and brand deal negotiations, they create a "content factory" that can eventually be sold for 12–20x earnings—a process known as <strong>Multiple Arbitrage</strong>.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">Solving the "Keyman Risk"</h3>
                            <p className="text-slate-600 leading-relaxed">
                                The biggest risk for an investor is a channel depending entirely on one person. To mitigate this, firms often:
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600">
                                <li><strong>Introduce New Hosts:</strong> Slowly transitioning the audience to fresh faces so the brand survives if the creator leaves.</li>
                                <li><strong>AI-Assisted Scripting:</strong> Streamlining production to ensure content remains "brand-friendly" and consistent.</li>
                                <li><strong>Data-Driven Content:</strong> Prioritizing topics that are proven to perform over the creator's personal interests.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">The Trust Economy</h3>
                            <p className="text-slate-600 leading-relaxed italic border-l-4 border-slate-200 pl-4">
                                "Advertisers aren't just paying for impressions; they are paying for that trust."
                            </p>
                            <p className="text-slate-600 leading-relaxed mt-4">
                                This tracker exists because trust is being monetized. Unlike traditional media, creators are currently under no legal obligation to tell their audience when a channel quietly changes hands to a firm like Blackstone or KKR.
                            </p>
                        </section>
                    </div>

                    {/* Sidebar: Definitions */}
                    <aside className="space-y-8">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h4 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-widest">Deal Categories</h4>
                            <div className="space-y-6">
                                <div>
                                    <h5 className="text-sm font-bold text-slate-800">Full Acquisition (100%)</h5>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Complete transfer of ownership. The original founders often depart within a few years (e.g., Donut Media & Recurrent Ventures).
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-slate-800">Majority Investment (50-80%)</h5>
                                    <p className="text-xs text-slate-500 mt-1">
                                        The creator remains a shareholder and host, but the firm takes over operations (e.g., Veritasium & Electrify).
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-slate-800">Back-Catalog Licensing</h5>
                                    <p className="text-xs text-slate-500 mt-1">
                                        The creator sells the rights to the existing videos for a lump sum. The firm can then expand these old videos to new languages, whilst profiting off the existing videos revenue.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h4 className="font-bold text-blue-900 mb-3 text-[10px] uppercase tracking-widest">
                                Major Players
                            </h4>
                            <ul className="text-xs text-blue-700 space-y-4 font-medium">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 text-blue-400">●</span>
                                    <div>
                                        <a
                                            href="https://www.electrify.video/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-bold hover:underline underline-offset-2 flex items-center gap-1"
                                        >
                                            Electrify Video Partners ↗
                                        </a>
                                        <p className="text-[11px] text-blue-600/80 mt-0.5"></p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-2">
                                    <span className="mt-1 text-blue-400">●</span>
                                    <div>
                                        <a
                                            href="https://lunar-x.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-bold hover:underline underline-offset-2 flex items-center gap-1"
                                        >
                                            Lunar X ↗
                                        </a>
                                        <p className="text-[11px] text-blue-600/80 mt-0.5"></p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-2">
                                    <span className="mt-1 text-blue-400">●</span>
                                    <div>
                                        <a
                                            href="https://candlemedia.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-bold hover:underline underline-offset-2 flex items-center gap-1"
                                        >
                                            Candle Media ↗
                                        </a>
                                        <p className="text-[11px] text-blue-600/80 mt-0.5"></p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-2">
                                    <span className="mt-1 text-blue-400">●</span>
                                    <div>
                                        <a
                                            href="https://recurrent.io/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-bold hover:underline underline-offset-2 flex items-center gap-1"
                                        >
                                            Recurrent Ventures ↗
                                        </a>
                                        <p className="text-[11px] text-blue-600/80 mt-0.5"></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}