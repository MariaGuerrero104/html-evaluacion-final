// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación suave
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Smooth scrolling para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menú hamburguesa para móviles
    hamburger.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Efecto de header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animación de contadores en la sección About
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const targetCount = parseInt(stat.getAttribute('data-count'));
            const currentCount = parseInt(stat.textContent);
            const increment = targetCount / 100;
            
            if (currentCount < targetCount) {
                stat.textContent = Math.ceil(currentCount + increment);
                setTimeout(() => animateCounters(), 20);
            } else {
                stat.textContent = targetCount;
            }
        });
    }
    
    // Observador para animar los contadores cuando entren en vista
    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Animación de las tarjetas del blog
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Efecto parallax para las formas del hero
    const heroShapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        heroShapes.forEach((shape, index) => {
            const yPos = -(scrolled * parallaxSpeed * (index + 1));
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Validación del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validación simple
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío del formulario
            showNotification('¡Mensaje enviado exitosamente!', 'success');
            this.reset();
        });
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #4CAF50;' : 'background: #f44336;'}
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Efecto de typing en el hero
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingSpeed = 100;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Iniciar el efecto después de 1 segundo
        setTimeout(typeWriter, 1000);
    }
    
    // Lazy loading para las imágenes (simulado)
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    });
    
    imagePlaceholders.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Efecto de click en las tarjetas del blog
    blogCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Abriendo: ${title}`, 'success');
        });
    });
    
    // Efecto de hover en los enlaces sociales
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Detectar dispositivo móvil
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Ajustar comportamiento según el dispositivo
    if (isMobile()) {
        // Desactivar algunos efectos en móviles para mejor rendimiento
        heroShapes.forEach(shape => {
            shape.style.animation = 'none';
        });
    }
    
    // Redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Easter egg: Konami Code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            showNotification('🎉 ¡Código Konami activado! ¡Eres genial!', 'success');
            document.body.style.animation = 'rainbow 2s ease-in-out';
        }
    });
    
    // Agregar animación rainbow para el easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎉 Blog Personal cargado exitosamente!');
    console.log('💡 Tip: Prueba el código Konami: ↑↑↓↓←→←→BA');
});

// Función para manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error en el blog:', e.error);
});

// Función para detectar cuando el usuario está inactivo
let inactivityTimer;
const INACTIVITY_TIME = 30000; // 30 segundos

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        console.log('Usuario inactivo - optimizando rendimiento');
        // Pausar animaciones no esenciales
        document.body.classList.add('inactive');
    }, INACTIVITY_TIME);
}

// Eventos para detectar actividad del usuario
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => {
        document.body.classList.remove('inactive');
        resetInactivityTimer();
    });
});

// Iniciar el timer de inactividad
resetInactivityTimer();

// Función para precarga de contenido
function preloadContent() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const target = this.getAttribute('href').substring(1);
            const section = document.getElementById(target);
            if (section) {
                section.classList.add('preloaded');
            }
        });
    });
}

// Inicializar precarga
preloadContent();

// Función para guardar preferencias del usuario
function saveUserPreferences() {
    const preferences = {
        theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light',
        lastVisit: new Date().toISOString(),
        visitCount: (parseInt(getCookie('visitCount')) || 0) + 1
    };
    
    setCookie('userPreferences', JSON.stringify(preferences), 30);
    setCookie('visitCount', preferences.visitCount, 30);
}

// Funciones auxiliares para cookies
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Cargar preferencias del usuario
function loadUserPreferences() {
    const preferences = getCookie('userPreferences');
    if (preferences) {
        const prefs = JSON.parse(preferences);
        if (prefs.theme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Inicializar preferencias
loadUserPreferences();

// Guardar preferencias al salir
window.addEventListener('beforeunload', saveUserPreferences);

// Función para compartir contenido
function shareContent(title, text, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).then(() => {
            console.log('Contenido compartido exitosamente');
        }).catch(err => {
            console.log('Error al compartir:', err);
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const shareText = `${title} - ${text} ${url}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('¡Enlace copiado al portapapeles!', 'success');
        });
    }
}

// Agregar botones de compartir a las tarjetas del blog
blogCards.forEach(card => {
    const shareButton = document.createElement('button');
    shareButton.innerHTML = '📤 Compartir';
    shareButton.className = 'share-button';
    shareButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 20px;
        padding: 5px 10px;
        font-size: 12px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    card.style.position = 'relative';
    card.appendChild(shareButton);
    
    card.addEventListener('mouseenter', () => {
        shareButton.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        shareButton.style.opacity = '0';
    });
    
    shareButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const title = card.querySelector('h3').textContent;
        const text = card.querySelector('p').textContent;
        shareContent(title, text, window.location.href);
    });
});

// Función para modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    showNotification(isDark ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado', 'success');
}

// Agregar botón de modo oscuro
const darkModeButton = document.createElement('button');
darkModeButton.innerHTML = '🌙';
darkModeButton.className = 'dark-mode-toggle';
darkModeButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: #667eea;
    color: white;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 1000;
`;

darkModeButton.addEventListener('click', toggleDarkMode);
darkModeButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});
darkModeButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

document.body.appendChild(darkModeButton);

// Estilos para modo oscuro
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    .dark-mode {
        background: #1a1a1a;
        color: #e0e0e0;
    }
    
    .dark-mode header {
        background: rgba(26, 26, 26, 0.95);
    }
    
    .dark-mode .nav-links a {
        color: #e0e0e0;
    }
    
    .dark-mode .about,
    .dark-mode .contact {
        background: #2a2a2a;
    }
    
    .dark-mode .blog-card {
        background: #333;
        color: #e0e0e0;
    }
    
    .dark-mode .contact-form input,
    .dark-mode .contact-form textarea {
        background: #444;
        color: #e0e0e0;
        border-color: #555;
    }
    
    .dark-mode .dark-mode-toggle {
        background: #ffa500;
    }
    
    .dark-mode .dark-mode-toggle:before {
        content: '☀️';
    }
`;
document.head.appendChild(darkModeStyles);

// Función para scroll suave hacia arriba
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Agregar botón de scroll hacia arriba
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.className = 'scroll-top';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background:rgb(76, 75, 162);
    color: white;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(100px);
    z-index: 1000;
`;

scrollTopButton.addEventListener('click', scrollToTop);

document.body.appendChild(scrollTopButton);

// Mostrar/ocultar botón de scroll hacia arriba
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollTopButton.style.opacity = '1';
        scrollTopButton.style.transform = 'translateY(0)';
    } else {
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.transform = 'translateY(100px)';
    }
});

console.log('✨ Todas las funcionalidades del blog han sido cargadas exitosamente!');