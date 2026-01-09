
import React from 'react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  const handleShare = async () => {
    const shareData = {
      title: 'Finnanças - Inteligência Financeira de Elite',
      text: 'Confira as melhores estratégias e ferramentas para dominar o seu dinheiro na Finnanças!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Compartilhamento cancelado ou falhou');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      } catch (err) {
        alert('Não foi possível copiar o link.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center space-x-2 cursor-pointer group" 
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.4)] group-hover:scale-110 transition">
                <span className="text-xl font-bold text-slate-900">F</span>
              </div>
              <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">
                FINN<span className="text-amber-400">ANÇAS</span>
              </h1>
            </div>
            
            <nav className="hidden md:flex space-x-10 text-sm font-bold uppercase tracking-widest text-slate-400">
              {[
                { id: 'home', label: 'Início' },
                { id: 'blog', label: 'Explorar' },
                { id: 'tools', label: 'Ferramentas' },
                { id: 'coach', label: 'Mentor IA' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as Page)}
                  className={`hover:text-amber-400 transition-colors relative py-2 ${
                    currentPage === item.id ? 'text-amber-400 border-b-2 border-amber-400' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button 
              onClick={handleShare}
              className="flex items-center space-x-2 bg-slate-900 border border-slate-700 text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 hover:border-amber-400/50 transition-all active:scale-95 shadow-lg group"
            >
              <span className="group-hover:rotate-12 transition-transform">🔗</span>
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
                   <span className="text-slate-900 font-bold">F</span>
                </div>
                <h3 className="text-white font-black text-lg uppercase italic tracking-tighter">FINN<span className="text-amber-400">ANÇAS</span></h3>
              </div>
              <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
                A plataforma definitiva para quem busca o próximo nível de liberdade. Estratégias de elite para mentes ambiciosas.
              </p>
              <button 
                onClick={handleShare}
                className="mt-6 text-amber-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>COMPARTILHAR ESTE PORTAL</span>
                <span className="text-xs">→</span>
              </button>
            </div>
            <div>
              <h4 className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-6">Navegação</h4>
              <ul className="text-sm space-y-4 text-slate-400">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition">Home</button></li>
                <li><button onClick={() => setCurrentPage('blog')} className="hover:text-white transition">Artigos</button></li>
                <li><button onClick={() => setCurrentPage('tools')} className="hover:text-white transition">Simuladores</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-6">Legal</h4>
              <ul className="text-sm space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[10px] uppercase tracking-tighter">
            <p>© {new Date().getFullYear()} FINNANCAS GROUP. ALL RIGHTS RESERVED.</p>
            <p className="mt-4 md:mt-0">ESTRATÉGIA • RIQUEZA • LIBERDADE</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
