// Web Audio API Sound Synthesizer for Retro Sports Anime Sound Effects

class SoundManager {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Programmatic synthesis of a high-school referee whistle
  playWhistle() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // We use two high-frequency oscillators slightly detuned to create the vibrating "whistle" beat
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(2000, now);
      // Create a pitch vibration
      osc1.frequency.linearRampToValueAtTime(2050, now + 0.05);
      osc1.frequency.linearRampToValueAtTime(1950, now + 0.15);
      osc1.frequency.linearRampToValueAtTime(2000, now + 0.3);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(2040, now);
      osc2.frequency.linearRampToValueAtTime(2090, now + 0.05);
      osc2.frequency.linearRampToValueAtTime(1990, now + 0.15);
      osc2.frequency.linearRampToValueAtTime(2040, now + 0.3);

      // Bandpass filter to make it screechy and clean
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2000, now);
      filter.Q.setValueAtTime(2.0, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.03); // Rapid attack
      gainNode.gain.setValueAtTime(0.3, now + 0.25);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5); // Decay

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);

      // Play a quick secondary chirp for the classic whistle double-blast
      setTimeout(() => {
        this.playWhistleChirp();
      }, 350);
    } catch (e) {
      console.warn("AudioContext block or error: ", e);
    }
  }

  private playWhistleChirp() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(2000, now);
    osc1.frequency.linearRampToValueAtTime(2050, now + 0.03);
    osc1.frequency.linearRampToValueAtTime(2000, now + 0.15);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.Q.setValueAtTime(1.5, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02);
    gainNode.gain.setValueAtTime(0.2, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc1.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.2);
  }

  // Programmatic synthesis of a heavy volleyball slam (palm impact + air displacement)
  playSlam() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Palm Slap (Mid-high frequency burst)
      const slapOsc = this.ctx.createOscillator();
      const slapGain = this.ctx.createGain();
      
      slapOsc.type = 'triangle';
      slapOsc.frequency.setValueAtTime(280, now);
      slapOsc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

      slapGain.gain.setValueAtTime(0.5, now);
      slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      slapOsc.connect(slapGain);
      slapGain.connect(this.ctx.destination);
      slapOsc.start(now);
      slapOsc.stop(now + 0.1);

      // 2. Heavy Boom (Deep body resonance)
      const boomOsc = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(95, now);
      boomOsc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

      boomGain.gain.setValueAtTime(0.6, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      boomOsc.connect(boomGain);
      boomGain.connect(this.ctx.destination);
      boomOsc.start(now);
      boomOsc.stop(now + 0.35);

      // 3. Noise crack (crisp impact transient)
      const bufferSize = this.ctx.sampleRate * 0.05; // 50ms of noise
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1000, now);
      noiseFilter.Q.setValueAtTime(3, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.05);

    } catch (e) {
      console.warn("AudioContext block or error: ", e);
    }
  }
}

export const audioSFX = new SoundManager();
