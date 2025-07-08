class SequenceGame {
    constructor() {
        this.level = 1;
        this.score = 0;
        this.streak = 0;
        this.bestStreak = 0;
        this.lives = 3;
        this.maxLives = 3;
        this.hintsLeft = 3;
        this.maxHints = 3;
        this.currentSequence = null;
        this.missingIndex = 0;
        this.correctAnswer = null;
        this.usedHint = false;
        this.isAnswered = false;
        this.isProcessingAnswer = false;
        this.lastSubmittedAnswer = null;
        this.audioManager = new AudioManager();
        
        this.sequenceTypes = [
            'arithmetic', 'geometric', 'fibonacci', 'squares', 'cubes',
            'alphabet', 'alternating', 'prime', 'triangular', 'factorial',
            'powers', 'catalan', 'pentagonal'
        ];
        
        this.generateNewSequence();
        this.setupEventListeners();
        
        // Iniciar música de fondo después de la primera interacción del usuario
        this.setupAudioContext();
    }
    
    setupEventListeners() {
        const answerInput = document.getElementById('answer-input');
        
        // Enter para enviar respuesta
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        
        // Validación en tiempo real del input
        answerInput.addEventListener('input', (e) => {
            this.validateInput(e.target);
        });
        
        // Prevenir envío de formulario
        answerInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }
    
    validateInput(input) {
        // Permitir solo caracteres alfanuméricos y algunos símbolos
        const validPattern = /^[a-zA-Z0-9\-\.\s]*$/;
        if (!validPattern.test(input.value)) {
            input.value = input.value.replace(/[^a-zA-Z0-9\-\.\s]/g, '');
        }
        
        // Actualizar estado visual del input
        if (input.value.trim()) {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
    }
    
    setupAudioContext() {
        // Iniciar audio después de la primera interacción del usuario
        const startAudio = () => {
            if (this.audioManager.audioContext && this.audioManager.audioContext.state === 'suspended') {
                this.audioManager.audioContext.resume();
            }
            this.audioManager.playMusic();
            document.removeEventListener('click', startAudio);
            document.removeEventListener('keydown', startAudio);
        };
        
        document.addEventListener('click', startAudio);
        document.addEventListener('keydown', startAudio);
    }
    
    generateNewSequence() {
        this.usedHint = false;
        this.isAnswered = false;
        this.isProcessingAnswer = false;
        this.lastSubmittedAnswer = null;
        this.updateLifeIndicators();
        this.clearFeedback();
        
        const sequenceType = this.getSequenceTypeForLevel();
        this.currentSequence = this.createSequence(sequenceType);
        this.displaySequence();
        document.getElementById('answer-input').value = '';
        document.getElementById('answer-input').focus();
    }
    
    getSequenceTypeForLevel() {
        if (this.level <= 3) return 'arithmetic';
        if (this.level <= 6) return ['arithmetic', 'geometric'][Math.floor(Math.random() * 2)];
        if (this.level <= 10) return ['arithmetic', 'geometric', 'alphabet'][Math.floor(Math.random() * 3)];
        if (this.level <= 15) return ['arithmetic', 'geometric', 'alphabet', 'squares', 'fibonacci'][Math.floor(Math.random() * 5)];
        if (this.level <= 20) return ['arithmetic', 'geometric', 'fibonacci', 'squares', 'cubes', 'alphabet', 'prime'][Math.floor(Math.random() * 7)];
        return this.sequenceTypes[Math.floor(Math.random() * this.sequenceTypes.length)];
    }
    
    createSequence(type) {
        const length = Math.min(5 + Math.floor(this.level / 4), 7);
        let sequence = [];
        let description = '';
        
        switch(type) {
            case 'arithmetic':
                const diff = Math.floor(Math.random() * 5) + 1;
                const start = Math.floor(Math.random() * 10) + 1;
                for (let i = 0; i < length; i++) {
                    sequence.push(start + i * diff);
                }
                description = this.level <= 3 ? `Suma ${diff} cada vez` : 'Progresión aritmética';
                break;
                
            case 'geometric':
                const ratio = Math.floor(Math.random() * 3) + 2;
                const startGeo = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < length; i++) {
                    sequence.push(startGeo * Math.pow(ratio, i));
                }
                description = this.level <= 6 ? `Multiplica por ${ratio}` : 'Progresión geométrica';
                break;
                
            case 'fibonacci':
                // Generar diferentes tipos de Fibonacci
                const fibType = Math.floor(Math.random() * 4);
                if (fibType === 0) {
                    // Fibonacci clásico pero empezando desde diferentes números
                    const start1 = Math.floor(Math.random() * 5) + 1;
                    const start2 = Math.floor(Math.random() * 5) + 1;
                    sequence = [start1, start2];
                    for (let i = 2; i < length; i++) {
                        sequence.push(sequence[i-1] + sequence[i-2]);
                    }
                    description = 'Suma de los dos anteriores';
                } else if (fibType === 1) {
                    // Fibonacci con saltos (cada 2 números)
                    const fibSeq = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
                    for (let i = 0; i < length; i++) {
                        sequence.push(fibSeq[i * 2] || fibSeq[fibSeq.length - 1] + fibSeq[fibSeq.length - 2]);
                    }
                    description = 'Secuencia especial';
                } else if (fibType === 2) {
                    // Tribonacci (suma de los 3 anteriores)
                    sequence = [1, 1, 2];
                    for (let i = 3; i < length; i++) {
                        sequence.push(sequence[i-1] + sequence[i-2] + sequence[i-3]);
                    }
                    description = 'Suma de los tres anteriores';
                } else {
                    // Fibonacci multiplicado por constante
                    const multiplier = Math.floor(Math.random() * 3) + 2;
                    const baseFib = [1, 1, 2, 3, 5, 8, 13, 21];
                    for (let i = 0; i < length; i++) {
                        sequence.push(baseFib[i] * multiplier);
                    }
                    description = 'Patrón matemático especial';
                }
                break;
                
            case 'squares':
                for (let i = 1; i <= length; i++) {
                    sequence.push(i * i);
                }
                description = 'Números cuadrados';
                break;
                
            case 'cubes':
                for (let i = 1; i <= length; i++) {
                    sequence.push(i * i * i);
                }
                description = 'Números cúbicos';
                break;
                
            case 'alphabet':
                const startChar = Math.floor(Math.random() * 20) + 65;
                const step = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < length; i++) {
                    sequence.push(String.fromCharCode(startChar + i * step));
                }
                description = 'Secuencia alfabética';
                break;
                
            case 'alternating':
                const base1 = Math.floor(Math.random() * 5) + 1;
                const base2 = Math.floor(Math.random() * 5) + 10;
                for (let i = 0; i < length; i++) {
                    sequence.push(i % 2 === 0 ? base1 + Math.floor(i/2) : base2 + Math.floor(i/2));
                }
                description = 'Patrón alternante';
                break;
                
            case 'prime':
                const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
                sequence = primes.slice(0, length);
                description = 'Números primos';
                break;
                
            case 'triangular':
                for (let i = 1; i <= length; i++) {
                    sequence.push(i * (i + 1) / 2);
                }
                description = 'Números triangulares';
                break;
                
            case 'factorial':
                const factorials = [1, 1, 2, 6, 24, 120, 720];
                for (let i = 0; i < length; i++) {
                    sequence.push(factorials[i] || factorials[factorials.length - 1] * (factorials.length + i));
                }
                description = 'Factoriales';
                break;
                
            case 'powers':
                const base = Math.floor(Math.random() * 3) + 2;
                for (let i = 1; i <= length; i++) {
                    sequence.push(Math.pow(base, i));
                }
                description = 'Potencias';
                break;
                
            case 'catalan':
                const catalan = [1, 1, 2, 5, 14, 42, 132];
                for (let i = 0; i < length; i++) {
                    sequence.push(catalan[i] || catalan[catalan.length - 1] * 3);
                }
                description = 'Números de Catalan';
                break;
                
            case 'pentagonal':
                for (let i = 1; i <= length; i++) {
                    sequence.push(i * (3 * i - 1) / 2);
                }
                description = 'Números pentagonales';
                break;
        }
        
        this.missingIndex = Math.floor(Math.random() * sequence.length);
        this.correctAnswer = sequence[this.missingIndex];
        
        return {
            sequence: sequence,
            description: description,
            type: type
        };
    }
    
    displaySequence() {
        const grid = document.getElementById('sequence-grid');
        grid.innerHTML = '';
        
        this.currentSequence.sequence.forEach((item, index) => {
            const cell = document.createElement('div');
            cell.className = 'sequence-cell';
            
            if (index === this.missingIndex) {
                cell.className += ' missing';
                cell.textContent = '?';
            } else {
                cell.className += ' filled';
                cell.textContent = item;
            }
            
            // Añadir animación de entrada con delay
            cell.style.animationDelay = `${index * 0.1}s`;
            grid.appendChild(cell);
        });
    }
    
    checkAnswer() {
        // Prevenir spam de respuestas
        if (this.isAnswered || this.isProcessingAnswer) {
            return;
        }
        
        this.audioManager.playSound('click');
        
        const userAnswer = document.getElementById('answer-input').value.trim();
        const inputElement = document.getElementById('answer-input');
        
        // Limpiar clases de estado previas
        inputElement.classList.remove('error', 'success');
        
        if (!userAnswer) {
            this.showToast('Ingresa una respuesta', 'error');
            inputElement.classList.add('error');
            this.shakeInput(inputElement);
            return;
        }
        
        // Prevenir envío de la misma respuesta múltiples veces
        if (userAnswer === this.lastSubmittedAnswer) {
            return;
        }
        
        this.lastSubmittedAnswer = userAnswer;
        
        // Marcar que estamos procesando
        this.isProcessingAnswer = true;
        
        const isCorrect = this.validateAnswer(userAnswer);
        
        if (isCorrect) {
            inputElement.classList.add('success');
            this.handleCorrectAnswer();
        } else {
            inputElement.classList.add('error');
            this.shakeInput(inputElement);
            this.handleIncorrectAnswer();
        }
    }
    
    shakeInput(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            element.style.animation = '';
            element.classList.remove('error');
        }, 500);
    }
    
    validateAnswer(userAnswer) {
        if (typeof this.correctAnswer === 'string') {
            return userAnswer.toLowerCase() === this.correctAnswer.toLowerCase();
        } else {
            return parseInt(userAnswer) === this.correctAnswer;
        }
    }
    
    handleCorrectAnswer() {
        // Prevenir múltiples procesamientos
        if (this.isAnswered) {
            return;
        }
        
        this.isAnswered = true;
        this.audioManager.playSound('success');
        
        const points = this.calculatePoints();
        this.score += points;
        this.streak++;
        this.bestStreak = Math.max(this.bestStreak, this.streak);
        
        this.showFeedback(`¡Correcto! +${points} puntos`, 'success');
        this.animateCorrectAnswer();
        this.updateDisplay();
        
        setTimeout(() => {
            this.level++;
            this.audioManager.playSound('levelUp');
            this.generateNewSequence();
        }, 1500);
    }
    
    handleIncorrectAnswer() {
        // Prevenir múltiples procesamientos
        if (this.isAnswered) {
            return;
        }
        
        this.isAnswered = true;
        this.audioManager.playSound('error');
        
        this.lives--;
        this.streak = 0; // Resetear racha a 0 cuando se equivoca
        this.updateLifeIndicators();
        this.updateDisplay(); // Actualizar display para mostrar racha en 0
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.showFeedback(`Incorrecto. Te quedan ${this.lives} ${this.lives === 1 ? 'vida' : 'vidas'}`, 'error');
            // Pasar al siguiente nivel aunque haya fallado
            setTimeout(() => {
                this.level++;
                this.generateNewSequence();
            }, 1500);
        }
    }
    
    animateCorrectAnswer() {
        const cells = document.querySelectorAll('.sequence-cell');
        const correctCell = cells[this.missingIndex];
        
        // Actualizar contenido de la celda
        correctCell.textContent = this.correctAnswer;
        correctCell.style.background = 'linear-gradient(135deg, #064e3b, #059669)';
        correctCell.style.borderColor = '#10b981';
        correctCell.style.color = '#10b981';
        correctCell.style.transform = 'scale(1.1)';
        correctCell.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.6)';
        
        // Crear efecto de partículas
        this.createSuccessParticles(correctCell);
        
        // Animar todas las celdas con efecto de onda
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.style.transform = 'translateY(-5px) scale(1.02)';
                cell.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.2)';
                
                setTimeout(() => {
                    if (index !== this.missingIndex) {
                        cell.style.transform = '';
                        cell.style.boxShadow = '';
                    }
                }, 200);
            }, index * 100);
        });
    }
    
    createSuccessParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Crear 8 partículas
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: linear-gradient(45deg, #10b981, #34d399);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
                transform-origin: center;
            `;
            
            document.body.appendChild(particle);
            
            // Animar partícula
            const angle = (i / 8) * Math.PI * 2;
            const distance = 60 + Math.random() * 40;
            const duration = 800 + Math.random() * 400;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }
    }
    
    calculatePoints() {
        let basePoints = 10;
        let levelBonus = this.level * 2;
        let streakBonus = this.streak * 5;
        let livesBonus = this.lives * 3;
        let hintPenalty = this.usedHint ? 5 : 0;
        
        return Math.max(5, basePoints + levelBonus + streakBonus + livesBonus - hintPenalty);
    }
    
    showHint() {
        // Prevenir spam de pistas
        if (this.isAnswered) {
            return;
        }
        
        if (this.hintsLeft <= 0) {
            this.showToast('¡No te quedan más pistas!');
            this.audioManager.playSound('error');
            return;
        }
        
        if (this.usedHint) {
            this.showToast('Ya usaste una pista en esta secuencia');
            this.audioManager.playSound('error');
            return;
        }
        
        this.audioManager.playSound('hint');
        this.usedHint = true;
        this.hintsLeft--;
        this.updateDisplay();
        
        let hint = '';
        
        switch(this.currentSequence.type) {
            case 'arithmetic':
                hint = 'Pista: Los números siguen un patrón de suma constante';
                break;
            case 'geometric':
                hint = 'Pista: Cada número se relaciona con el anterior por multiplicación';
                break;
            case 'fibonacci':
                hint = 'Pista: Cada número se forma sumando números anteriores';
                break;
            case 'squares':
                hint = 'Pista: Piensa en números elevados al cuadrado';
                break;
            case 'cubes':
                hint = 'Pista: Piensa en números elevados al cubo';
                break;
            case 'alphabet':
                hint = 'Pista: Sigue un patrón alfabético con saltos';
                break;
            case 'prime':
                hint = 'Pista: Solo son divisibles por 1 y por sí mismos';
                break;
            case 'triangular':
                hint = 'Pista: Relacionado con triángulos y sumas consecutivas';
                break;
            case 'factorial':
                hint = 'Pista: Multiplicación de números consecutivos desde 1';
                break;
            case 'powers':
                hint = 'Pista: Un número elevado a potencias crecientes';
                break;
            case 'catalan':
                hint = 'Pista: Secuencia matemática especial muy famosa';
                break;
            case 'pentagonal':
                hint = 'Pista: Relacionado con figuras geométricas de 5 lados';
                break;
            default:
                hint = 'Pista: Busca el patrón matemático';
        }
        
        this.showFeedback(hint, 'hint');
    }
    
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
    }
    
    showToast(message, type = '', duration = 2000) {
        const toast = document.getElementById('toast');
        const icon = this.getToastIcon(type);
        
        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;
        
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        // Añadir clase de tipo para estilos específicos
        if (type) {
            toast.classList.add(`toast-${type}`);
        }
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.className = 'toast';
            }, 300);
        }, duration);
    }
    
    getToastIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };
        return icons[type] || '';
    }
    
    clearFeedback() {
        const feedback = document.getElementById('feedback');
        feedback.textContent = '';
        feedback.className = 'feedback';
    }
    
    updateLifeIndicators() {
        const dots = document.querySelectorAll('.life-dot');
        dots.forEach((dot, index) => {
            if (index < this.lives) {
                dot.classList.remove('lost');
            } else {
                dot.classList.add('lost');
            }
        });
    }
    
    updateDisplay() {
        document.getElementById('level').textContent = this.level;
        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;
        document.getElementById('hints-left').textContent = this.hintsLeft;
    }
    
    gameOver() {
        this.audioManager.playSound('gameOver');
        this.audioManager.stopMusic();
        
        this.streak = 0;
        this.showFeedback(`La respuesta correcta era: ${this.correctAnswer}`, 'error');
        
        document.getElementById('final-level').textContent = this.level;
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('best-streak').textContent = this.bestStreak;
        
        setTimeout(() => {
            document.getElementById('game-over-modal').classList.remove('hidden');
        }, 2000);
    }
    
    restart() {
        this.audioManager.playSound('click');
        this.audioManager.playMusic();
        
        this.level = 1;
        this.score = 0;
        this.streak = 0;
        this.lives = this.maxLives;
        this.hintsLeft = this.maxHints;
        
        document.getElementById('game-over-modal').classList.add('hidden');
        this.updateDisplay();
        this.generateNewSequence();
    }
    
    toggleAudio() {
        const isMuted = this.audioManager.toggleMute();
        const audioButton = document.getElementById('audio-toggle');
        if (audioButton) {
            audioButton.innerHTML = isMuted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        }
        return isMuted;
    }
}

// Funciones globales
let game = new SequenceGame();

function checkAnswer() {
    game.checkAnswer();
}

function generateNewSequence() {
    // Prevenir spam de "Nueva Secuencia"
    if (game.isProcessingAnswer) {
        return;
    }
    
    game.audioManager.playSound('click');
    game.generateNewSequence();
}

function showHint() {
    game.showHint();
}

function restartGame() {
    game.restart();
}

function toggleAudio() {
    game.toggleAudio();
}