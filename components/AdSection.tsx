
import React from 'react';

interface AdProps {
  type: 'banner' | 'card' | 'inline' | 'topbar';
  title: string;
  description?: string;
  cta: string;
  badge?: string;
}

const AdSection: React.FC<AdProps> = ({ type, title, description, cta, badge = "OFFER" }) => {
  if (type === 'topbar') {
    return (
      <div className="bg-gradient-to-r from-amber-600 to-amber-400 py-1.5 px-4 text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <p className="text-slate-950 text-[10px] font-black uppercase tracking-[0.3em] relative z-10">
          🔥 {title} — <span className="underline cursor-pointer">{cta}</span>
        </p>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="group relative bg-slate-900 border-2 border-amber-400/30 rounded-2xl p-6 overflow-hidden shadow-[0_0_30px_rgba(251,191,36,0.1)] hover:border-amber-400 transition-all duration-500">
        <div className="absolute top-0 right-0 px-3 py-1 bg-amber-400 text-slate-950 text-[8px] font-black uppercase tracking-widest rounded-bl-xl">
          {badge}
        </div>
        <div className="mb-4 text-2xl">⚡</div>
        <h3 className="text-white font-black text-lg mb-2 leading-tight uppercase italic">{title}</h3>
        <p className="text-slate-400 text-xs mb-6 leading-relaxed">{description}</p>
        <button className="w-full py-3 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white transition-colors">
          {cta}
        </button>
      </div>
    );
  }

  if (type === 'banner') {
    return (
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 blur-[100px] group-hover:bg-cyan-500/20 transition-all"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{badge}</span>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm max-w-xl">{description}</p>
          </div>
          <button className="px-10 py-4 bg-cyan-500 hover:bg-white text-slate-950 font-black rounded-2xl transition-all shadow-[0_10px_30px_rgba(34,211,238,0.3)] shrink-0">
            {cta}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AdSection;
