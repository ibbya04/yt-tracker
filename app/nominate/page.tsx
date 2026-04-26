export default function Nominate() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-16">
        
        {/* Centered Header */}
        <header className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Nominate a Channel
          </h2>
          <p className="text-slate-500 mt-2 text-lg">
            Know of a corporate acquisition or investment we missed? 
            Let us know so we can keep the database accurate.
          </p>
        </header>

        {/* Centered Form */}
        <div className="max-w-xl mx-auto">
          <form className="space-y-6 bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                YouTube Channel Link
              </label>
              <input 
                type="text" 
                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="https://youtube.com/@..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Evidence of Investment / Acquisition
              </label>
              <input 
                type="text" 
                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Link to press release or article"
              />
              <p className="text-[11px] text-slate-400 mt-2 italic">
                Please provide a public source (news, filing, or official announcement).
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Additional Context (Optional)
              </label>
              <textarea 
                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-24"
                placeholder="e.g. Estimated date, deal type, or specific firm involved..."
              />
            </div>

            <button 
              type="button" 
              className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm"
            >
              Submit Nomination
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}