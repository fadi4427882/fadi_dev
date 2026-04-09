document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Theme Toggle Functionality
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check for saved user preference in local storage
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        body.className = currentTheme;
        if (currentTheme === 'light-mode') {
            themeIcon.classList.replace('bx-sun', 'bx-moon');
        }
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            // Switch to Light Mode
            body.className = 'light-mode';
            themeIcon.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('theme', 'light-mode');
        } else {
            // Switch to Dark Mode
            body.className = 'dark-mode';
            themeIcon.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.getElementById('menu-icon');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.replace('bx-menu', 'bx-x');
        } else {
            menuIcon.classList.replace('bx-x', 'bx-menu');
        }
    });

    // Close mobile menu when clicking any nav link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.replace('bx-x', 'bx-menu');
        });
    });

    // ==========================================
    // Header Background Reveal on Scroll
    // ==========================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // Intersection Observer for Scroll Animations
    // ==========================================
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // ==========================================
    // Skills: Tab Filter Logic
    // ==========================================
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-tab');

            skillCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================
    // Skills: Progress Bar Animation on Scroll
    // ==========================================
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                // Small delay for staggered effect
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                }, 150);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => barObserver.observe(bar));

    // ==========================================
    // Active Navigation Link Highlighting on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    function navHighlighter() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // Offset for header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-links a[href*=' + sectionId + ']');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if(navLink) navLink.classList.add('active');
            } else {
                if(navLink) navLink.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', navHighlighter);

    // ==========================================
    // Device Detection Logic
    // ==========================================
    function getDeviceInfo() {
        const userAgent = navigator.userAgent;
        let deviceType = "Desktop";
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
            deviceType = "Mobile / Phone";
        }
        
        let os = 'Unknown OS';
        if (/Windows/.test(userAgent)) os = 'Windows';
        else if (/Mac OS|Macintosh/.test(userAgent)) os = 'Mac OS';
        else if (/iPhone|iPad|iPod/.test(userAgent)) os = 'iOS';
        else if (/Android/.test(userAgent)) os = 'Android';
        else if (/Linux/.test(userAgent)) os = 'Linux';
        
        return `${deviceType} - ${os}`;
    }

    // ==========================================
    // Contact Form Submit Handling (SweetAlert2)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const deviceInfoInput = document.getElementById('device_info');
    
    // Populate hidden field with device info
    if (deviceInfoInput) {
        deviceInfoInput.value = getDeviceInfo();
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            const userDevice = getDeviceInfo();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // 1. Show loading text
            submitBtn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
            submitBtn.disabled = true;

            // 2. Prepare Form Data
            const formData = new FormData(contactForm);

            // 3. Send AJAX Request to FormSubmit
            fetch("https://formsubmit.co/ajax/fadidjabout2006@gmail.com", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                if (data.success === "true" || data.success === true) {
                    Swal.fire({
                        title: 'Success!',
                        text: `Your message has been sent successfully from your ${userDevice}.`,
                        icon: 'success',
                        confirmButtonText: 'Great!',
                        confirmButtonColor: 'var(--accent-color, #007bff)',
                        background: 'var(--bg-color, #fff)',
                        color: 'var(--text-color, #333)'
                    }).then(() => {
                        contactForm.reset(); // Clear the form fields
                    });
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            })
            .catch(error => {
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                Swal.fire({
                    title: 'Action Required / Error',
                    text: 'If this is your first time sending, please check your email (fadidjabout2006@gmail.com) to ACTIVATE the form. Otherwise, try again later.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'var(--accent-color, #007bff)',
                    background: 'var(--bg-color, #fff)',
                    color: 'var(--text-color, #333)'
                });
            });
        });
    }

    // ==========================================
    // Typed.js Animation for Hero Subtitle
    // ==========================================
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: [
                'Computer Science Student',
                'Front-End Web Developer',
                'UI/UX Enthusiast',
                'E-commerce Problem Solver'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|',
        });
    }
});


// ==========================================
// Scroll Progress Bar Logic
// ==========================================
const scrollProgress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + "%";
});

// ==========================================
// Particles.js Initialization
// ==========================================
if(typeof particlesJS !== "undefined" && document.getElementById("particles-js")) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#3b82f6" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#3b82f6", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 1.5, "direction": "none" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": false }, "onclick": { "enable": true, "mode": "push" }, "resize": true }
        },
        "retina_detect": true
    });
}

// ==========================================
// VanillaTilt.js Initialization
// ==========================================
if(typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".project-card, .skill-card, .service-card"), {
        max: 15,          
        speed: 400,       
        glare: true,      
        "max-glare": 0.2, 
        scale: 1.05       
    });
}


