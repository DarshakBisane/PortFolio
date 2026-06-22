import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import StartScreen from './components/StartScreen';
import ParallaxBackground from './components/ParallaxBackground';
import InteractiveItems from './components/InteractiveItems';
import DiscoveryModal from './components/DiscoveryModal';
import { Trophy, Compass, RotateCcw, AlertTriangle } from 'lucide-react';

export default function App() {
  const [matchStarted, setMatchStarted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [discoveredItems, setDiscoveredItems] = useState<string[]>([]);
  const [showVictory, setShowVictory] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll when match starts
  useEffect(() => {
    if (!matchStarted) return;

    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Scroll progress handler
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
    };

    // RAF loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [matchStarted]);

  // Lock body scroll when match is not started or modal is open
  useEffect(() => {
    if (!matchStarted || activeModalId) {
      document.body.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisRef.current) lenisRef.current.start();
    }
  }, [matchStarted, activeModalId]);

  // Handle discovering an item
  const handleItemClick = (itemId: string) => {
    setActiveModalId(itemId);
    if (!discoveredItems.includes(itemId)) {
      const updated = [...discoveredItems, itemId];
      setDiscoveredItems(updated);
      
      // Trigger victory screen if all 8 items are found
      if (updated.length === 8) {
        setTimeout(() => {
          setShowVictory(true);
        }, 500);
      }
    }
  };

  // Quick navigation to scene scroll position
  const scrollToItem = (itemId: string) => {
    if (!lenisRef.current) return;

    let targetScroll = 0;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    switch (itemId) {
      case 'jersey': targetScroll = scrollHeight * 0.08; break;
      case 'locker': targetScroll = scrollHeight * 0.22; break;
      case 'strategy_board': targetScroll = scrollHeight * 0.35; break;
      case 'scoreboard': targetScroll = scrollHeight * 0.50; break;
      case 'notebook': targetScroll = scrollHeight * 0.65; break;
      case 'sports_bag': targetScroll = scrollHeight * 0.78; break;
      case 'trophy_cabinet': targetScroll = scrollHeight * 0.86; break;
      case 'match_poster': targetScroll = scrollHeight * 0.95; break;
      default: targetScroll = 0;
    }

    lenisRef.current.scrollTo(targetScroll, {
      duration: 1.8,
      force: true
    });
  };

  // Reset the exploration game
  const resetGame = () => {
    setDiscoveredItems([]);
    setShowVictory(false);
    setActiveModalId(null);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    }
  };

  return (
    <div className={`relative w-full ${matchStarted ? 'min-h-[900vh]' : 'h-screen overflow-hidden'}`}>
      
      {/* 1. START EXPERIENCE OVERLAY */}
      <AnimatePresence>
        {!matchStarted && (
          <StartScreen onStart={() => setMatchStarted(true)} />
        )}
      </AnimatePresence>

      {/* 2. CINEMATIC PARALLAX BACKGROUND */}
      {matchStarted && (
        <ParallaxBackground scrollProgress={scrollProgress} />
      )}

      {/* 3. INTERACTIVE ITEMS LAYER */}
      {matchStarted && (
        <InteractiveItems
          scrollProgress={scrollProgress}
          onItemClick={handleItemClick}
          discoveredItems={discoveredItems}
        />
      )}

      {/* 4. DISCOVERED MODAL WINDOWS */}
      <AnimatePresence>
        {activeModalId && (
          <DiscoveryModal
            itemId={activeModalId}
            onClose={() => setActiveModalId(null)}
          />
        )}
      </AnimatePresence>

      {/* 5. MATCH CONTROLS & HUD HEADER */}
      {matchStarted && (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="fixed top-4 left-4 right-4 z-30 flex justify-between items-center pointer-events-none"
        >
          {/* Left panel: scoreboard progress */}
          <div className="bg-sunset-dark/95 border-2 border-sunset-orange/45 rounded-xl px-4 py-2 flex items-center gap-3 shadow-2xl pointer-events-auto select-none rotate-[-0.5deg]">
            <div className="flex flex-col text-center">
              <span className="text-[9px] font-display font-bold text-sunset-gold tracking-widest uppercase">DISCOVERED</span>
              <span className="text-xl font-display font-black text-white leading-none">
                {discoveredItems.length} <span className="text-sunset-orange">/</span> 8
              </span>
            </div>
            
            {/* Visual Dot checklist */}
            <div className="flex gap-1.5 border-l border-white/10 pl-3">
              {['jersey', 'locker', 'strategy_board', 'scoreboard', 'notebook', 'sports_bag', 'trophy_cabinet', 'match_poster'].map((id, index) => {
                const found = discoveredItems.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => scrollToItem(id)}
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[7px] font-bold cursor-pointer transition-all duration-300 ${
                      found
                        ? 'bg-sunset-orange border-white text-white shadow-[0_0_8px_rgba(255,107,53,0.8)] scale-110'
                        : 'bg-white/5 border-white/20 text-gray-500 hover:border-white/40'
                    }`}
                    title={`Jump to Scene ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right panel: Game settings / Reset */}
          <div className="flex gap-2 pointer-events-auto">
            <button
              onClick={resetGame}
              className="bg-sunset-dark/95 border-2 border-white/15 hover:border-sunset-orange text-white hover:text-sunset-orange rounded-xl p-2.5 transition-all shadow-2xl cursor-pointer"
              title="Reset Match Exploration"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </motion.header>
      )}

      {/* 6. IMMERSIVE INSTRUCTIONAL LABELS */}
      {matchStarted && scrollProgress < 0.05 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-center text-sunset-gold tracking-widest text-xs select-none pointer-events-none"
        >
          <Compass className="w-6 h-6 animate-bounce" />
          <span>SCROLL DOWN TO PLAY THE MATCH</span>
        </motion.div>
      )}

      {/* 7. ALL SECRETS DISCOVERED - VICTORY OVERLAY */}
      <AnimatePresence>
        {showVictory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none"
          >
            <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_30%,_rgba(18,16,22,0.95)_100%]" />
            
            <motion.div
              initial={{ rotate: -2, y: 50 }}
              animate={{ rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-md w-full bg-sunset-dark border-4 border-sunset-gold text-white p-8 text-center rounded-2xl shadow-[0_0_50px_rgba(247,197,159,0.3)] flex flex-col items-center"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-sunset-orange to-sunset-glow rounded-2xl blur-lg opacity-20 -z-10" />
              
              <span className="text-6xl mb-4 filter drop-shadow-[0_0_15px_rgba(255,107,53,0.5)]">🏆</span>
              
              <span className="text-xs font-display font-bold uppercase tracking-[0.3em] text-sunset-gold mb-1">Set Completed</span>
              <h2 className="font-display font-black text-4xl text-white tracking-wide mb-3">MATCH POINT!</h2>
              
              <p className="text-sm font-body text-gray-300 leading-relaxed mb-6">
                Congratulations! You successfully explored the gym and discovered all 8 facts about **Darshak Bisane**.
              </p>

              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={() => scrollToItem('match_poster')}
                  className="bg-sunset-orange hover:bg-sunset-glow text-white font-display font-bold tracking-widest text-xs py-3.5 rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(255,107,53,0.3)]"
                >
                  SEND CHALLENGE (CONTACT)
                </button>
                <button
                  onClick={() => setShowVictory(false)}
                  className="bg-white/5 border border-white/20 hover:bg-white/10 text-white font-display font-bold tracking-widest text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  KEEP EXPLORING
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive layout warning for super tiny screens */}
      <div className="fixed bottom-4 right-4 z-40 block md:hidden pointer-events-none">
        <div className="bg-amber-950/90 border border-amber-500/30 text-amber-200 text-[10px] rounded-lg p-2.5 shadow-2xl flex items-center gap-2 max-w-xs pointer-events-auto">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>Rotate to landscape or use a larger viewport for the full court experience!</span>
        </div>
      </div>
    </div>
  );
}
