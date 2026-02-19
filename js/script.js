document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // --- Hero Animations ---
    const heroTl = gsap.timeline();

    heroTl.from('.hero-visual', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    })
        .from('.hero-text h1', {
            duration: 1,
            y: 40,
            opacity: 0,
            ease: 'power3.out'
        }, "-=1")
        .from('.hero-sub', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, "-=0.8")
        .from('.cta-group', {
            duration: 1,
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        }, "-=0.8");

    // --- Experience Timeline Animation ---
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // --- Project Feature Animation ---
    gsap.from('.project-feature', {
        scrollTrigger: {
            trigger: '.project-feature',
            start: "top 80%"
        },
        scale: 0.9,
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });

    // --- Skill Bars Animation ---
    gsap.utils.toArray('.bar-fill').forEach((bar) => {
        gsap.from(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 90%"
            },
            width: 0,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // --- Footer Reveal ---
    gsap.from('.footer-content', {
        scrollTrigger: {
            trigger: 'footer',
            start: "top 85%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });


    // --- Deep Space Background (Canvas) ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    });

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5;
            this.speedZ = Math.random() * 2; // Simulated depth speed
        }

        update() {
            // Simple parallax drift
            this.y -= 0.5;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initStars() {
        stars = [];
        const numStars = 200;
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }

    initStars();
    animateStars();

    // --- Premium Interaction Features ---

    // 1. Copy Email to Clipboard
    const emailCard = document.getElementById('email-card');
    const emailText = document.getElementById('email-text');

    if (emailCard) {
        emailCard.addEventListener('click', () => {
            const textToCopy = emailText.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show Feedback
                emailCard.classList.add('copied');
                setTimeout(() => {
                    emailCard.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // 2. Form Submit Animation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalContent = btn.innerHTML; // Save original text/icon

            // Change to "Sending..." state
            btn.innerHTML = '<span class="btn-text">Sending...</span>';
            btn.style.opacity = '0.8';

            // Simulate Network Request
            setTimeout(() => {
                // Success State
                btn.innerHTML = '<span class="btn-text">Message Sent!</span> <span class="btn-icon"><i class="fas fa-check"></i></span>';
                btn.style.background = 'var(--accent-cyan)';
                btn.style.color = '#000';

                // Reset Form
                contactForm.reset();

                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = ''; // Revert to CSS
                    btn.style.color = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});
