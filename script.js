// Acordeón interactivo - VERSIÓN CORREGIDA
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los acordeones como cerrados
    document.querySelectorAll('.accordion-collapse').forEach(collapse => {
        collapse.style.maxHeight = '0';
    });
    
    // Agregar event listeners a los botones del acordeón
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', function() {
            // Obtener el elemento de contenido del acordeón
            const accordionCollapse = this.parentElement.nextElementSibling;
            
            // Cerrar todos los demás acordeones
            document.querySelectorAll('.accordion-collapse').forEach(item => {
                if (item !== accordionCollapse) {
                    item.classList.remove('show');
                    item.style.maxHeight = '0';
                    item.previousElementSibling.querySelector('.accordion-button').classList.remove('active');
                }
            });
            
            // Alternar el acordeón actual
            this.classList.toggle('active');
            
            if (accordionCollapse.classList.contains('show')) {
                // Cerrar el acordeón
                accordionCollapse.classList.remove('show');
                accordionCollapse.style.maxHeight = '0';
            } else {
                // Abrir el acordeón
                accordionCollapse.classList.add('show');
                accordionCollapse.style.maxHeight = accordionCollapse.scrollHeight + 'px';
            }
        });
    });
});

// Animación al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('article').forEach(article => {
    observer.observe(article);
});

// Botón para volver arriba
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Efecto de desplazamiento suave para los enlaces del menú
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de desplazamiento suave para los enlaces de temas
document.querySelectorAll('.temas-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Header con efecto al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Efecto de carga inicial
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});