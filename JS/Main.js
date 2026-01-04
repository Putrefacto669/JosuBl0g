// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 JosuBl0g cargado - ¡Bienvenido al mundo retro! 🎮');
    
    // Inicializar todas las funcionalidades
    initDateAndTime();
    initThemeToggle();
    initBackToTop();
    initGameCards();
    initMusicPlayer();
    initMidiPlayer();
    initVisitorCounter();
    initAnimations();
    initMarquee();
    
    // Añadir estática aleatoria después de 10 segundos
    setTimeout(addStaticEffect, 10000);
});

// ===== FECHA Y HORA =====
function initDateAndTime() {
    // Fecha actual en español
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    // Actualizar fecha en el marquee
    const marqueeDate = document.getElementById('marqueeDate');
    if (marqueeDate) {
        marqueeDate.textContent = now.toLocaleDateString('es-ES', options);
    }
    
    // Actualizar última actualización en footer
    const lastUpdate = document.getElementById('lastUpdate');
    if (lastUpdate) {
        lastUpdate.textContent = now.toLocaleDateString('es-ES');
    }
    
    // Reloj en tiempo real
    const currentTime = document.getElementById('currentTime');
    if (currentTime) {
        function updateClock() {
            const now = new Date();
            currentTime.textContent = now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
        
        updateClock();
        setInterval(updateClock, 1000);
    }
}

// ===== CAMBIO DE TEMA =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
    
    if (!themeToggle || !themeIcon) return;
    
    // Verificar tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
    }
    
    // Escuchar clic en el botón de tema
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        // Cambiar icono
        const isLight = document.body.classList.contains('light-theme');
        themeIcon.textContent = isLight ? '☀️' : '🌙';
        
        // Guardar preferencia
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Efecto visual
        themeToggle.style.transform = "scale(1.2)";
        setTimeout(() => {
            themeToggle.style.transform = "scale(1)";
        }, 300);
    });
}

// ===== BOTÓN VOLVER ARRIBA =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    // Mostrar/ocultar botón al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
            backToTop.style.animation = 'fadeIn 0.3s ease';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Scroll suave al hacer clic
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Efecto visual
        backToTop.style.transform = "scale(0.9)";
        setTimeout(() => {
            backToTop.style.transform = "scale(1)";
        }, 300);
    });
}

// ===== TARJETAS DE JUEGO =====
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(255, 0, 0, 0.4)';
            
            // Efecto de brillo en el logo
            const logo = this.querySelector('.game-logo');
            if (logo) {
                logo.style.filter = 'drop-shadow(0 0 15px #ff00ff)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            
            // Quitar brillo del logo
            const logo = this.querySelector('.game-logo');
            if (logo) {
                logo.style.filter = 'none';
            }
        });
    });
}

