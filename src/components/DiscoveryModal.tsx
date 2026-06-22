import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, Send, ExternalLink } from 'lucide-react';

const Github = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface DiscoveryModalProps {
  itemId: string;
  onClose: () => void;
}

export default function DiscoveryModal({ itemId, onClose }: DiscoveryModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeProject, setActiveProject] = useState(0);

  // Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onClose();
    }, 2500);
  };

  // Render modal content based on selected item
  const renderContent = () => {
    switch (itemId) {
      case 'jersey':
        return (
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Jersey visual container */}
            <div className="relative w-48 h-64 md:w-56 md:h-72 flex-shrink-0 flex items-center justify-center bg-sunset-orange/10 border-4 border-white/90 rounded-2xl shadow-[8px_8px_0px_#000000] rotate-[-3deg] hover:rotate-0 transition-transform duration-300 overflow-hidden">
              <div className="absolute inset-0 speed-lines opacity-10" />
              {/* Giant number 9 jersey print */}
              <div className="text-[12rem] font-display font-extrabold italic text-sunset-orange/45 select-none absolute">9</div>
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-6xl filter drop-shadow-md">👕</span>
                <span className="mt-4 font-display font-black text-2xl text-white tracking-widest uppercase">KARASUNO</span>
                <span className="font-display text-xs text-sunset-gold tracking-widest uppercase">CAPTAIN</span>
              </div>
            </div>
            {/* Biography details */}
            <div className="flex-1 flex flex-col gap-3">
              <span className="text-xs font-display font-bold uppercase tracking-[0.25em] text-sunset-orange">Team Profile</span>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white tracking-wide">DARSHAK BISANE</h2>
              <div className="inline-block bg-sunset-glow/20 border border-sunset-glow/40 text-sunset-gold text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-md self-start">
                B.Tech AIML Student
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mt-2 font-body">
                "In volleyball, the setter is the control tower who coordinates the attack. In technology, I strive to play the same role—connecting complex data pipelines, machine learning models, and backend systems to engineer high-velocity, reliable solutions."
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4 text-xs font-body">
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <div className="text-sunset-gold font-bold uppercase tracking-wider mb-1">Focus</div>
                  <div className="text-gray-300 font-medium">Artificial Intelligence & ML</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <div className="text-sunset-gold font-bold uppercase tracking-wider mb-1">Backend</div>
                  <div className="text-gray-300 font-medium">FastAPI, Python, SQL</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'locker':
        return (
          <div className="flex flex-col gap-6">
            <span className="text-xs font-display font-bold uppercase tracking-[0.25em] text-sunset-orange">Inside Locker #9</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white">ABOUT ME</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body text-sm text-gray-300">
              <div className="md:col-span-2 flex flex-col gap-4">
                <p className="leading-relaxed">
                  Hey there! I am **Darshak Bisane**, a passionate engineering student specializing in **Artificial Intelligence & Machine Learning**. My journey into tech is fueled by a desire to solve complex real-world puzzles using data-driven intelligence and highly efficient backend software.
                </p>
                <p className="leading-relaxed">
                  I specialize in designing and scaling backend APIs, particularly with **FastAPI** and **Python**, and integrating them with deep learning architectures. Whether it's training visual models, managing database queries, or setting up caching mechanisms, I enjoy optimizing every millisecond.
                </p>
                <p className="leading-relaxed font-semibold italic text-sunset-gold">
                  "The game isn't over as long as the ball hasn't hit the court. Similarly, no software challenge is unsolvable as long as we keep debugging and iterating."
                </p>
              </div>

              {/* Locker Shelf Display */}
              <div className="bg-sunset-dark/80 border-2 border-dashed border-sunset-gold/30 rounded-xl p-4 flex flex-col gap-4">
                <div className="text-xs font-display font-bold uppercase tracking-widest text-sunset-gold border-b border-white/10 pb-1">Locker Contents</div>
                <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-lg border border-white/10">
                  <span className="text-2xl">👟</span>
                  <div>
                    <div className="text-xs text-white font-bold">Volleyball Shoes</div>
                    <div className="text-[10px] text-gray-400">Ready for action</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-lg border border-white/10">
                  <span className="text-2xl">💧</span>
                  <div>
                    <div className="text-xs text-white font-bold">Sports Water Bottle</div>
                    <div className="text-[10px] text-gray-400">95% Hydrated</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-lg border border-white/10">
                  <span className="text-2xl">🎧</span>
                  <div>
                    <div className="text-xs text-white font-bold">Headphones</div>
                    <div className="text-[10px] text-gray-400">Haikyuu OST on loop</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'strategy_board':
        return (
          <div className="flex flex-col gap-6">
            <span className="text-xs font-display font-bold uppercase tracking-[0.25em] text-sunset-orange">Coach's Playbook</span>
            <h2 className="font-display font-black text-3xl text-white">TACTICAL SKILLS BOARD</h2>
            
            <p className="text-xs font-body text-gray-400 -mt-2">
              Our skill lineup, plotted like volleyball tactics. Click or hover on zones to review strategy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body mt-2">
              {/* Set: Languages & Frameworks */}
              <div className="bg-white/5 border-2 border-sunset-orange/40 rounded-xl p-5 hover:border-sunset-orange transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🏐</span>
                  <h3 className="font-display font-bold text-lg text-sunset-orange uppercase tracking-wider">The Set</h3>
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-normal">
                  Core languages and frameworks that coordinate the application flow.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'C++', 'SQL', 'JavaScript', 'FastAPI', 'Flask', 'Vite', 'React'].map((skill) => (
                    <span key={skill} className="bg-sunset-orange/15 text-sunset-gold border border-sunset-orange/30 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spike: AI & Machine Learning */}
              <div className="bg-white/5 border-2 border-sunset-glow/40 rounded-xl p-5 hover:border-sunset-glow transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">⚡</span>
                  <h3 className="font-display font-bold text-lg text-sunset-glow uppercase tracking-wider">The Spike</h3>
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-normal">
                  Data science, models, and deep learning algorithms that deliver the impact.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['PyTorch', 'TensorFlow', 'Scikit-Learn', 'YOLOv8', 'OpenCV', 'Pandas', 'NumPy', 'Data Science'].map((skill) => (
                    <span key={skill} className="bg-sunset-glow/15 text-white border border-sunset-glow/30 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Receive: Infrastructure & Tools */}
              <div className="bg-white/5 border-2 border-sunset-gold/40 rounded-xl p-5 hover:border-sunset-gold transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🛡️</span>
                  <h3 className="font-display font-bold text-lg text-sunset-gold uppercase tracking-wider">The Receive</h3>
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-normal">
                  Databases, version control, and infrastructure keeping the server solid.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Docker', 'Git', 'PostgreSQL', 'SQLite', 'MongoDB', 'Redis', 'REST APIs', 'Linux'].map((skill) => (
                    <span key={skill} className="bg-sunset-gold/15 text-sunset-gold border border-sunset-gold/30 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'scoreboard':
        const projects = [
          {
            title: 'FastAPI ML Deployment Platform',
            desc: 'Scalable backend API wrapper for deploying PyTorch models. Features asynchronous task queues, automatic validation schemas, Redis-based caching, and Prometheus metrics tracking.',
            tech: ['FastAPI', 'Docker', 'Redis', 'PyTorch', 'PostgreSQL'],
            link: 'https://github.com'
          },
          {
            title: 'Computer Vision Volleyball Tracker',
            desc: 'An AI-powered video analysis tool that detects volleyballs, tracks their coordinate trajectory, and calculates velocities in real time using a custom-trained YOLOv8 architecture and OpenCV.',
            tech: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'NumPy'],
            link: 'https://github.com'
          },
          {
            title: 'Deep Learning Anime Face Generator',
            desc: 'Generative Adversarial Network (GAN) trained on a curated dataset of over 20,000 anime character illustrations. Built using PyTorch with custom convolutional layers for high fidelity facial synthesis.',
            tech: ['PyTorch', 'GANs', 'Deep Learning', 'Matplotlib'],
            link: 'https://github.com'
          },
          {
            title: 'Interactive Anime Portfolio',
            desc: 'A gamified, scroll-driven interactive personal portfolio themed around sports anime volleyball action. Fully optimized at 60 FPS using Vite, React, GSAP ScrollTrigger, and Framer Motion.',
            tech: ['Vite', 'React', 'TypeScript', 'Tailwind v4', 'GSAP', 'Lenis'],
            link: 'https://github.com'
          }
        ];
        return (
          <div className="flex flex-col gap-6">
            <span className="text-xs font-display font-bold uppercase tracking-[0.25em] text-sunset-orange">Spring Match Board</span>
            <h2 className="font-display font-black text-3xl text-white">PROJECT ARCHIVES</h2>

            <div className="flex flex-col lg:flex-row gap-6 mt-1">
              {/* Scoreboard controls */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0">
                {projects.map((proj, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveProject(idx)}
                    className={`flex items-center justify-between gap-4 p-4 text-left border-2 rounded-xl transition-all font-display cursor-pointer min-w-[200px] lg:min-w-0 ${
                      activeProject === idx
                        ? 'bg-sunset-orange border-white text-white shadow-lg translate-x-1'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="font-bold text-sm truncate max-w-[140px]">{proj.title.split(' ')[0] + ' ' + (proj.title.split(' ')[1] || '')}</span>
                    <span className="font-black text-xl italic">{`0${idx + 1}`}</span>
                  </button>
                ))}
              </div>

              {/* Active Project Card */}
              <div className="flex-1 bg-sunset-dark/95 border-2 border-white/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-7xl font-display font-extrabold italic text-white/5 select-none">
                  {`#0${activeProject + 1}`}
                </div>
                
                <h3 className="font-display font-black text-2xl text-white mb-2 leading-snug">
                  {projects[activeProject].title}
                </h3>

                <p className="text-sm font-body text-gray-300 leading-relaxed mb-6">
                  {projects[activeProject].desc}
                </p>

                <div className="flex flex-col gap-4 mt-auto">
                  <div>
                    <h4 className="text-xs font-display font-bold text-sunset-gold uppercase tracking-wider mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[activeProject].tech.map((t) => (
                        <span key={t} className="bg-white/5 text-gray-300 border border-white/10 text-xs px-2.5 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <a
                      href={projects[activeProject].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-sunset-dark font-display font-bold text-xs px-4 py-2 rounded-lg hover:bg-sunset-orange hover:text-white transition-all cursor-pointer"
                    >
                      View Source <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notebook':
        return (
          <div className="flex flex-col gap-6">
            <span className="text-xs font-display font-bold uppercase tracking-[0.25em] text-sunset-orange">Training Log</span>
            <h2 className="font-display font-black text-3xl text-white">EDUCATION LOG</h2>

            {/* Notebook Lined Page Container */}
            <div className="bg-amber-50 text-slate-800 border-4 border-slate-900 rounded-xl p-6 md:p-8 shadow-[8px_8px_0px_#000000] rotate-[0.5deg]">
              <div className="flex flex-col gap-6 border-l-2 border-red-400 pl-4 md:pl-6 relative">
                
                {/* School */}
                <div className="relative">
                  <div className="absolute -left-[27px] md:-left-[35px] top-1 bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center font-display font-bold text-xs">1</div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-display font-black text-lg text-slate-900">B.TECH IN ARTIFICIAL INTELLIGENCE & MACHINE LEARNING</h3>
                    <span className="font-display font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded-md">2023 - Present</span>
                  </div>
                  <p className="font-body text-xs text-slate-500 font-semibold mt-1">Specialized Engineering Curriculum</p>
                  <p className="font-body text-sm text-slate-700 leading-relaxed mt-2">
                    Focusing on core AI concepts, database architectures, machine learning model optimization, and statistics. Actively building hands-on projects and training models for video analysis and API routing.
                  </p>
                </div>

                {/* Coursework list */}
                <div className="border-t border-dashed border-slate-300 pt-4 relative">
                  <div className="absolute -left-[27px] md:-left-[35px] top-5 bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center font-display font-bold text-xs">2</div>
                  <h4 className="font-display font-bold text-sm text-slate-900 uppercase tracking-wider mb-2">Key Workouts (Coursework)</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-body text-slate-700 list-disc pl-4">
                    <li>Design & Analysis of Algorithms</li>
                    <li>Machine Learning Algorithms & Optimization</li>
                    <li>Database Management Systems (DBMS)</li>
                    <li>Deep Learning & Neural Networks</li>
                    <li>Object Oriented Programming</li>
                    <li>Probability & Mathematical Statistics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sports_bag':
        return (
          <div className="flex flex-col gap-6 text-center py-6">
            <div className="text-6xl animate-bounce mb-2">🎒</div>
            <span className="text-xs font-display font-bold uppercase tracking-[0.25em] text-sunset-orange">Duffel Bag Compartment</span>
            <h2 className="font-display font-black text-3xl text-white">RESUME DOWNLOAD</h2>
            
            <p className="text-sm font-body text-gray-300 max-w-md mx-auto leading-relaxed">
              Grab my official training profile and career records to learn more about my technical stats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Resume download triggered! (Mock File download)");
                }}
                className="flex items-center gap-3 bg-sunset-orange hover:bg-sunset-glow text-white font-display font-bold tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)] cursor-pointer"
              >
                Download PDF <FileText className="w-5 h-5" />
              </a>
              <a
                href="#view"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Opening resume viewer... (Mock Resume view)");
                }}
                className="flex items-center gap-2 bg-white/5 border border-white/20 hover:bg-white/10 text-white font-display font-bold tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                View Online <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        );

      case 'trophy_cabinet':
        return (
          <div className="flex flex-col gap-6">
            <span className="text-xs font-display font-bold uppercase tracking-[0.25em] text-sunset-orange">Achievements Shelf</span>
            <h2 className="font-display font-black text-3xl text-white">TROPHY ROOM</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
              {/* Achievement 1 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center text-center relative group hover:border-sunset-gold transition-colors">
                <span className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">🏆</span>
                <h3 className="font-display font-bold text-base text-sunset-gold mb-1">TOURNAMENT CHAMPION</h3>
                <span className="text-[10px] text-gray-500 font-body uppercase tracking-wider mb-3">Athletic Honors</span>
                <p className="text-xs text-gray-400 font-body leading-relaxed">
                  Winner of the High School District Volleyball Championship. Captained the team through a successful season.
                </p>
              </div>

              {/* Achievement 2 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center text-center relative group hover:border-sunset-orange transition-colors">
                <span className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">🥇</span>
                <h3 className="font-display font-bold text-base text-sunset-orange mb-1">HACKATHON TOP 10</h3>
                <span className="text-[10px] text-gray-500 font-body uppercase tracking-wider mb-3">AI & ML Track</span>
                <p className="text-xs text-gray-400 font-body leading-relaxed">
                  Ranked in the top 10 finishers out of 150+ teams in a regional AI hackathon, designing a mock medical imaging router.
                </p>
              </div>

              {/* Achievement 3 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center text-center relative group hover:border-sunset-glow transition-colors">
                <span className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">💻</span>
                <h3 className="font-display font-bold text-base text-sunset-glow mb-1">OPEN SOURCE PLAYER</h3>
                <span className="text-[10px] text-gray-500 font-body uppercase tracking-wider mb-3">API Ecosystem</span>
                <p className="text-xs text-gray-400 font-body leading-relaxed">
                  Contributed PRs to Python packages and helped maintain sample templates in the FastAPI ecosystem.
                </p>
              </div>
            </div>
          </div>
        );

      case 'match_poster':
        return (
          <div className="flex flex-col gap-6">
            <span className="text-xs font-display font-bold uppercase tracking-[0.25em] text-sunset-orange">Official Invitation</span>
            <h2 className="font-display font-black text-3xl text-white">SEND A MATCH CHALLENGE</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Challenge details */}
              <div className="flex flex-col gap-4 font-body">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Have an open development opportunity, a machine learning research challenge, or just want to chat about anime and sports?
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Pin your message to my match notice board! Fill out the form or reach out directly via my socials.
                </p>

                <div className="flex flex-col gap-2 mt-2">
                  <div className="text-xs font-bold text-sunset-gold uppercase tracking-wider">Social Links</div>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-white/15 p-2 rounded-lg text-white border border-white/10 transition-colors flex items-center justify-center"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-white/15 p-2 rounded-lg text-white border border-white/10 transition-colors flex items-center justify-center"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-sunset-dark/95 border border-white/15 rounded-xl p-4 md:p-5 relative">
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-sunset-dark/90 flex flex-col items-center justify-center text-center p-4 z-10 rounded-xl"
                  >
                    <span className="text-4xl mb-2">🔥</span>
                    <h3 className="font-display font-black text-xl text-sunset-orange">CHALLENGE RECEIVED!</h3>
                    <p className="text-xs text-gray-400 mt-2 font-body">
                      I will respond as soon as I finish this match. Stand by!
                    </p>
                  </motion.div>
                ) : null}

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-3 font-body text-xs">
                  <div>
                    <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">Challenger Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Hinata Shoyo"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-sunset-orange font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">Your Email</label>
                    <input
                      required
                      type="email"
                      placeholder="shoyo@karasuno.edu"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-sunset-orange font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">Challenge Terms (Message)</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Let's play a match together!..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-sunset-orange font-medium resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-sunset-orange hover:bg-sunset-glow text-white font-display font-black tracking-widest text-xs py-3 rounded-lg mt-1 cursor-pointer transition-all shadow-[0_0_15px_rgba(255,107,53,0.25)]"
                  >
                    SEND CHALLENGE <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Determine diagonal tilt of the modal border based on ID to fit artistic feel
  const getTiltClass = () => {
    switch (itemId) {
      case 'jersey': return 'rotate-[-0.5deg]';
      case 'locker': return 'rotate-[1deg]';
      case 'strategy_board': return 'rotate-[-1deg]';
      case 'scoreboard': return 'rotate-[0.5deg]';
      case 'notebook': return 'rotate-[-0.5deg]';
      case 'sports_bag': return 'rotate-[1deg]';
      default: return 'rotate-0';
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4 bg-black/75 backdrop-blur-xs select-none">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Manga Panel Modal container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50, rotate: 2 }}
        transition={{ type: 'spring', stiffness: 220, damping: 25 }}
        className={`relative max-w-3xl w-full bg-sunset-dark border-4 border-white text-white p-6 md:p-8 manga-panel shadow-2xl z-50 overflow-hidden ${getTiltClass()}`}
      >
        {/* Decorative corner dashes */}
        <div className="absolute top-2 left-2 text-[10px] text-white/20 select-none tracking-widest uppercase font-display font-bold">Panel // {itemId}</div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-sunset-dark rounded-full p-1.5 border-2 border-slate-900 shadow-md hover:bg-sunset-orange hover:text-white transition-all duration-300 z-20 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ambient speed line decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 speed-lines opacity-5 pointer-events-none" />

        {/* Render actual content */}
        <div className="mt-2 relative z-10">
          {renderContent()}
        </div>
      </motion.div>
    </div>
  );
}
