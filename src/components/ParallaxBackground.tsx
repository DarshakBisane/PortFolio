import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxBackgroundProps {
  scrollProgress: number; // 0 to 1
}

export default function ParallaxBackground({ scrollProgress }: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scene Element Refs
  const skyRef = useRef<HTMLDivElement>(null);
  const courtRef = useRef<HTMLDivElement>(null);
  const player1Ref = useRef<HTMLDivElement>(null); // server
  const ballRef = useRef<HTMLDivElement>(null); // floating ball
  const setterHandsRef = useRef<HTMLDivElement>(null); // setter
  const spikerRef = useRef<HTMLDivElement>(null); // spiker
  const flashRef = useRef<HTMLDivElement>(null); // impact flash
  const bannerRef = useRef<HTMLDivElement>(null); // FLY banner
  const gymBenchRef = useRef<HTMLDivElement>(null); // lockers & scoreboard
  const finalCourtRef = useRef<HTMLDivElement>(null); // empty final sunset

  useEffect(() => {
    if (!containerRef.current) return;

    // Create GSAP ScrollTrigger timeline that spans the whole document height
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrub
      }
    });

    // Reset initial states
    gsap.set(skyRef.current, { scale: 1, y: 0, opacity: 0.6 });
    gsap.set(courtRef.current, { scale: 1, y: 0, opacity: 1 });
    gsap.set(player1Ref.current, { x: 0, y: 200, opacity: 0, scale: 0.95 });
    gsap.set(ballRef.current, { x: 300, y: 500, opacity: 0, rotation: 0, scale: 0.5 });
    gsap.set(setterHandsRef.current, { y: 300, opacity: 0, scale: 0.8 });
    gsap.set(spikerRef.current, { x: -200, y: 400, opacity: 0, rotation: -10, scale: 0.8 });
    gsap.set(flashRef.current, { opacity: 0 });
    gsap.set(bannerRef.current, { x: 400, opacity: 0, rotation: 10 });
    gsap.set(gymBenchRef.current, { y: 200, opacity: 0, scale: 0.9 });
    gsap.set(finalCourtRef.current, { opacity: 0, scale: 1.1 });

    // GSAP Timeline Animations driving the camera flow
    tl
      // SCENE 1 -> 2 (0% - 15% scroll): Court zoom & Player Serve preparation
      .to(courtRef.current, { scale: 1.08, y: -50, duration: 2, ease: 'none' }, 0)
      .to(player1Ref.current, { y: 0, opacity: 1, scale: 1, duration: 2, ease: 'power2.out' }, 0.5)
      
      // SCENE 2 -> 3 (15% - 30% scroll): Server shoots ball, ball floats into close-up
      .to(player1Ref.current, { x: -300, y: -50, opacity: 0, scale: 0.9, duration: 2, ease: 'power2.in' }, 2)
      .to(courtRef.current, { filter: 'blur(4px)', y: -150, opacity: 0.3, duration: 2 }, 2)
      .to(ballRef.current, { 
        x: 0, 
        y: 0, 
        opacity: 1, 
        scale: 1.5, 
        rotation: 360, 
        duration: 3, 
        ease: 'power1.out' 
      }, 2)

      // SCENE 3 -> 4 (30% - 43% scroll): Ball floats up, Setter hands appear framing it
      .to(ballRef.current, { 
        x: -50, 
        y: -250, 
        scale: 0.8, 
        rotation: 540, 
        duration: 2.5, 
        ease: 'power1.inOut' 
      }, 4.5)
      .to(setterHandsRef.current, { y: 0, opacity: 1, scale: 1, duration: 2, ease: 'power2.out' }, 4.5)

      // SCENE 4 -> 5 (43% - 55% scroll): Setter sets, camera pans to Spiker jumping
      .to(setterHandsRef.current, { y: 200, opacity: 0, scale: 0.9, duration: 2, ease: 'power2.in' }, 6.5)
      .to(ballRef.current, { x: 200, y: -450, scale: 0.4, opacity: 0, duration: 1.5, ease: 'power1.in' }, 6.5)
      .to(spikerRef.current, { x: 0, y: 0, opacity: 1, rotation: 0, scale: 1.1, duration: 2.5, ease: 'power2.out' }, 7)

      // SCENE 5 -> 6 (55% - 63% scroll): Spiker swings, impact ball, action flash
      .to(spikerRef.current, { scale: 1.2, x: 50, duration: 1.5, ease: 'power1.out' }, 9)
      .to(flashRef.current, { opacity: 1, duration: 0.2 }, 10.3)
      .to(flashRef.current, { opacity: 0, duration: 0.8 }, 10.5)
      .to(spikerRef.current, { opacity: 0, scale: 0.8, duration: 1.5 }, 10.5)

      // SCENE 6 -> 7 (63% - 75% scroll): Action flash fades, banner "FLY" waves in wind
      .to(bannerRef.current, { x: 0, opacity: 1, rotation: 0, scale: 1, duration: 2, ease: 'power2.out' }, 11)
      .to(skyRef.current, { opacity: 0.8, y: -20, scale: 1.05, duration: 3 }, 11)

      // SCENE 7 -> 8 (75% - 88% scroll): Banner flies away, victory bench/lockers appear
      .to(bannerRef.current, { y: -300, opacity: 0, scale: 1.1, duration: 2, ease: 'power2.in' }, 13.5)
      .to(gymBenchRef.current, { y: 0, opacity: 1, scale: 1, duration: 3, ease: 'power2.out' }, 14)

      // SCENE 8 -> 9 (88% - 100% scroll): Victory bench blurs/fades out, final peaceful empty court
      .to(gymBenchRef.current, { opacity: 0, y: -50, scale: 0.95, duration: 2.5, ease: 'power2.inOut' }, 17.5)
      .to(finalCourtRef.current, { opacity: 1, scale: 1, duration: 3, ease: 'power2.out' }, 17.5)
      .to(skyRef.current, { opacity: 0.5, y: -40, duration: 3 }, 17.5);

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Motion blur dynamic factor based on scroll speed.
  // Calculated using difference in scroll progress over time.
  const blurAmount = Math.min(25, Math.abs(scrollProgress - 0.5) * 15);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-sunset-dark z-0 pointer-events-none select-none"
      style={{
        filter: `blur(${blurAmount}px)`,
        transition: 'filter 0.15s ease-out'
      }}
    >
      {/* 1. SKY LAYER (Distant Background) */}
      <div 
        ref={skyRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full opacity-60"
        style={{ backgroundImage: `url('/assets/sunset_gym_court.png')`, filter: 'brightness(0.6)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sunset-dark via-transparent to-transparent opacity-85" />

      {/* 2. COURT LAYER (Scene 1 & Entrance) */}
      <div 
        ref={courtRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{ backgroundImage: `url('/assets/sunset_gym_court.png')` }}
      />

      {/* 3. PLAYER SERVING LAYER (Scene 2) */}
      <div 
        ref={player1Ref}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <img 
          src="/assets/player_serve.png" 
          alt="Player Serving" 
          className="h-[80vh] w-auto object-contain glow-orange"
        />
      </div>

      {/* 4. FLOATING VOLLEYBALL LAYER (Scene 3) */}
      <div 
        ref={ballRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <img 
          src="/assets/volleyball_ball.png" 
          alt="Floating Volleyball" 
          className="w-48 h-48 md:w-64 md:h-64 object-contain glow-pulse"
        />
      </div>

      {/* 5. SETTER HANDS LAYER (Scene 4) */}
      <div 
        ref={setterHandsRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <img 
          src="/assets/player_set_hands.png" 
          alt="Setter Hands" 
          className="h-[85vh] w-auto object-contain glow-orange"
        />
      </div>

      {/* 6. SPIKER JUMPING LAYER (Scene 5) */}
      <div 
        ref={spikerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {/* Speed lines in spiker background */}
        <div className="absolute inset-0 speed-lines opacity-20" />
        <div className="h-[90vh] w-[90vw] flex items-center justify-center relative">
          <div className="text-white/10 text-9xl font-display font-black absolute select-none tracking-widest uppercase italic rotate-[-12deg]">
            SPIKE!
          </div>
          <img 
            src="/assets/player_serve.png" 
            alt="Spiker Jumping" 
            className="h-[85vh] w-auto object-contain scale-x-[-1] rotate-[15deg] glow-orange"
          />
        </div>
      </div>

      {/* 7. IMPACT FLASH LAYER (Scene 6) */}
      <div 
        ref={flashRef}
        className="absolute inset-0 bg-white z-40 pointer-events-none flex items-center justify-center"
      >
        <div className="action-flash absolute inset-0" />
        <div className="text-black font-display font-black text-6xl md:text-9xl tracking-[0.2em] italic uppercase scale-110">
          BOOM!
        </div>
      </div>

      {/* 8. CHEERING BANNER LAYER (Scene 7) */}
      <div 
        ref={bannerRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4"
      >
        <div className="relative max-w-lg w-full h-[65vh] flex items-center justify-center">
          <img 
            src="/assets/cheering_banner.png" 
            alt="FLY Banner" 
            className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          />
          {/* Kanji glow text overlay */}
          <div className="absolute font-display text-white/5 text-[15rem] leading-none uppercase select-none pointer-events-none font-extrabold italic">
            FLY
          </div>
        </div>
      </div>

      {/* 9. GYM LOCKERS & BENCH LAYER (Scene 8) */}
      <div 
        ref={gymBenchRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{ backgroundImage: `url('/assets/gym_lockers.png')` }}
      />

      {/* 10. FINAL PEACEFUL SUNSET COURT (Scene 9) */}
      <div 
        ref={finalCourtRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full flex items-center justify-center"
        style={{ backgroundImage: `url('/assets/sunset_gym_court.png')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-sunset-dark/80 to-transparent" />
      </div>

      {/* Vignette border framing the cinematic view */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_60%,_rgba(18,16,22,0.8)_100%)] z-10" />
    </div>
  );
}