// ===== REPRODUCTOR DE MÚSICA SIMULADO =====
function initMusicPlayer() {
    const nowPlaying = document.getElementById('nowPlaying');
    if (!nowPlaying) return;
    
    const tracks = [
        { title: 'Hotline Miami - Hydrogen', artist: 'M|O|O|N' },
        { title: 'Turbo Killer', artist: 'Carpenter Brut' },
        { title: 'Future Club', artist: 'Perturbator' },
        { title: 'In the Face of Evil', artist: 'Magic Sword' },
        { title: 'Accelerated', artist: 'Miami Nights 1984' },
        { title: 'Roller Mobster', artist: 'Carpenter Brut' },
        { title: 'Le Perv', artist: 'Carpenter Brut' },
        { title: 'She Swallowed Burning Coals', artist: 'El Tigr3' }
    ];
    
    let currentTrack = 0;
    
    // Cambiar de canción cada 20 segundos
    setInterval(() => {
        currentTrack = (currentTrack + 1) % tracks.length;
        const track = tracks[currentTrack];
        
        // Efecto de transición
        nowPlaying.style.opacity = '0.5';
        nowPlaying.style.transform = 'translateY(5px)';
        
        setTimeout(() => {
            nowPlaying.textContent = `${track.title}`;
            nowPlaying.style.opacity = '1';
            nowPlaying.style.transform = 'translateY(0)';
            nowPlaying.style.color = getRandomColor();
            
            // Restaurar color después de 2 segundos
            setTimeout(() => {
                nowPlaying.style.color = '';
            }, 2000);
        }, 300);
        
    }, 20000);
    
    // Función para generar colores aleatorios
    function getRandomColor() {
        const colors = [
            '#ff00ff', '#00ffff', '#ffff00', '#00ff00', 
            '#ff6600', '#ff00aa', '#aa00ff', '#00aaff'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// ===== MÚSICA MIDI CON INTERACCIÓN =====
function initMidiPlayer() {
    const music = document.getElementById("bgMusic");
    const muteBtn = document.getElementById("muteButton");
    
    if (!music || !muteBtn) return;
    
    // Los navegadores modernos bloquean autoplay - necesitamos interacción
    let userInteracted = false;
    let musicStarted = false;
    
    // Función para iniciar música después de interacción
    function startMusicAfterInteraction() {
        if (!userInteracted) {
            userInteracted = true;
            
            if (!musicStarted) {
                music.play().then(() => {
                    musicStarted = true;
                    music.muted = false;
                    muteBtn.textContent = "🔊";
                    muteBtn.title = "Mute";
                    
                    // Feedback visual
                    muteBtn.style.background = "#ff0000";
                    muteBtn.style.color = "#000000";
                    setTimeout(() => {
                        muteBtn.style.background = "";
                        muteBtn.style.color = "";
                    }, 1000);
                    
                }).catch(e => {
                    console.log("❌ Autoplay bloqueado:", e);
                    muteBtn.innerHTML = "🔇<br><small>Click</small>";
                    muteBtn.title = "Click para activar música";
                });
            }
        }
    }
    
    // Escuchar interacción en toda la página
    document.addEventListener('click', startMusicAfterInteraction, { once: true });
    document.addEventListener('keydown', startMusicAfterInteraction, { once: true });
    document.addEventListener('touchstart', startMusicAfterInteraction, { once: true });
    
    // Botón mute/unmute
    muteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que cuente como "interacción inicial"
        
        if (!userInteracted) {
            userInteracted = true;
            music.play().then(() => {
                musicStarted = true;
                music.muted = false;
                muteBtn.textContent = "🔊";
                muteBtn.title = "Mute";
            }).catch(err => {
                console.log("Error reproduciendo MIDI:", err);
                muteBtn.textContent = "❌";
                muteBtn.title = "Error de audio - Prueba otro navegador";
            });
            return;
        }
        
        if (!musicStarted) {
            music.play().then(() => {
                musicStarted = true;
                music.muted = false;
                muteBtn.textContent = "🔊";
            });
            return;
        }
        
        music.muted = !music.muted;
        muteBtn.textContent = music.muted ? "🔇" : "🔊";
        muteBtn.title = music.muted ? "Unmute" : "Mute";
        
        // Efecto visual
        muteBtn.style.transform = "scale(1.3)";
        setTimeout(() => {
            muteBtn.style.transform = "scale(1)";
        }, 200);
    });
    
    // Control de volumen con rueda del mouse sobre el botón
    muteBtn.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (music.volume >= 0 && music.volume <= 1) {
            if (e.deltaY < 0) {
                // Scroll up - subir volumen
                music.volume = Math.min(1, music.volume + 0.1);
            } else {
                // Scroll down - bajar volumen
                music.volume = Math.max(0, music.volume - 0.1);
            }
            
            // Feedback visual
            muteBtn.textContent = music.volume === 0 ? "🔇" : 
                                 music.volume < 0.3 ? "🔈" :
                                 music.volume < 0.7 ? "🔉" : "🔊";
            
            // Mostrar volumen temporalmente
            const volumeDisplay = document.createElement('div');
            volumeDisplay.textContent = `Vol: ${Math.round(music.volume * 100)}%`;
            volumeDisplay.style.cssText = `
                position: absolute;
                bottom: 70px;
                right: 0;
                background: black;
                color: lime;
                padding: 5px 10px;
                border: 2px solid red;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                z-index: 10001;
                border-radius: 5px;
                box-shadow: 0 0 10px red;
            `;
            muteBtn.parentNode.appendChild(volumeDisplay);
            setTimeout(() => {
                if (volumeDisplay.parentNode) {
                    volumeDisplay.parentNode.removeChild(volumeDisplay);
                }
            }, 1000);
        }
    });
    
    // Estado inicial
    music.volume = 0.5;
    music.muted = false;
    
    // Detectar soporte MIDI
    const canPlayMIDI = music.canPlayType('audio/midi');
    if (canPlayMIDI === "" || canPlayMIDI === "no") {
        console.warn("⚠ Este navegador no soporta MIDI nativo");
        muteBtn.innerHTML = "🎵<br><small>MP3?</small>";
        muteBtn.title = "MIDI no soportado - Cambia a MP3";
    }
}

