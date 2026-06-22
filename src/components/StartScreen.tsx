import React from 'react';
import { motion } from 'framer-motion';
import { audioSFX } from '../utils/audio';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const handleStart = () => {
    // Play sound effects programmatically
    audioSFX.playWhistle();
    // Delay slightly to let the whistle sound start, then trigger the slam sound
    setTimeout(() => {
      audioSFX.playSlam();
      onStart();
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-sunset-dark select-none"
    >
      {/* Background Image with Dark Vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transition-transform duration-[10000ms] scale-105"
        style={{ backgroundImage: `url('/assets/sunset_gym_court.png')` }}
      />
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_40%,_rgba(18,16,22,0.95)_100%]" />

      {/* Speed lines ambient background */}
      <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl">
        {/* Volleyball Jersey Badge Title style */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-8 font-display text-xs tracking-[0.4em] uppercase text-sunset-gold bg-sunset-orange/20 border border-sunset-orange/40 rounded-full px-5 py-2 backdrop-blur-xs shadow-[0_0_15px_rgba(255,107,53,0.1)]"
        >
          Darshak Bisane • Interactive Portfolio
        </motion.div>

        {/* Huge Calligraphy Title */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-white mb-2 leading-none"
        >
          THE <span className="text-sunset-orange glow-text italic">SPRING</span> CUP
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-xs md:text-sm text-sunset-gold/70 tracking-[0.2em] uppercase mb-16 max-w-md font-body"
        >
          A Volleyball-Inspired Cinematic Journey
        </motion.p>

        {/* Bouncing Volleyball Button */}
        <div className="relative group cursor-pointer" onClick={handleStart}>
          {/* Animated glow rings around the volleyball */}
          <div className="absolute -inset-6 bg-sunset-orange/20 rounded-full blur-xl group-hover:bg-sunset-orange/30 transition duration-500 opacity-75 animate-ping" />
          <div className="absolute -inset-4 bg-sunset-glow/10 rounded-full blur-md group-hover:bg-sunset-glow/20 transition duration-500" />
          
          <motion.div
            animate={{
              y: [0, -25, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex flex-col items-center"
          >
            {/* The ball asset */}
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-sunset-gold/50 shadow-[0_0_35px_rgba(255,107,53,0.5)] group-hover:border-sunset-orange transition-colors duration-300">
              <img
                src="/assets/volleyball_ball.png"
                alt="Volleyball"
                className="w-full h-full object-cover group-hover:rotate-[360deg] transition-transform duration-[1.5s] ease-out"
              />
            </div>
            
            {/* Pulsating shadow under the ball */}
            <motion.div
              animate={{
                scale: [1, 0.6, 1],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-3 bg-black/60 rounded-full blur-xs mt-6 group-hover:bg-sunset-orange/40 transition-colors duration-300"
            />
          </motion.div>
        </div>

        {/* Interactive CTA text */}
        <motion.button
          onClick={handleStart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 font-display text-lg md:text-xl font-bold tracking-[0.25em] text-white hover:text-sunset-orange uppercase cursor-pointer border-b-2 border-transparent hover:border-sunset-orange transition-all duration-300 py-1"
        >
          START THE MATCH
        </motion.button>
      </div>

      {/* Decorative side banners / border brackets in anime/manga look */}
      <div className="absolute top-8 left-8 border-t-2 border-l-2 border-sunset-gold/30 w-16 h-16 pointer-events-none" />
      <div className="absolute top-8 right-8 border-t-2 border-r-2 border-sunset-gold/30 w-16 h-16 pointer-events-none" />
      <div className="absolute bottom-8 left-8 border-b-2 border-l-2 border-sunset-gold/30 w-16 h-16 pointer-events-none" />
      <div className="absolute bottom-8 right-8 border-b-2 border-r-2 border-sunset-gold/30 w-16 h-16 pointer-events-none" />
    </motion.div>
  );
}
