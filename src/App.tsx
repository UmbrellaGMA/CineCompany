import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ArrowRight,
  CreditCard,
  Menu,
  X,
  PlayCircle
} from 'lucide-react';
import { SEO } from './components/SEO';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// Lazy YouTube Facade - loads thumbnail first, iframe on click
const LazyYouTube = ({ videoId, title, priority = false }: { videoId: string; title: string; priority?: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const handleClick = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full h-full relative group cursor-pointer bg-black"
      aria-label={`Reproduzir vídeo: ${title}`}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#00bbff]/90 rounded-full flex items-center justify-center group-hover:bg-[#00bbff] group-hover:scale-110 transition-all shadow-2xl shadow-[#00bbff]/30">
          <PlayCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>
      </div>
    </button>
  );
};

const CineLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  if (size === 'lg') {
    return (
      <img 
        src="/images/logo grande vertical.webp" 
        alt="Cine Company - Revenda Oficial IPTV" 
        className="w-56 md:w-72 lg:w-[300px] h-auto drop-shadow-2xl"
        decoding="async"
      />
    );
  }
  
  return (
    <img 
      src="/images/logo horizontal.webp" 
      alt="Cine Company" 
      className={size === 'sm' ? 'h-10 w-auto' : 'h-12 w-auto'}
      decoding="async"
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Quem somos', href: '#como-funciona' },
    { name: 'Planos', href: '#planos' },
    { name: 'Criar Painel', href: 'https://painelcinecompany.online/#/rs/4vLbAXg1gG/ayb1BQxWPR' },
    { name: 'Parcerias', href: '#parceiros' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass border-b border-white/5' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CineLogo size="sm" />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Trigger */}
        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass py-6 px-6 flex flex-col gap-4 lg:hidden border-b border-white/10"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-bold uppercase tracking-tight"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PricingCard = ({ credits, price, href = "https://painelcinecompany.online/#/rs/4vLbAXg1gG/ayb1BQxWPR" }: { credits: string, price: string, href?: string }) => (
  <motion.a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05, borderColor: 'rgba(0,187,255,0.6)' }}
    className="block relative p-5 md:p-6 rounded-2xl glass border border-[#00bbff]/20 hover:shadow-[0_0_30px_-8px_rgba(0,187,255,0.25)] transition-all cursor-pointer text-center"
  >
    <p className="text-[#00bbff] font-black text-xs md:text-sm uppercase tracking-widest mb-2">{credits} CRÉDITOS</p>
    <p className="text-white font-black text-2xl md:text-3xl tracking-tight">R${price}</p>
  </motion.a>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass rounded-2xl overflow-hidden mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-bold">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="p-6 pt-0 text-white/60 text-sm leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showMensalistaModal, setShowMensalistaModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [loadMonitoring, setLoadMonitoring] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    
    // Defer loading of non-critical analytics to free up the main thread (TBT optimization)
    const timer = setTimeout(() => {
      setLoadMonitoring(true);
    }, 2000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail) {
      setIsSubscribed(true);
      // In a real app, send to API
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cine Company",
    "url": "https://revendacinecompany.com/",
    "logo": "https://revendacinecompany.com/logo.png",
    "description": "Líder em revenda de IPTV oficial com painel de alta performance e suporte 24h.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-99999-9999",
      "contactType": "customer service"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Como começar a revender IPTV?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basta realizar o cadastro através do nosso link oficial, adquirir seus primeiros créditos e você já terá acesso ao painel para criar testes e ativar clientes."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto dá para ganhar revendendo IPTV?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Os ganhos dependem da sua carteira de clientes. Com margens de lucro superiores a 100%, muitos revendedores faturam de R$ 2.000 a R$ 10.000 mensais."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh selection:bg-brand-primary selection:text-white">
      <SEO 
        title="Como Vender IPTV: Guia Completo para Revendedores 2026 | Cine Company"
        description="Aprenda como começar sua revenda de IPTV oficial. Painel profissional, suporte 24h e a melhor lista do mercado. Comece a ganhar dinheiro hoje!"
        keywords="como vender iptv, como revender iptv, revenda iptv, painel iptv, ganhar dinheiro com iptv, melhor painel para iptv, iptv reseller brasil"
        schema={[schema, faqSchema]}
      />
      
      <Navbar />

      {/* Hero Section - Optimized for Full HD 1920x1080 & Mobile Scroll */}
      <section className="relative min-h-0 lg:h-[1080px] lg:max-h-[1080px] flex items-center overflow-hidden py-16 lg:py-0">
        {/* Background with movie posters */}
        <img 
          src="/images/hero-bg.webp" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover object-[center_right] z-0 select-none pointer-events-none"
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
        {/* Dark overlay gradient */}
        {/* Dark overlay - radial on mobile, linear on desktop */}
        <div className="absolute inset-0 z-[1] lg:hidden" style={{
          background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.95) 60%, rgba(5,5,5,0.6) 100%)',
        }} />
        <div className="absolute inset-0 z-[1] hidden lg:block" style={{
          background: 'linear-gradient(to right, #050505 0%, #050505 40%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.4) 100%)',
        }} />
        {/* Top gradient for navbar blend */}
        <div className="absolute top-0 left-0 right-0 h-32 z-[2]" style={{
          background: 'linear-gradient(to bottom, #050505 0%, transparent 100%)',
        }} />
        {/* Subtle cyan/teal glow */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00bbff]/5 blur-[120px] z-[1] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-8 items-center pt-16 pb-4 lg:pt-20 lg:pb-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#00bbff] font-black uppercase tracking-[0.15em] text-xs md:text-sm mb-4"
            >
              Seja revendedor do melhor painel de IPTV do Brasil
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-xl md:text-3xl lg:text-[2.2rem] font-display font-black leading-[1.15] tracking-tight mb-6 uppercase"
            >
              TENHA ACESSO AO{' '}
              <span className="text-[#00bbff]">PAINEL DE REVENDA, ESTABILIDADE MÁXIMA, SUPORTE RÁPIDO</span>
              {' '}E MAIS DE{' '}
              <span className="text-[#00bbff]">85 MIL CONTEÚDOS PARA VENDER</span>
              {' '}— CANAIS, FILMES, SÉRIES, ESPORTES,{' '}
              <span className="text-[#00bbff]">TUDO EM HD, FULL HD E 4K.</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-8"
            >
              <a 
                href="https://painelcinecompany.online/#/rs/4vLbAXg1gG/ayb1BQxWPR"
                className="group inline-flex items-center gap-3 px-7 py-3.5 md:px-9 md:py-4 bg-[#00bbff] text-white rounded-full font-black uppercase tracking-tight text-sm hover:bg-[#00d4ff] transition-all transform hover:scale-105 shadow-xl shadow-[#00bbff]/25 border border-[#00d4ff]/30"
              >
                QUERO SER UM REVENDEDOR OFICIAL
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right (desktop) / Top (mobile) - Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="flex items-center justify-center lg:justify-center"
          >
            <div className="relative">
              {/* Glow behind logo */}
              <div className="absolute inset-0 bg-[#00bbff]/10 blur-[80px] rounded-full scale-75" />
              {/* Small logo on mobile, large on desktop */}
              <img 
                src="/images/logo grande vertical.webp" 
                alt="Cine Company - Revenda Oficial IPTV" 
                className="w-28 md:w-48 lg:w-[300px] h-auto drop-shadow-2xl"
                fetchpriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Revenda Section */}
      <section id="como-funciona" className="pt-10 pb-20 md:py-32 px-6 bg-white/2 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00bbff]/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-[#00bbff] font-black uppercase tracking-[0.3em] text-xs mb-4 block">Aprenda com a gente</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">VOCÊ SABE O QUE É <span className="text-[#00bbff]">IPTV?</span></h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm">Entenda o mercado de IPTV e como ele funciona no Brasil, depois escolha seu plano de créditos.</p>
          </div>

          {/* Video Player */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 mb-16">
            <div className="aspect-video w-full">
              <LazyYouTube videoId="6PBbELRhg0A" title="Você sabe o que é IPTV?" priority={true} />
            </div>
          </div>

          <div id="planos" className="text-center mb-10 pt-10">
            <span className="text-[#00bbff] font-black uppercase tracking-[0.3em] text-xs mb-4 block">Investimento Inteligente</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">PLANOS DE <span className="text-[#00bbff]">REVENDA</span></h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm italic">Cada crédito equivale a 1 mês de acesso. Sem taxas ocultas.</p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-12">
            <PricingCard credits="10" price="60,00" />
            <PricingCard credits="40" price="200,00" />
            <PricingCard credits="70" price="280,00" />
            <PricingCard credits="100" price="300,00" />
            <PricingCard credits="500" price="1250,00" />
            <PricingCard credits="1K" price="2000,00" />
          </div>

          {/* QUERO REVENDER CTA */}
          <div className="text-center">
            <a
              href="https://painelcinecompany.online/#/rs/4vLbAXg1gG/ayb1BQxWPR"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#00bbff] text-white rounded-full font-black uppercase tracking-tight text-base hover:bg-[#00d4ff] transition-all transform hover:scale-105 shadow-xl shadow-[#00bbff]/25 border border-[#00d4ff]/30"
            >
              QUERO REVENDER
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Mensalista Section */}
      <section id="planos-mensalista" className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#00bbff] font-black uppercase tracking-[0.3em] text-xs mb-4 block">Assinatura Mensal</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">QUER SER <span className="text-[#00bbff]">MENSALISTA?</span></h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm">Aprenda a comprar créditos e começar sua revenda com planos mensais exclusivos.</p>
          </div>

          {/* Video Player */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 mb-16">
            <div className="aspect-video w-full">
              <LazyYouTube videoId="ddC1gLkAwwI" title="Como virar um mensalista" />
            </div>
          </div>

          <div className="text-center mb-10 pt-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tighter">PLANOS <span className="text-[#00bbff]">MENSALISTAS</span></h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm italic">Pagamento fixo mensal. Sem taxas ocultas.</p>
          </div>

          {/* Mensalista Pricing Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-12">
            <PricingCard credits="50" price="120,00" href="https://www.contate.me/revendamensalistacc" />
            <PricingCard credits="70" price="150,00" href="https://www.contate.me/revendamensalistacc" />
            <PricingCard credits="100" price="180,00" href="https://www.contate.me/revendamensalistacc" />
            <PricingCard credits="200" price="230,00" href="https://www.contate.me/revendamensalistacc" />
            <PricingCard credits="300" price="330,00" href="https://www.contate.me/revendamensalistacc" />
            <PricingCard credits="500" price="450,00" href="https://www.contate.me/revendamensalistacc" />
            <PricingCard credits="1K" price="680,00" href="https://www.contate.me/revendamensalistacc" />
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowMensalistaModal(true)}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#00bbff] text-white rounded-full font-black uppercase tracking-tight text-base hover:bg-[#00d4ff] transition-all transform hover:scale-105 shadow-xl shadow-[#00bbff]/25 border border-[#00d4ff]/30"
            >
              QUERO SER MENSALISTA
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Mensalista Modal */}
      <AnimatePresence>
        {showMensalistaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            onClick={() => setShowMensalistaModal(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#00bbff]/10 blur-[80px] rounded-full pointer-events-none" />
              
              {/* Close */}
              <button
                onClick={() => setShowMensalistaModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-[#00bbff]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-[#00bbff]" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">
                  Plano <span className="text-[#00bbff]">Mensalista</span>
                </h3>
                <p className="text-white/50 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                  Adquira créditos como mensalista e tenha acesso a preços exclusivos, suporte prioritário e muito mais vantagens.
                </p>

                <a
                  href="https://www.contate.me/revendamensalistacc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 w-full px-8 py-5 bg-[#00bbff] text-white rounded-2xl font-black uppercase tracking-tight text-base hover:bg-[#00d4ff] transition-all transform hover:scale-[1.02] shadow-xl shadow-[#00bbff]/25 border border-[#00d4ff]/30"
                >
                  COMPRAR CRÉDITOS COMO MENSALISTA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <p className="text-white/20 text-[10px] uppercase tracking-widest mt-6 font-bold">Pagamento seguro • Ativação imediata</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Partners Section */}
      <section id="parceiros" className="py-20 md:py-28 px-6 lazy-section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00bbff] font-black uppercase tracking-[0.3em] text-xs mb-4 block">Nossos Parceiros</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">PARCEIROS <span className="text-[#00bbff]">OFICIAIS</span></h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm">Empresas que confiam e trabalham junto com a Cine Company.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
            <motion.div whileHover={{ scale: 1.08 }} className="transition-all">
              <img src="/images/lazer png 1.webp" alt="Lazer Play" className="h-20 md:h-28 object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.08 }} className="transition-all">
              <img src="/images/assist+.webp" alt="Assist+" className="h-20 md:h-28 object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.08 }} className="transition-all">
              <img src="/images/xcloud.webp" alt="XCloud" className="h-20 md:h-28 object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy" decoding="async" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 px-6 lazy-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00bbff] font-black uppercase tracking-[0.3em] text-xs mb-4 block">Dúvidas Frequentes</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">PERGUNTAS <span className="text-[#00bbff]">FREQUENTES</span></h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm">Tire suas dúvidas antes de começar sua revenda.</p>
          </div>
          
          <div className="space-y-4">
            <FAQItem 
              question="O que é necessário para se tornar um revendedor IPTV?" 
              answer="Para se tornar um revendedor IPTV da Cine Company, você precisa apenas de um dispositivo com acesso à internet e vontade de empreender. Não é necessário ter experiência prévia, CNPJ ou investimento alto. Basta adquirir seus primeiros créditos e começar a vender." 
            />
            <FAQItem 
              question="Como funciona o sistema de revenda?" 
              answer="O sistema funciona através de créditos. Você compra os créditos no painel de revenda e utiliza para ativar assinaturas para seus clientes. Cada crédito equivale a 1 mês de acesso. Você define o preço de venda e fica com 100% do lucro da diferença." 
            />
            <FAQItem 
              question="Existe valor mínimo para começar a revender?" 
              answer="Sim, o plano inicial começa com 10 créditos por R$60,00. É um investimento baixo que permite testar o mercado e começar a construir sua base de clientes com risco mínimo." 
            />
            <FAQItem 
              question="Os créditos de revenda expiram?" 
              answer="Não! Os créditos da Cine Company são pré-pagos e não possuem validade. Você pode utilizá-los quando quiser, sem pressa. Compre no seu ritmo e ative seus clientes conforme for vendendo." 
            />
            <FAQItem 
              question="A plataforma oferece suporte para o revendedor?" 
              answer="Sim! Oferecemos suporte completo via WhatsApp para todos os revendedores. Nossa equipe está disponível para ajudar com dúvidas técnicas, configurações e estratégias de vendas. Além disso, disponibilizamos vídeo-aulas e materiais de divulgação." 
            />
          </div>
        </div>
      </section>

      {/* Optimized Footer */}
      <footer className="py-20 px-6 bg-black relative lazy-section">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 border-b border-white/5 pb-12">
          <div className="flex flex-col items-start gap-6">
            <CineLogo size="sm" />
            <p className="text-white/20 text-xs leading-relaxed max-w-xs uppercase tracking-tight">
              A melhor e mais estável estrutura de revenda IPTV do Brasil. Oferecendo alta performance e retorno garantido desde 2018.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h4 className="font-black uppercase tracking-widest text-[#00bbff] text-[10px] mb-6">Navegação</h4>
              <ul className="space-y-3 text-xs text-white/40 font-bold uppercase tracking-tighter">
                <li><a href="#" className="hover:text-[#00bbff] transition-colors">Home</a></li>
                <li><a href="#planos" className="hover:text-[#00bbff] transition-colors">Planos</a></li>
                <li><a href="#parceiros" className="hover:text-[#00bbff] transition-colors">Parceiros</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-[#00bbff] text-[10px] mb-6">Recursos</h4>
              <ul className="space-y-3 text-xs text-white/40 font-bold uppercase tracking-tighter">
                <li><a href="#faq" className="hover:text-[#00bbff] transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div className="col-span-2">
              <h4 className="font-black uppercase tracking-widest text-[#00bbff] text-[10px] mb-6">Desenvolvedor</h4>
              <a href="https://wa.me/5513997341034" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity p-4 glass rounded-xl border border-[#00bbff]/10">
                <span className="text-xs text-white/40 font-bold uppercase tracking-tighter">Criado por</span>
                <span className="text-[#00bbff] font-black uppercase text-sm">Gustavo Melo</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/10 text-[9px] uppercase tracking-[0.4em]">
            &copy; 2026 Cine Company Brasil. Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-[9px] text-white/40 uppercase tracking-widest font-black">
            <span onClick={() => setShowPrivacyModal(true)} className="hover:text-[#00bbff] cursor-pointer transition-colors">Políticas de Privacidade</span>
            <span onClick={() => setShowTermsModal(true)} className="hover:text-[#00bbff] cursor-pointer transition-colors">Termos de Revendedor</span>
            <span className="flex items-center gap-1 text-green-500"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Servidores Online</span>
          </div>
        </div>
      </footer>

      {/* Terms Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            onClick={() => setShowTermsModal(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowTermsModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-black text-[#00bbff] uppercase tracking-tighter mb-6">Termos de Revendedor</h2>
              <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                <p><strong>1. Aceitação dos Termos:</strong> Ao adquirir créditos na Cine Company, você concorda com nossos termos de prestação de serviço e licenciamento.</p>
                <p><strong>2. Sistema Pré-pago:</strong> O serviço funciona exclusivamente no modelo pré-pago. Os créditos adquiridos não expiram e não são passíveis de reembolso após a utilização das ativações.</p>
                <p><strong>3. Responsabilidade do Revendedor:</strong> O revendedor é inteiramente responsável pelo suporte em primeiro nível aos seus clientes, assim como pelas transações financeiras entre o revendedor e seu cliente final.</p>
                <p><strong>4. Estabilidade do Serviço:</strong> A Cine Company se compromete a fornecer a melhor infraestrutura do mercado, no entanto, instabilidades ocasionais na rede do cliente final ou rotas de internet locais não são de nossa responsabilidade.</p>
                <p><strong>5. Suspensão de Conta:</strong> O uso de práticas abusivas, revenda de painéis sem autorização expressa, ou atividades que prejudiquem a marca Cine Company poderão resultar no banimento da conta do revendedor e perda de créditos.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            onClick={() => setShowPrivacyModal(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-black text-[#00bbff] uppercase tracking-tighter mb-6">Políticas de Privacidade</h2>
              <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                <p><strong>1. Coleta de Dados:</strong> Coletamos apenas informações estritamente necessárias para criação do cadastro e gestão do painel financeiro e de acessos.</p>
                <p><strong>2. Uso das Informações:</strong> Seus dados são utilizados exclusivamente para suporte técnico, comunicados de sistema e faturamento. Nós não vendemos ou compartilhamos seus dados com terceiros ou empresas de marketing externo.</p>
                <p><strong>3. Segurança:</strong> Nossa infraestrutura utiliza criptografia avançada e as mais recentes tecnologias de proteção de banco de dados para garantir o sigilo completo dos seus dados e dos seus clientes.</p>
                <p><strong>4. Exclusão de Dados:</strong> O revendedor tem o direito de solicitar a exclusão total de sua conta e informações a qualquer momento através do nosso suporte oficial, encerrando permanentemente sua operação.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEO Optimization & Breadcrumbs (Hidden visually, present for crawlers) */}
      <div className="hidden" aria-hidden="true">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="#planos">Planos IPTV</a></li>
          </ol>
        </nav>
        <article>
          <h1>Como vender IPTV</h1>
          <h2>Como revender IPTV</h2>
          <h3>Revenda IPTV</h3>
          <p>Descubra as melhores estratégias de IPTV para revendedores. Saiba como ganhar dinheiro com IPTV utilizando o melhor painel IPTV do mercado.</p>
          <p>Oferecemos um sistema de IPTV reseller completo, sendo a solução ideal de IPTV para negócios. Aprenda o passo a passo de como montar negócio IPTV de forma lucrativa e escalável.</p>
        </article>
      </div>
      {loadMonitoring && (
        <>
          <SpeedInsights />
          <Analytics />
        </>
      )}
    </div>
  );
}
