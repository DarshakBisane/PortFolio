import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, HelpCircle } from 'lucide-react';

interface InteractiveItem {
  id: string;
  name: string;
  tooltip: string;
  icon: string;
  minScroll: number; // minimum scroll percentage (0 to 1)
  maxScroll: number; // maximum scroll percentage (0 to 1)
  position: { top: string; left: string }; // CSS position
}

interface InteractiveItemsProps {
  scrollProgress: number; // Current scroll progress (0 to 1)
  onItemClick: (itemId: string) => void;
  discoveredItems: string[];
}

const ITEMS_DATA: InteractiveItem[] = [
  {
    id: 'jersey',
    name: 'Team Jersey',
    tooltip: 'Investigate the jersey hanging on the court rack',
    icon: '👕',
    minScroll: 0.02,
    maxScroll: 0.15,
    position: { top: '35%', left: '72%' }
  },
  {
    id: 'locker',
    name: 'Open Locker',
    tooltip: 'Open Locker #9 to check what is inside',
    icon: '🔓',
    minScroll: 0.15,
    maxScroll: 0.28,
    position: { top: '45%', left: '20%' }
  },
  {
    id: 'strategy_board',
    name: 'Strategy Clipboard',
    tooltip: 'Analyze the coach\'s strategy chalkboard',
    icon: '📋',
    minScroll: 0.28,
    maxScroll: 0.43,
    position: { top: '65%', left: '75%' }
  },
  {
    id: 'scoreboard',
    name: 'Gym Scoreboard',
    tooltip: 'Check the scoreboard for matches and achievements',
    icon: '📊',
    minScroll: 0.43,
    maxScroll: 0.58,
    position: { top: '22%', left: '18%' }
  },
  {
    id: 'notebook',
    name: 'Training Notebook',
    tooltip: 'Open the volleyball training log notebook',
    icon: '📓',
    minScroll: 0.58,
    maxScroll: 0.72,
    position: { top: '70%', left: '25%' }
  },
  {
    id: 'sports_bag',
    name: 'Sports Bag',
    tooltip: 'Inspect the duffel bag on the bench',
    icon: '🎒',
    minScroll: 0.72,
    maxScroll: 0.84,
    position: { top: '65%', left: '70%' }
  },
  {
    id: 'trophy_cabinet',
    name: 'Trophy Shelf',
    tooltip: 'View achievements and championship medals',
    icon: '🏆',
    minScroll: 0.81,
    maxScroll: 0.92,
    position: { top: '25%', left: '80%' }
  },
  {
    id: 'match_poster',
    name: 'Match Poster',
    tooltip: 'Examine the upcoming tournament poster',
    icon: '📜',
    minScroll: 0.90,
    maxScroll: 1.0,
    position: { top: '35%', left: '75%' }
  }
];

export default function InteractiveItems({ scrollProgress, onItemClick, discoveredItems }: InteractiveItemsProps) {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none w-screen h-screen">
      <AnimatePresence>
        {ITEMS_DATA.map((item) => {
          const isActive = scrollProgress >= item.minScroll && scrollProgress <= item.maxScroll;
          const isDiscovered = discoveredItems.includes(item.id);

          if (!isActive) return null;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{
                position: 'absolute',
                top: item.position.top,
                left: item.position.left,
              }}
              className="pointer-events-auto select-none"
            >
              <div className="relative group flex items-center justify-center">
                {/* Glowing Outer Indicator Ring */}
                <div 
                  className={`absolute -inset-4 rounded-full blur-xs opacity-75 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDiscovered 
                      ? 'bg-sunset-gold/30 animate-pulse' 
                      : 'bg-sunset-orange/40 animate-ping [animation-duration:1.5s]'
                  }`} 
                />

                {/* Main Interactive Button */}
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`relative flex items-center justify-center w-14 h-14 rounded-full border-2 text-2xl shadow-lg transition-all duration-300 cursor-pointer ${
                    isDiscovered
                      ? 'bg-sunset-dark/90 border-sunset-gold/70 text-sunset-gold shadow-[0_0_15px_rgba(247,197,159,0.3)] hover:scale-110 hover:border-sunset-gold'
                      : 'bg-sunset-orange/95 border-white text-white shadow-[0_0_20px_rgba(255,107,53,0.5)] hover:scale-115 hover:bg-sunset-glow'
                  }`}
                >
                  {/* Pulsating Question/Icon indicator */}
                  <span className="relative z-10">{item.icon}</span>
                  {!isDiscovered && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunset-glow opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-sunset-glow items-center justify-center text-[8px] font-bold text-white">!</span>
                    </span>
                  )}
                </button>

                {/* Game-style Floating Tooltip */}
                <div className="absolute top-16 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 w-52 bg-sunset-dark/95 border-2 border-sunset-orange/60 text-white rounded-lg p-3 shadow-2xl pointer-events-none z-30 flex flex-col gap-1 items-center text-center">
                  <div className="flex items-center gap-1.5 text-sunset-gold text-[10px] font-bold tracking-wider uppercase font-display">
                    {isDiscovered ? 'Discovered' : 'New Object'} <Eye className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-white">{item.name}</h4>
                  <p className="text-[10px] text-gray-300 leading-normal">{item.tooltip}</p>
                  
                  {/* Help indicator */}
                  <div className="mt-1 flex items-center gap-1 text-[9px] text-sunset-orange/90 font-bold uppercase tracking-widest">
                    Click to Inspect <HelpCircle className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Pulsating laser pointer indicator connecting item to sky/floor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-20 bg-gradient-to-t from-sunset-orange/40 to-transparent pointer-events-none -z-10 group-hover:h-32 transition-all duration-300" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
