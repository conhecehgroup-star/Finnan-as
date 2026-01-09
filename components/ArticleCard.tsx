
import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const categoryStyles = {
    'Conceitos': 'from-purple-500/20 to-transparent text-purple-400 border-purple-500/30',
    'Estratégias': 'from-cyan-500/20 to-transparent text-cyan-400 border-cyan-500/30',
    'Ganhos': 'from-green-500/20 to-transparent text-green-400 border-green-500/30',
    'Curiosidades': 'from-amber-500/20 to-transparent text-amber-400 border-amber-500/30'
  };

  return (
    <div 
      onClick={() => onClick(article)}
      className="group relative bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-amber-400/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-xl"
    >
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/5 blur-[80px] group-hover:bg-amber-400/20 transition-all duration-700"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-125">
          {article.icon}
        </div>
        {article.hot && (
          <span className="bg-red-500/20 text-red-500 text-[10px] font-black px-2 py-0.5 rounded-full border border-red-500/30 animate-pulse">
            HOT
          </span>
        )}
      </div>

      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest mb-4 bg-gradient-to-r ${categoryStyles[article.category]}`}>
        {article.category}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors leading-tight">
        {article.title}
      </h3>
      
      <p className="text-slate-400 text-sm line-clamp-2 mb-6 group-hover:text-slate-300 transition-colors">
        {article.summary}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
          ⏱️ {article.readingTime}
        </span>
        <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center group-hover:bg-amber-400 group-hover:border-amber-400 transition-all duration-300">
          <span className="text-amber-400 group-hover:text-slate-950 text-sm">→</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