// ===== CONTADOR DE VISITAS =====
function initVisitorCounter() {
    const counterNumber = document.querySelector('.counter-number');
    if (!counterNumber) return;
    
    // Obtener contador de localStorage o empezar desde 1234
    let count = localStorage.getItem('visitorCount');
    if (!count) {
        count = 1234;
    } else {
        count = parseInt(count);
    }
    
    // Incrementar contador
    count++;
    localStorage.setItem('visitorCount', count);
    
    // Mostrar con formato de 6 dígitos
    counterNumber.textContent = count.toString().padStart(6, '0');
    
    // Efecto especial cada 100 visitas
    if (count % 100 === 0) {
        counterNumber.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            counterNumber.style.animation = '';
        }, 3000);
    }
}

// ===== ANIMACIONES ESPECIALES =====
function initAnimations() {
    // Añadir clase de carga a las imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
    
    // Animación de parpadeo en elementos importantes
    setInterval(() => {
        const elements = document.querySelectorAll('.highlight, .game-rating');
        elements.forEach(el => {
            el.style.opacity = el.style.opacity === '0.7' ? '1' : '0.7';
        });
    }, 1500);
}

// ===== MARQUEE MEJORADO =====
function initMarquee() {
    const marquee = document.querySelector('marquee');
    if (!marquee) return;
    
    // Pausar marquee al hacer hover
    marquee.addEventListener('mouseenter', function() {
        this.stop();
    });
    
    marquee.addEventListener('mouseleave', function() {
        this.start();
    });
}

