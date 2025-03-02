// تهيئة AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
});

// تهيئة Particles.js
document.addEventListener('DOMContentLoaded', () => {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#2563eb'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.2,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#2563eb',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Page Load Animation
window.addEventListener('load', () => {
    const pageTransition = document.querySelector('.page-transition');
    gsap.to(pageTransition, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power4.inOut'
    });

    // Hero Section Animation
    gsap.from('.hero-content', {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5
    });

    // تحريك العناصر العائمة
    const floatingElements = document.querySelectorAll('.floating-elements .element');
    
    // تعيين الموضع الأولي للعناصر
    floatingElements.forEach(element => {
        gsap.set(element, {
            y: 0,
            opacity: 0,
            scale: 0.8
        });
    });

    // تحريك العناصر بشكل متتابع
    gsap.to(floatingElements, {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.2)",
        onComplete: () => {
            // بعد اكتمال الحركة الأولية، نبدأ حركة الطفو
            floatingElements.forEach(element => {
                gsap.to(element, {
                    y: -20,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            });
        }
    });

    // تأثير التتبع للماوس
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        floatingElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const x = mouseX * 30 * speed;
            const y = mouseY * 30 * speed;
            
            gsap.to(element, {
                x: x,
                y: y + (element._baseY || 0),
                rotation: x * 0.05,
                duration: 1,
                ease: "power2.out"
            });
        });
    });
});

// تحسين النص الديناميكي
document.addEventListener('DOMContentLoaded', () => {
    const dynamicText = document.querySelector('.sec-text');
    const words = ['مطور برمجيات', 'مصمم مواقع', 'مطور تطبيقات'];
    let wordIndex = 0;

    const updateText = () => {
        dynamicText.classList.add('changing');
        
        setTimeout(() => {
            const currentWord = words[wordIndex];
            dynamicText.textContent = currentWord;
            wordIndex = (wordIndex + 1) % words.length;
            
            dynamicText.classList.remove('changing');
        }, 500); // انتظر حتى تكتمل حركة الاختفاء
    };

    // تحديث النص الأولي بدون تأخير
    dynamicText.textContent = words[0];
    
    // تحديث النص كل 4 ثواني
    setInterval(updateText, 4000);
});

// تحسين التنقل السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementTop = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementTop + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // تأخير قصير ثم التأكد من أن القسم ظاهر بالكامل
            setTimeout(() => {
                const elementRect = targetElement.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                // إذا كان القسم أطول من نافذة العرض، نقوم بالتمرير لأعلى القسم
                if (elementRect.height > viewportHeight) {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
                // إذا كان جزء من القسم خارج نافذة العرض، نقوم بضبط التمرير
                else if (elementRect.bottom > viewportHeight) {
                    window.scrollBy({
                        top: elementRect.bottom - viewportHeight + 50, // إضافة هامش صغير
                        behavior: 'smooth'
                    });
                }
            }, 500);
        }
    });
});

// تحديث الروابط النشطة في شريط التنقل
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// إضافة مستمع للتمرير لتحديث الروابط النشطة
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Project Slider
const swiper = new Swiper('.project-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});

// Skills Animation
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill-progress');
    skills.forEach(skill => {
        const progress = skill.parentElement.parentElement.querySelector('.skill-name').getAttribute('data-progress');
        gsap.to(skill, {
            width: `${progress}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: skill,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
};

// تحريك العناصر التقنية
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: '.tech-stack',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // إضافة تأثير التحويم
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            y: -10,
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// مراقبة ظهور قسم المهارات
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills-container');
if (skillsSection) {
    observer.observe(skillsSection);
}

// تهيئة الثيم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');

    // تحقق من وجود ثيم محفوظ
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(currentTheme);

    // تحديث حالة الأيقونات
    updateIcons(currentTheme === 'dark');

    // إضافة مستمع الحدث للزر
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark');
        
        // تبديل الكلاسات
        body.classList.remove(isDark ? 'dark' : 'light');
        body.classList.add(isDark ? 'light' : 'dark');
        
        // تحديث التخزين المحلي
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        
        // تحديث الأيقونات
        updateIcons(!isDark);
    });

    // دالة تحديث حالة الأيقونات
    function updateIcons(isDark) {
        if (isDark) {
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'translate(-50%, -50%) rotate(0)';
            sunIcon.style.opacity = '0';
            sunIcon.style.transform = 'translate(-50%, -50%) rotate(180deg)';
        } else {
            moonIcon.style.opacity = '0';
            moonIcon.style.transform = 'translate(-50%, -50%) rotate(-180deg)';
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'translate(-50%, -50%) rotate(0)';
        }
    }
});

// Scroll Animations
gsap.utils.toArray('.fade-in').forEach(element => {
    gsap.from(element, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    gsap.to('.floating-elements', {
        duration: 1,
        x: mouseX * 50,
        y: mouseY * 50,
        ease: 'power2.out'
    });
});

// Form Validation and Animation
const form = document.querySelector('.contact-form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add success animation
    gsap.to(form, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });

    // Reset form
    setTimeout(() => {
        form.reset();
        inputs.forEach(input => {
            input.parentElement.classList.remove('focused');
        });
    }, 1000);
});

// Hover Effect for Cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        card.addEventListener('mousemove', (e) => {
            const deltaX = (e.clientX - centerX) / 10;
            const deltaY = (e.clientY - centerY) / 10;
            
            card.style.transform = `translateY(-10px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
        });
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
}); 