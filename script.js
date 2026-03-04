/* ========================================
   INTRO ANIMATION
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {

    // Intro sequence
    const introOverlay = document.getElementById('intro-overlay');
    const mainSite = document.getElementById('main-site');
    const introLines = document.querySelectorAll('.intro-line');

    // Show intro lines sequentially
    introLines.forEach((line, i) => {
        setTimeout(() => {
            line.classList.add('show');
        }, 400 + i * 600);
    });

    // After intro, reveal main site
    setTimeout(() => {
        introOverlay.classList.add('fade-out');
        mainSite.classList.remove('hidden');
        mainSite.style.opacity = '1';
        mainSite.style.transition = 'opacity 0.8s ease';

        // Trigger hero animations
        setTimeout(() => {
            document.querySelectorAll('.fade-up').forEach(el => {
                el.classList.add('show');
            });
            startTyping();
        }, 300);
    }, 3200);

    // Remove intro overlay after animation
    setTimeout(() => {
        introOverlay.style.display = 'none';
    }, 4200);


    /* ========================================
       TYPING EFFECT
       ======================================== */
    const typingTexts = [
        'Creative Software Developer',
        'Front-end Enthusiast',
        'Back-end Developer',
        'React Developer',
        'Unity Explorer',
        'Student @ Grafisch Lyceum Rotterdam'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');

    function startTyping() {
        typeText();
    }

    function typeText() {
        const currentText = typingTexts[textIndex];

        if (!isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, 2000);
                return;
            }
            setTimeout(typeText, 80);
        } else {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                setTimeout(typeText, 500);
                return;
            }
            setTimeout(typeText, 40);
        }
    }


    /* ========================================
       PARTICLES
       ======================================== */
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = (4 + Math.random() * 4) + 's';
        p.style.width = (2 + Math.random() * 3) + 'px';
        p.style.height = p.style.width;
        particlesContainer.appendChild(p);
    }


    /* ========================================
       NAVBAR
       ======================================== */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });


    /* ========================================
       SCROLL REVEAL
       ======================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ========================================
       SKILL BARS ANIMATION
       ======================================== */
    const skillFills = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(bar => skillObserver.observe(bar));


    /* ========================================
       STAT COUNTER ANIMATION
       ======================================== */
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 1500;
        const stepTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
    }


    /* ========================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /* ========================================
       CUSTOM CURSOR GLOW (optional, desktop)
       ======================================== */
    if (window.innerWidth > 900) {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 214, 10, 0.06) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: left 0.1s ease, top 0.1s ease;
        `;
        document.body.appendChild(glow);

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

});
