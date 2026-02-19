// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // 1. Hero Animations
    const heroTl = gsap.timeline();

    // Profile Image Breathing
    gsap.to("#profile-container", {
        scale: 1.05,
        boxShadow: "0 0 70px rgba(34, 211, 238, 0.7)",
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // Hero Sequence
    heroTl.from("#profile-container", { duration: 1.5, y: 50, opacity: 0, ease: "power3.out" })
        .from("h1 span", { duration: 1, y: 30, opacity: 0, ease: "power3.out" }, "-=1")
        .to("#typewriter", {
            duration: 3,
            text: "Software Engineer Intern | Full Stack Developer",
            ease: "none",
        })
        .to("#hero-buttons", { duration: 0.8, y: 0, opacity: 1, ease: "power2.out" }, "-=0.5");

    // 2. About Section Reveal
    gsap.to("#about-text", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    });

    gsap.to("#about-visual", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%"
        },
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power2.out"
    });

    // 3. Experience Timeline Animations
    gsap.utils.toArray('.experience-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.2, // Stagger effect
            ease: "power2.out"
        });
    });

    // 4. Featured Project 3D Tilt & Reveal
    const tunehubCard = document.getElementById('tunehub-card');

    if (tunehubCard) {
        // Simple Tilt Logic (Mouse Move)
        tunehubCard.addEventListener('mousemove', (e) => {
            const rect = tunehubCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -2; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 2;

            gsap.to(tunehubCard, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.5,
                ease: "power1.out"
            });
        });

        tunehubCard.addEventListener('mouseleave', () => {
            gsap.to(tunehubCard, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power1.out"
            });
        });

        // Reveal Project
        gsap.from(tunehubCard, {
            scrollTrigger: {
                trigger: tunehubCard,
                start: "top 80%"
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    }

    // 5. Skills Grid Stagger
    gsap.to(".skill-card", {
        scrollTrigger: {
            trigger: "#skills-grid",
            start: "top 85%"
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });

    // 5.1 Computer Skills Reveal
    gsap.to("#computer-skills", {
        scrollTrigger: {
            trigger: "#computer-skills",
            start: "top 90%"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    });

    // 6. Contact Section Reveal
    gsap.from("#contact .glass-card", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%"
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    // 7. Email Copy Functionality
    const emailCard = document.getElementById('email-card');
    if (emailCard) {
        emailCard.addEventListener('click', () => {
            const email = "prasadpankaj319@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = "absolute -top-10 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded shadow-lg animate-bounce";
                tooltip.innerText = "Copied!";
                emailCard.appendChild(tooltip);

                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
        });
    }

    // 8. AJAX Form Submission
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show success message
                        successMessage.classList.remove('hidden');
                        setTimeout(() => {
                            successMessage.classList.remove('opacity-0');
                        }, 10);

                        // Reset form
                        contactForm.reset();

                        // Hide after 5 seconds
                        setTimeout(() => {
                            successMessage.classList.add('opacity-0');
                            setTimeout(() => {
                                successMessage.classList.add('hidden');
                            }, 300);
                        }, 5000);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }
});
