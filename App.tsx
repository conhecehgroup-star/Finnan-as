
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import ArticleCard from './components/ArticleCard';
import CompoundCalculator from './components/CompoundCalculator';
import FinanceCoach from './components/FinanceCoach';
import AdSection from './components/AdSection';
import GoogleAdSlot from './components/GoogleAdSlot';
import { ARTICLES } from './constants';
import { Article, Page, Category } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [blogFilter, setBlogFilter] = useState<Category | 'Todos'>('Todos');

  const filteredArticles = useMemo(() => {
    return blogFilter === 'Todos' 
      ? ARTICLES 
      : ARTICLES.filter(a => a.category === blogFilter);
  }, [blogFilter]);

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-amber-400/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* ADS HOME 1: Top Welcome Slot */}
          <GoogleAdSlot id="home_top_main" className="mb-12" />

          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
              <span>Inteligência Financeira de Elite</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
              A ARTE DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">DOMINAR O DINHEIRO.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
              Não seja escravo do sistema. Aprenda as estratégias que a elite usa para construir impérios digitais e viver de rendas passivas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => setCurrentPage('blog')}
                className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-amber-400 transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-95"
              >
                EXPLORAR ESTRATÉGIAS
              </button>
              <button 
                onClick={() => setCurrentPage('coach')}
                className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-black rounded-2xl border border-slate-800 hover:border-amber-400/50 transition-all"
              >
                CONVERSAR COM MENTOR
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm">
                <div className="text-3xl mb-4">💎</div>
                <h3 className="text-white font-bold text-lg mb-2">Mindset de Valor</h3>
                <p className="text-slate-500 text-sm">Pare de pensar em gastos, comece a pensar em ROI.</p>
             </div>
             <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-white font-bold text-lg mb-2">Escala Digital</h3>
                <p className="text-slate-500 text-sm">Use a internet para alavancar seus ganhos em 100x.</p>
             </div>
             <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-white font-bold text-lg mb-2">Poder Composto</h3>
                <p className="text-slate-500 text-sm">O tempo é a variável que cria bilionários.</p>
             </div>
          </div>

          {/* ADS HOME 2: Mid Content Slot */}
          <GoogleAdSlot id="home_mid_content" className="mt-20" />
        </div>
      </section>

      {/* Strategic Ad 2: Mid-Home Banner */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <AdSection 
          type="banner"
          title="MENTORIA 1-ON-1 COM ESPECIALISTAS"
          description="Acelere sua jornada com um plano personalizado de investimento e alocação de ativos feito por quem já chegou lá."
          cta="CANDIDATAR-SE"
          badge="LIMITED ACCESS"
         />
      </section>

      {/* Featured Articles Section */}
      <section className="py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-black text-white">DESTAQUES <span className="text-amber-400">DA SEMANA</span></h2>
              <button onClick={() => setCurrentPage('blog')} className="text-amber-400 font-bold text-sm hover:underline">VER TUDO →</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ARTICLES.slice(0, 4).map(article => (
                <ArticleCard key={article.id} article={article} onClick={setSelectedArticle} />
              ))}
           </div>
        </div>
      </section>
    </>
  );

  const renderBlog = () => {
    const isTodos = blogFilter === 'Todos';

    return (
      <section className="py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-6">EXPLORAR <span className="text-amber-400">CONHECIMENTO</span></h2>
            <div className="flex flex-wrap justify-center gap-2">
              {['Todos', 'Conceitos', 'Estratégias', 'Ganhos', 'Curiosidades'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setBlogFilter(cat as any)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    blogFilter === cat 
                      ? 'bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.4)]' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          {/* ADS EXPLORAR CATEGORIA: Slot 1 (Sempre no topo se não for Todos) */}
          {!isTodos && (
            <GoogleAdSlot id={`blog_category_${blogFilter.toLowerCase()}_top`} className="mb-10" />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <React.Fragment key={article.id}>
                <ArticleCard article={article} onClick={setSelectedArticle} />
                
                {/* ADS EXPLORAR TODOS: 3 anúncios distribuídos no feed */}
                {isTodos && (index === 1 || index === 4 || index === 7) && (
                  <div className="lg:col-span-1">
                    <GoogleAdSlot id={`blog_feed_slot_${index}`} type="rectangle" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ADS EXPLORAR CATEGORIA: Slot 2 (Sempre no rodapé se não for Todos) */}
          {!isTodos && (
            <GoogleAdSlot id={`blog_category_${blogFilter.toLowerCase()}_bottom`} className="mt-16" />
          )}

          {/* Caso especial: Adicional para fechar 3 no Explorar Geral quando em Todos */}
          {isTodos && (
            <div className="mt-20">
               <GoogleAdSlot id="blog_footer_general" />
            </div>
          )}
        </div>
      </section>
    );
  };

  const renderTools = () => (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ADS FERRAMENTAS 1: Header Ad */}
        <GoogleAdSlot id="tools_top_ad" className="mb-16" />

        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">FERRAMENTAS DE <span className="text-cyan-400">PROJEÇÃO</span></h2>
          <p className="text-slate-500">Visualize seu futuro financeiro com precisão matemática.</p>
        </div>
        
        <div className="bg-slate-900 p-1 rounded-3xl border border-slate-800 overflow-hidden mb-12">
           <CompoundCalculator />
        </div>

        {/* ADS FERRAMENTAS 2: Mid Result Ad */}
        <GoogleAdSlot id="tools_mid_result" className="my-16" />

        <div className="mt-12">
          <AdSection 
            type="banner"
            title="GOSTOU DA PROJEÇÃO? VAMOS TORNÁ-LA REAL."
            description="Abra sua conta na elite dos investimentos e receba assessoria exclusiva para atingir seus primeiros R$ 100k investidos."
            cta="ABRIR CONTA PARCEIRA"
            badge="EXPERT RECOMMENDATION"
          />
        </div>

        {/* ADS FERRAMENTAS 3: Footer Ad */}
        <GoogleAdSlot id="tools_footer_ad" className="mt-24" />
      </div>
    </section>
  );

  const renderCoach = () => (
    <section className="py-20 min-h-[calc(100vh-80px)] flex flex-col items-center">
      <div className="max-w-4xl w-full px-4">
        
        {/* ADS MENTOR IA 1: Above Interface Slot */}
        <GoogleAdSlot id="coach_header_ad" className="mb-10" />

        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white mb-2">MENTOR <span className="text-blue-500">DIGITAL IA</span></h2>
          <p className="text-slate-500">Sua consultoria privada de alta performance, 24/7.</p>
        </div>
        
        <FinanceCoach />
        
        {/* ADS MENTOR IA 2: Below Interface Slot */}
        <GoogleAdSlot id="coach_footer_ad" className="mt-12" />

        <p className="mt-6 text-center text-[10px] text-slate-600 uppercase tracking-widest">
          Patrocinado por <span className="text-amber-400 font-bold">InvestElite Securities</span>
        </p>
      </div>
    </section>
  );

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      <div className="animate-in fade-in duration-700">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'blog' && renderBlog()}
        {currentPage === 'tools' && renderTools()}
        {currentPage === 'coach' && renderCoach()}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-10 relative shadow-2xl">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition text-2xl"
            >
              ✕
            </button>
            <div className="text-6xl mb-8 filter grayscale hover:grayscale-0 transition-all cursor-default">
              {selectedArticle.icon}
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest mb-6">
              {selectedArticle.category}
            </div>
            <h2 className="text-4xl font-black text-white mb-8 tracking-tight leading-tight">
              {selectedArticle.title}
            </h2>
            <div className="prose prose-invert prose-amber max-w-none text-slate-400 leading-relaxed text-lg whitespace-pre-line">
              {selectedArticle.content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h4 key={i} className="text-white font-black text-xl mt-8 mb-4 uppercase tracking-tight">{line.replace(/\*\*/g, '')}</h4>;
                }
                if (line.trim().startsWith('-')) {
                  return <li key={i} className="ml-6 mb-2 list-disc text-slate-300">{line.replace('-', '').trim()}</li>;
                }
                return <p key={i} className="mb-4">{line}</p>;
              })}
              
              <div className="my-12">
                <AdSection 
                  type="card"
                  title="QUER MAIS CONTEÚDOS COMO ESTE?"
                  description="Assine nossa Newsletter VIP e receba relatórios de mercado fechados que só os grandes players têm acesso."
                  cta="ASSINAR NEWSLETTER"
                  badge="PREMIUM ACCESS"
                />
              </div>

              <div className="mt-12 p-8 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">🛡️</div>
                <h4 className="text-amber-400 font-bold mb-4 uppercase text-xs tracking-[0.2em]">💡 Diretrice de Alta Performance:</h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">◈</span>
                    <span className="italic">"A riqueza é o que você não vê. É o carro não comprado, o relógio ignorado e o investimento mantido."</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">◈</span>
                    <span>Considere como este conhecimento pode ser monetizado ou economizado na sua conta hoje.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-10 border-t border-slate-800 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Tempo de leitura estimado</span>
                <span className="text-white font-bold">{selectedArticle.readingTime}</span>
              </div>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="bg-amber-400 hover:bg-white text-slate-950 font-black px-10 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(251,191,36,0.2)]"
              >
                CONCLUIR LEITURA
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
