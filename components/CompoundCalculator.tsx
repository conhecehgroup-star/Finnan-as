
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalculationResult } from '../types';

const CompoundCalculator: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualRate, setAnnualRate] = useState<number>(12);
  const [years, setYears] = useState<number>(20);

  const results = useMemo(() => {
    const data: CalculationResult[] = [];
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = years * 12;
    
    let currentTotal = initialAmount;
    let totalContributions = initialAmount;

    for (let i = 0; i <= totalMonths; i++) {
      if (i > 0) {
        const interest = currentTotal * monthlyRate;
        currentTotal += interest + monthlyContribution;
        totalContributions += monthlyContribution;
      }

      if (i % 12 === 0 || i === totalMonths) {
        data.push({
          month: i / 12,
          total: Math.round(currentTotal),
          contributions: Math.round(totalContributions),
          interest: Math.round(currentTotal - totalContributions)
        });
      }
    }
    return data;
  }, [initialAmount, monthlyContribution, annualRate, years]);

  const lastResult = results[results.length - 1];

  return (
    <div className="bg-slate-950 rounded-3xl p-8 lg:p-12 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-8">
          <div className="flex items-center space-x-3 mb-4">
             <div className="w-2 h-8 bg-cyan-400 rounded-full"></div>
             <h3 className="text-xl font-black uppercase tracking-widest">Parâmetros</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Capital Inicial</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                <input 
                  type="number" 
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-4 focus:ring-1 focus:ring-cyan-400 outline-none text-lg font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Aporte Mensal</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                <input 
                  type="number" 
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-4 focus:ring-1 focus:ring-cyan-400 outline-none text-lg font-bold"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Taxa (%)</label>
                  <input 
                    type="number" 
                    value={annualRate}
                    onChange={(e) => setAnnualRate(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 focus:ring-1 focus:ring-cyan-400 outline-none text-lg font-bold"
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Anos</label>
                  <input 
                    type="number" 
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 focus:ring-1 focus:ring-cyan-400 outline-none text-lg font-bold"
                  />
               </div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-3xl">
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.2em] mb-2">Estimativa Final</p>
            <p className="text-4xl font-black text-white mb-4">
              R$ {lastResult.total.toLocaleString('pt-BR')}
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Investido:</span>
                <span className="text-white font-bold">R$ {lastResult.contributions.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span>Total em Juros:</span>
                <span className="text-cyan-400 font-bold">R$ {lastResult.interest.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 h-[500px] flex flex-col">
          <div className="flex justify-end mb-6 space-x-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
             <div className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span> Projeção de Crescimento</div>
          </div>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `R$${val/1000}k`} />
                <Tooltip 
                  cursor={{ stroke: '#22d3ee', strokeWidth: 1 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#22d3ee" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundCalculator;
