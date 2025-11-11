// Acordeón interactivo - VERSIÓN MEJORADA
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado');
    
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
                    const otherButton = item.previousElementSibling.querySelector('.accordion-button');
                    if (otherButton) {
                        otherButton.classList.remove('active');
                    }
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
    
    // Forzar un reflow para asegurar que todo se renderice correctamente
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Animación al hacer scroll (opcional, puede comentarse si causa problemas)
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

// Observar artículos para animaciones (opcional)
document.querySelectorAll('article').forEach(article => {
    observer.observe(article);
});

// Botón para volver arriba
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
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
}

// Efecto de desplazamiento suave para los enlaces del menú - VERSIÓN MEJORADA
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Obtener la altura del header
            const headerHeight = document.querySelector('header').offsetHeight;
            
            // Calcular la posición de destino considerando el header
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de desplazamiento suave para los enlaces de temas - VERSIÓN MEJORADA
document.querySelectorAll('.temas-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Encontrar el artículo padre que contiene el acordeón
            const parentArticle = this.closest('article');
            
            // Si estamos en el mismo artículo, simplemente desplazarnos
            if (targetElement.closest('article') === parentArticle) {
                // Obtener la altura del header
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Calcular la posición de destino considerando el header
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Si estamos en un artículo diferente, necesitamos abrir el acordeón primero
                const targetArticle = targetElement.closest('article');
                const accordionButton = targetArticle.querySelector('.accordion-button');
                const accordionCollapse = targetArticle.querySelector('.accordion-collapse');
                
                if (accordionButton && accordionCollapse) {
                    // Abrir el acordeón
                    accordionButton.classList.add('active');
                    accordionCollapse.classList.add('show');
                    accordionCollapse.style.maxHeight = accordionCollapse.scrollHeight + 'px';
                    
                    // Esperar a que el acordeón se abra completamente antes de desplazarnos
                    setTimeout(() => {
                        // Obtener la altura del header
                        const headerHeight = document.querySelector('header').offsetHeight;
                        
                        // Calcular la posición de destino considerando el header
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 350); // Tiempo que tarda la animación del acordeón
                }
            }
        }
    });
});

// Header con efecto al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.pageYOffset > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Asegurar que la página se muestre correctamente después de la carga
window.addEventListener('load', function() {
    console.log('Página completamente cargada');
    
    // Forzar un repintado para solucionar problemas de renderizado
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
    
    // Asegurar que el contenido sea visible
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
});

// Fallback para problemas de carga
setTimeout(function() {
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
}, 1000);

// Mejoras adicionales para la imagen canvas.jpg
document.addEventListener('DOMContentLoaded', function() {
    const canvasImg = document.querySelector('.canvas-img');
    if (canvasImg) {
        // Agregar efecto de zoom suave al hacer hover
        canvasImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) translateY(-5px)';
        });
        
        canvasImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
        
        // Agregar funcionalidad de clic para ampliar
        canvasImg.addEventListener('click', function() {
            this.classList.toggle('expanded');
            if (this.classList.contains('expanded')) {
                this.style.maxWidth = '90vw';
                this.style.cursor = 'zoom-out';
            } else {
                this.style.maxWidth = '800px';
                this.style.cursor = 'zoom-in';
            }
        });
    }
});