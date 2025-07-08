class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.musicVolume = 0.15; // Reducido para mejor balance
        this.sfxVolume = 0.4;    // Reducido para mejor balance
        this.isMuted = false;
        this.currentMusic = [];
        this.masterGain = null;
        
        this.initializeAudio();
        this.generateSounds();
    }
    
    async initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Audio context not supported');
        }
    }
    
    // Generar sonidos usando Web Audio API
    generateSounds() {
        if (!this.audioContext) return;
        
        // Sonido de éxito
        this.sounds.success = this.createSuccessSound();
        
        // Sonido de error
        this.sounds.error = this.createErrorSound();
        
        // Sonido de click
        this.sounds.click = this.createClickSound();
        
        // Sonido de nivel completado
        this.sounds.levelUp = this.createLevelUpSound();
        
        // Sonido de pista
        this.sounds.hint = this.createHintSound();
        
        // Sonido de game over
        this.sounds.gameOver = this.createGameOverSound();
        
        // Música de fondo
        this.sounds.backgroundMusic = this.createBackgroundMusic();
    }
    
    createSuccessSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        };
    }
    
    createErrorSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime); // A3
            oscillator.frequency.setValueAtTime(196, this.audioContext.currentTime + 0.1); // G3
            oscillator.frequency.setValueAtTime(174.61, this.audioContext.currentTime + 0.2); // F3
            
            gainNode.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        };
    }
    
    createClickSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
    }
    
    createLevelUpSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
            let time = this.audioContext.currentTime;
            
            notes.forEach((freq, index) => {
                oscillator.frequency.setValueAtTime(freq, time + index * 0.15);
            });
            
            gainNode.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.6);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.6);
        };
    }
    
    createHintSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime); // A4
            oscillator.frequency.setValueAtTime(554.37, this.audioContext.currentTime + 0.1); // C#5
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(this.sfxVolume * 0.7, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.4);
        };
    }
    
    createGameOverSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(293.66, this.audioContext.currentTime); // D4
            oscillator.frequency.setValueAtTime(261.63, this.audioContext.currentTime + 0.2); // C4
            oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime + 0.4); // A3
            oscillator.frequency.setValueAtTime(196, this.audioContext.currentTime + 0.6); // G3
            
            gainNode.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.8);
        };
    }
    
    createBackgroundMusic() {
        return {
            start: () => {
                if (!this.audioContext || this.isMuted || this.currentMusic) return;
                
                this.playModernAmbientMusic();
            },
            stop: () => {
                if (this.currentMusic) {
                    this.currentMusic.forEach(source => {
                        try {
                            if (source.stop) source.stop();
                            if (source.disconnect) source.disconnect();
                        } catch (e) {}
                    });
                    this.currentMusic = [];
                }
            }
        };
    }
    
    playModernAmbientMusic() {
        if (!this.audioContext) return;
        
        this.currentMusic = [];
        const masterGain = this.audioContext.createGain();
        masterGain.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
        masterGain.connect(this.audioContext.destination);
        this.masterGain = masterGain;
        
        // Capa 1: Base rítmica con síntesis sustractiva
        this.createRhythmicBase(masterGain);
        
        // Capa 2: Melodía principal moderna
        this.createModernMelody(masterGain);
        
        // Capa 3: Pads atmosféricos
        this.createAtmosphericPads(masterGain);
        
        // Capa 4: Arpeggios sutiles
        this.createArpeggios(masterGain);
        
        // Aplicar fade in suave
        this.adjustMusicBalance();
    }
    
    createRhythmicBase(masterGain) {
        const rhythmGain = this.audioContext.createGain();
        rhythmGain.gain.setValueAtTime(0.3, this.audioContext.currentTime); // Reducido
        rhythmGain.connect(masterGain);
        
        const playBassDrum = (time, intensity = 1) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(rhythmGain);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(60, time);
            osc.frequency.exponentialRampToValueAtTime(30, time + 0.1);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, time);
            
            gain.gain.setValueAtTime(0.8 * intensity, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
            
            osc.start(time);
            osc.stop(time + 0.3);
            
            this.currentMusic.push(osc);
        };
        
        const playHiHat = (time, intensity = 0.3) => {
            const bufferSize = 2048;
            const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const data = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * intensity;
            }
            
            const noise = this.audioContext.createBufferSource();
            const filter = this.audioContext.createBiquadFilter();
            const gain = this.audioContext.createGain();
            
            noise.buffer = buffer;
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(rhythmGain);
            
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(8000, time);
            
            gain.gain.setValueAtTime(intensity, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
            
            noise.start(time);
            noise.stop(time + 0.1);
            
            this.currentMusic.push(noise);
        };
        
        // Patrón rítmico moderno 4/4
        const scheduleRhythm = (startTime) => {
            const beatDuration = 0.5; // 120 BPM
            const patternLength = 8;
            
            for (let beat = 0; beat < patternLength; beat++) {
                const time = startTime + beat * beatDuration;
                
                // Kick en beats 1 y 5
                if (beat % 4 === 0) {
                    playBassDrum(time, 1.0);
                }
                // Kick más suave en beat 3
                if (beat === 2) {
                    playBassDrum(time, 0.6);
                }
                
                // Hi-hats en off-beats
                if (beat % 2 === 1) {
                    playHiHat(time, 0.2);
                }
                // Hi-hats adicionales para groove
                if (beat === 1 || beat === 5) {
                    playHiHat(time + beatDuration * 0.25, 0.1);
                }
            }
            
            // Programar siguiente patrón
            setTimeout(() => {
                if (!this.isMuted && this.audioContext) {
                    scheduleRhythm(this.audioContext.currentTime + 0.1);
                }
            }, patternLength * beatDuration * 1000);
        };
        
        scheduleRhythm(this.audioContext.currentTime + 0.1);
    }
    
    createModernMelody(masterGain) {
        const melodyGain = this.audioContext.createGain();
        melodyGain.gain.setValueAtTime(0.2, this.audioContext.currentTime); // Reducido
        melodyGain.connect(masterGain);
        
        // Escala pentatónica moderna (más energética)
        const scale = [
            261.63, // C4
            293.66, // D4
            329.63, // E4
            392.00, // G4
            440.00, // A4
            523.25, // C5
            587.33, // D5
            659.25  // E5
        ];
        
        const playMelodyNote = (freq, time, duration, intensity = 1) => {
            const osc1 = this.audioContext.createOscillator();
            const osc2 = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            // Oscilador principal
            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(freq, time);
            
            // Oscilador secundario (quinta)
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(freq * 1.5, time);
            
            // Filtro para suavizar
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2000, time);
            filter.Q.setValueAtTime(1.5, time);
            
            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(melodyGain);
            
            // Envelope ADSR
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.3 * intensity, time + 0.05);
            gain.gain.setValueAtTime(0.2 * intensity, time + duration * 0.3);
            gain.gain.linearRampToValueAtTime(0, time + duration);
            
            osc1.start(time);
            osc2.start(time);
            osc1.stop(time + duration);
            osc2.stop(time + duration);
            
            this.currentMusic.push(osc1, osc2);
        };
        
        const melodyPatterns = [
            [0, 2, 4, 2, 5, 4, 2, 0], // Patrón ascendente-descendente
            [4, 5, 7, 5, 4, 2, 4, 0], // Patrón más dinámico
            [0, 4, 2, 5, 4, 7, 5, 4], // Patrón con saltos
            [2, 0, 4, 2, 5, 4, 7, 5]  // Patrón variado
        ];
        
        const scheduleMelody = (startTime) => {
            const noteDuration = 1.0; // Notas más largas para ambiente
            const pattern = melodyPatterns[Math.floor(Math.random() * melodyPatterns.length)];
            
            pattern.forEach((noteIndex, i) => {
                const time = startTime + i * noteDuration;
                const freq = scale[noteIndex];
                const intensity = 0.6 + Math.random() * 0.4; // Variación en intensidad
                
                playMelodyNote(freq, time, noteDuration * 0.8, intensity);
            });
            
            // Programar siguiente melodía
            setTimeout(() => {
                if (!this.isMuted && this.audioContext) {
                    scheduleMelody(this.audioContext.currentTime + 0.1);
                }
            }, pattern.length * noteDuration * 1000);
        };
        
        // Iniciar melodía con delay
        setTimeout(() => {
            if (!this.isMuted && this.audioContext) {
                scheduleMelody(this.audioContext.currentTime + 0.1);
            }
        }, 2000);
    }
    
    createAtmosphericPads(masterGain) {
        const padGain = this.audioContext.createGain();
        padGain.gain.setValueAtTime(0.1, this.audioContext.currentTime); // Reducido
        padGain.connect(masterGain);
        
        const chords = [
            [261.63, 329.63, 392.00], // C major
            [293.66, 369.99, 440.00], // D minor
            [329.63, 415.30, 493.88], // E minor
            [392.00, 493.88, 587.33]  // G major
        ];
        
        const playPadChord = (frequencies, time, duration) => {
            frequencies.forEach((freq, i) => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                const filter = this.audioContext.createBiquadFilter();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, time);
                
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(800, time);
                filter.Q.setValueAtTime(0.5, time);
                
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(padGain);
                
                // Envelope suave para pads
                gain.gain.setValueAtTime(0, time);
                gain.gain.linearRampToValueAtTime(0.1, time + duration * 0.3);
                gain.gain.setValueAtTime(0.08, time + duration * 0.7);
                gain.gain.linearRampToValueAtTime(0, time + duration);
                
                osc.start(time);
                osc.stop(time + duration);
                
                this.currentMusic.push(osc);
            });
        };
        
        const schedulePads = (startTime) => {
            const chordDuration = 4.0;
            const chord = chords[Math.floor(Math.random() * chords.length)];
            
            playPadChord(chord, startTime, chordDuration);
            
            setTimeout(() => {
                if (!this.isMuted && this.audioContext) {
                    schedulePads(this.audioContext.currentTime + 0.1);
                }
            }, chordDuration * 1000);
        };
        
        // Iniciar pads con delay
        setTimeout(() => {
            if (!this.isMuted && this.audioContext) {
                schedulePads(this.audioContext.currentTime + 0.1);
            }
        }, 4000);
    }
    
    createArpeggios(masterGain) {
        const arpGain = this.audioContext.createGain();
        arpGain.gain.setValueAtTime(0.05, this.audioContext.currentTime); // Muy reducido para sutileza
        arpGain.connect(masterGain);
        
        const playArpNote = (freq, time, duration) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq * 2, time); // Una octava más alta
            
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(freq * 4, time);
            filter.Q.setValueAtTime(2, time);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(arpGain);
            
            gain.gain.setValueAtTime(0.3, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
            
            osc.start(time);
            osc.stop(time + duration);
            
            this.currentMusic.push(osc);
        };
        
        const arpPatterns = [
            [523.25, 659.25, 783.99, 659.25], // C5 arpeggio
            [587.33, 739.99, 880.00, 739.99], // D5 arpeggio
            [659.25, 830.61, 987.77, 830.61]  // E5 arpeggio
        ];
        
        const scheduleArpeggios = (startTime) => {
            const noteInterval = 0.25;
            const pattern = arpPatterns[Math.floor(Math.random() * arpPatterns.length)];
            
            pattern.forEach((freq, i) => {
                const time = startTime + i * noteInterval;
                playArpNote(freq, time, noteInterval * 1.5);
            });
            
            setTimeout(() => {
                if (!this.isMuted && this.audioContext) {
                    scheduleArpeggios(this.audioContext.currentTime + 0.1);
                }
            }, pattern.length * noteInterval * 1000 + 2000); // Pausa entre arpeggios
        };
        
        // Iniciar arpeggios con delay mayor
        setTimeout(() => {
            if (!this.isMuted && this.audioContext) {
                scheduleArpeggios(this.audioContext.currentTime + 0.1);
            }
        }, 8000);
    }
    
    playSound(soundName) {
        if (this.sounds[soundName] && typeof this.sounds[soundName] === 'function') {
            this.sounds[soundName]();
        }
    }
    
    playMusic() {
        if (this.sounds.backgroundMusic) {
            this.sounds.backgroundMusic.start();
        }
    }
    
    stopMusic() {
        if (this.sounds.backgroundMusic) {
            this.sounds.backgroundMusic.stop();
        }
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopMusic();
        } else {
            this.playMusic();
        }
        return this.isMuted;
    }
    
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
        }
    }
    
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }
    
    // Método para ajustar el balance dinámicamente
    adjustMusicBalance() {
        if (this.masterGain && this.audioContext) {
            // Crear un fade in suave al inicio
            this.masterGain.gain.cancelScheduledValues(this.audioContext.currentTime);
            this.masterGain.gain.setValueAtTime(0, this.audioContext.currentTime);
            this.masterGain.gain.linearRampToValueAtTime(this.musicVolume, this.audioContext.currentTime + 2);
        }
    }
}