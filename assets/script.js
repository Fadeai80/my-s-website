/* ============================
   نووا AI - Landing Page Script
   تعاملات و انیمیشن‌ها
   ============================ */



//    جلسه بعد اسکریپت ها توضیح داده بشه

document.addEventListener('DOMContentLoaded', function () {

    /* ----- Navbar Scroll Effect ----- */
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    /* ----- Mobile Menu Toggle ----- */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ----- FAQ Accordion ----- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* ----- Animated Counter for Stats ----- */
    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(start + (target - start) * eased);

            // Convert to Persian numerals
            element.textContent = value.toLocaleString('fa-IR');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString('fa-IR');
            }
        }

        requestAnimationFrame(update);
    }

    /* ----- Intersection Observer for Reveal + Counter ----- */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counter animation
                if (entry.target.hasAttribute('data-target')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.feature-card, .step, .price-card, .testimonial-card, .faq-item, .section-header, .trust-logo'
    );
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(el);
    });

    // Stats counter
    const statNums = document.querySelectorAll('.stat-num');
    statNums.forEach(stat => observer.observe(stat));

    /* ----- Smooth Scroll for Anchor Links ----- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    /* ----- Parallax effect on orbs ----- */
    const orbs = document.querySelectorAll('.orb');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    /* ----- Console signature ----- */
    console.log('%c نووا AI ', 'background: linear-gradient(135deg, #a855f7, #06b6d4); color: white; padding: 8px 16px; border-radius: 8px; font-size: 16px; font-weight: bold;');
    console.log('%c سلام توسعه‌دهنده! خوش اومدی :)', 'color: #a855f7; font-size: 14px;');
});
