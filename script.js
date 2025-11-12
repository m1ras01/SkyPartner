// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Изменение навигации при прокрутке
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Обработка формы обратной связи
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Здесь можно добавить отправку данных на сервер
        console.log('Отправка формы:', formData);
        
        // Показываем сообщение об успехе
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
        
        // Очищаем форму
        contactForm.reset();
    });
}

// Анимация счетчика для цифр
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';

            if (entry.target.dataset.observerSection === 'true') {
                entry.target.style.transform = 'translateY(0)';
            } else if (!entry.target.matches('section')) {
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
            
            // Анимация счетчика для статистики
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                const target = parseInt(statNumber.textContent);
                if (!isNaN(target)) {
                    statNumber.dataset.animated = 'true';
                    animateCounter(statNumber, target);
                }
            }
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.principle-card, .service-card, .stat-item, .client-logo, .portfolio-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });
    
    // Анимация для секций
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === 'home') {
            return;
        }

        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        section.dataset.observerSection = 'true';
        observer.observe(section);
    });
});

// Валидация телефона
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value[0] === '8') {
                value = '7' + value.substring(1);
            }
            if (value.length <= 11) {
                let formattedValue = '+7';
                if (value.length > 1) {
                    formattedValue += ' (' + value.substring(1, 4);
                }
                if (value.length > 4) {
                    formattedValue += ') ' + value.substring(4, 7);
                }
                if (value.length > 7) {
                    formattedValue += ' ' + value.substring(7, 9);
                }
                if (value.length > 9) {
                    formattedValue += ' ' + value.substring(9, 11);
                }
                e.target.value = formattedValue;
            }
        }
    });
}

// Легкий параллакс эффект для баннера
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroCollage = document.querySelector('.hero-collage');
    const heroContent = document.querySelector('.hero-content');
    
    // Легкий параллакс для коллажа
    if (heroCollage && scrolled < window.innerHeight * 1.2) {
        const parallaxValue = scrolled * 0.15;
        heroCollage.style.transform = `translateY(${parallaxValue}px)`;
    }
    
    // Параллакс для контента (текст медленнее)
    if (heroContent && scrolled < window.innerHeight) {
        const contentParallax = scrolled * 0.2;
        heroContent.style.transform = `translateY(${contentParallax}px)`;
        heroContent.style.opacity = Math.max(0.85, 1 - (scrolled / window.innerHeight) * 0.15);
    }
    
    // Параллакс для изображения в секции "О компании"
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        const rect = aboutImage.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.1;
            aboutImage.style.transform = `translateY(${offset}px)`;
        }
    }
});

// Добавляем эффект печатания для текста (опционально, можно использовать для заголовков)
function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Плавное появление навигации при прокрутке вверх
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Прокрутка вниз
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Прокрутка вверх
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Добавляем курсор-след для интерактивных элементов (опционально)
document.addEventListener('mousemove', (e) => {
    const interactiveElements = document.querySelectorAll('a, button, .principle-card, .service-card, .client-logo');
    interactiveElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            el.style.setProperty('--mouse-x', x + 'px');
            el.style.setProperty('--mouse-y', y + 'px');
        }
    });
});

const scrollTriggers = document.querySelectorAll('[data-scroll-target]');
scrollTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSelector = trigger.getAttribute('data-scroll-target');
        if (!targetSelector) {
            return;
        }

        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            return;
        }

        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