// ===== EFECTO DE ESTÁTICA ALEATORIA =====
function addStaticEffect() {
    const staticOverlay = document.createElement('div');
    staticOverlay.className = 'static-overlay';
    staticOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
        z-index: 9997;
        opacity: ${Math.random() * 0.15 + 0.05};
        mix-blend-mode: overlay;
        transition: opacity 1s ease;
    `;
    
    document.querySelector('.crt').appendChild(staticOverlay);
    
    // Remover después de un tiempo
    setTimeout(() => {
        staticOverlay.style.opacity = '0';
        setTimeout(() => {
            if (staticOverlay.parentNode) {
                staticOverlay.parentNode.removeChild(staticOverlay);
            }
        }, 1000);
    }, 3000);
    
    // Programar siguiente estática aleatoria
    const nextStatic = Math.random() * 15000 + 5000;
    setTimeout(addStaticEffect, nextStatic);
}

// ===== DETECCIÓN DE TECLAS SECRETAS (KONAMI CODE) =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    // Verificar si se ingresó el código Konami
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // ¡Easter egg activado!
        alert('🎮 ¡Código Konami activado! +30 vidas 🎮\n\n¡Felicidades, encontraste el easter egg secreto!');
        
        // Efecto visual especial
        document.body.style.animation = 'rainbow 5s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        // Resetear código
        konamiCode = [];
    }
});

// ===== AÑADIR CSS PARA ANIMACIONES EXTRA =====
const extraStyles = document.createElement('style');
extraStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes rainbow {
        0% { color: #ff0000; }
        17% { color: #ffff00; }
        34% { color: #00ff00; }
        51% { color: #00ffff; }
        68% { color: #0000ff; }
        85% { color: #ff00ff; }
        100% { color: #ff0000; }
    }
    
    .loaded {
        animation: fadeIn 0.5s ease;
    }
    
    img:not(.loaded) {
        opacity: 0;
    }
`;
document.head.appendChild(extraStyles);

// ===== BANNER FINAL FUNCIONALIDADES =====
function initFinalBanner() {
    console.log('🎪 Inicializando banner final...');
    
    // 1. Actualizar contador final (sincronizado con el del header)
    const finalCounter = document.getElementById('finalCounter');
    const headerCounter = document.querySelector('.counter-number');
    
    if (finalCounter && headerCounter) {
        finalCounter.textContent = headerCounter.textContent;
        
        // Sincronizar cambios
        const observer = new MutationObserver(() => {
            finalCounter.textContent = headerCounter.textContent;
        });
        
        observer.observe(headerCounter, {
            childList: true,
            characterData: true,
            subtree: true
        });
    }
    
    // 2. Actualizar fecha y hora en el marquee inferior
    function updateBannerDateTime() {
        const bannerDate = document.getElementById('bannerDate');
        const bannerTime = document.getElementById('bannerTime');
        
        if (bannerDate) {
            const now = new Date();
            bannerDate.textContent = now.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
        
        if (bannerTime) {
            const updateTime = () => {
                const now = new Date();
                bannerTime.textContent = now.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
            };
            
            updateTime();
            setInterval(updateTime, 1000);
        }
    }
    
    updateBannerDateTime();
    
    // 3. Efecto especial al hacer scroll hasta el banner
    const banner = document.querySelector('.final-banner');
    if (banner) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    banner.style.animation = 'bannerReveal 1s ease';
                    
                    // Efecto de confeti (simple)
                    createConfettiEffect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(banner);
    }
    
    // 4. Efecto de confeti al ver el banner
    function createConfettiEffect() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        
        document.body.appendChild(confettiContainer);
        
        // Crear confeti (emojis retro)
        const emojis = ['🐱', '🎮', '🎵', '💀', '🌟', '🕹️', '👾', '🔥'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 15}px;
                top: -50px;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.7 + 0.3};
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                animation-delay: ${Math.random() * 0.5}s;
                z-index: 9999;
            `;
            
            confettiContainer.appendChild(confetti);
        }
        
        // Remover después de la animación
        setTimeout(() => {
            if (confettiContainer.parentNode) {
                confettiContainer.parentNode.removeChild(confettiContainer);
            }
        }, 3000);
    }
    
    // 5. Añadir animación de confeti al CSS
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes bannerReveal {
            0% {
                opacity: 0;
                transform: translateY(50px) rotateX(45deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotateX(0);
            }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
    
    // 6. Interactividad con los recordatorios
    document.querySelectorAll('.reminder-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            
            // Efecto visual
            this.style.background = 'rgba(255, 255, 0, 0.3)';
            this.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.transform = '';
            }, 300);
            
            console.log(`✅ Recordatorio clickeado: ${text}`);
        });
    });
    
    // 7. Contador con efecto especial
    if (finalCounter) {
        // Animar el contador cuando sea visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Efecto de contar (opcional)
                    const current = parseInt(finalCounter.textContent);
                    let displayed = current - 100;
                    
                    const counterInterval = setInterval(() => {
                        displayed++;
                        finalCounter.textContent = displayed.toString().padStart(6, '0');
                        
                        if (displayed >= current) {
                            clearInterval(counterInterval);
                            finalCounter.textContent = current.toString().padStart(6, '0');
                            
                            // Efecto final
                            finalCounter.style.color = '#ff00ff';
                            setTimeout(() => {
                                finalCounter.style.color = '';
                            }, 1000);
                        }
                    }, 20);
                    
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(finalCounter);
    }
    
    console.log('✅ Banner final inicializado');
}

// Asegúrate de llamar esta función en tu DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... otras inicializaciones ...
    initFinalBanner();
});

console.log('🚀 JavaScript inicializado - ¡Disfruta del blog retro! 🚀');
