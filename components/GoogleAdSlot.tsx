
import React from 'react';

interface GoogleAdSlotProps {
  id: string;
  className?: string;
  type?: 'horizontal' | 'rectangle' | 'fluid';
}

const GoogleAdSlot: React.FC<GoogleAdSlotProps> = ({ id, className = "", type = 'horizontal' }) => {
  const minHeight = type === 'rectangle' ? '250px' : '90px';

  return (
    <div className={`w-full flex flex-col items-center my-6 ${className}`}>
      <span className="text-[9px] text-slate-700 font-bold uppercase tracking-[0.2em] mb-1.5">Publicidade</span>
      <div 
        className="w-full bg-slate-900/40 border border-slate-800/50 border-dashed rounded-xl flex items-center justify-center overflow-hidden transition-colors hover:bg-slate-900/60"
        style={{ minHeight }}
      >
        {/* 
          Para produção, cole o código do AdSense aqui:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot={id}
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        */}
        <div className="flex flex-col items-center text-center opacity-30 select-none">
          <div className="text-2xl mb-1">🏦</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Google Ad Slot</div>
          <div className="text-[8px] text-slate-600 mt-1">ID: {id}</div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAdSlot;
