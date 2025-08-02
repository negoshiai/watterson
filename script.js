document.addEventListener('DOMContentLoaded', function () {
    
    // --- Header Scroll & Mobile Menu Logic ---
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Change header style on scroll
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;
        const isMenuOpen = !mobileMenu.classList.contains('hidden');

        if (isScrolled || isMenuOpen) {
            header.classList.add('bg-white', 'shadow-lg');
            header.querySelectorAll('a').forEach(a => {
                a.classList.remove('text-gray-200', 'hover:text-white', 'text-white');
                a.classList.add('text-watterson-blue');
            });
            mobileMenuButton.classList.remove('text-white');
            mobileMenuButton.classList.add('text-watterson-blue');
        } else {
            header.classList.remove('bg-white', 'shadow-lg');
            header.querySelectorAll('a.nav-link').forEach(a => {
                a.classList.add('text-gray-200', 'hover:text-white');
                a.classList.remove('text-watterson-blue');
            });
            header.querySelector('a:first-child').classList.add('text-white');
            mobileMenuButton.classList.add('text-white');
            mobileMenuButton.classList.remove('text-watterson-blue');
        }
    });

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Trigger a scroll event to update header style if menu is opened at the top
        window.dispatchEvent(new Event('scroll'));
    });
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                window.dispatchEvent(new Event('scroll'));
            }
        });
    });

    // --- Scroll Animation Logic ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // --- Project Carousel Logic ---
    const projects = [
        { title: "Fort Wainwright Barracks", category: "Military", img: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?q=80&w=2070&auto=format&fit=crop" },
        { title: "Chester Valley Elementary", category: "Education", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1932&auto=format&fit=crop" },
        { title: "UAF West Ridge Research Bldg", category: "Education", img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2070&auto=format&fit=crop" },
        { title: "Fred Meyer Retail Center", category: "Commercial", img: "https://images.unsplash.com/photo-1590152914996-62c6d1729b68?q=80&w=2070&auto=format&fit=crop" },
        { title: "Data Center Facility", category: "Industrial", img: "https://images.unsplash.com/photo-1581094376363-45533c1767a1?q=80&w=2070&auto=format&fit=crop" },
    ];

    const track = document.getElementById('carousel-track');
    if (track) {
        projects.forEach(p => {
            track.innerHTML += `
                <div class="w-full flex-shrink-0 px-2 md:px-4" style="flex-basis: 100%;">
                    <div class="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                        <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-6 text-white">
                            <p class="text-sm font-semibold text-watterson-gold">${p.category}</p>
                            <h3 class="text-xl font-bold font-poppins">${p.title}</h3>
                        </div>
                    </div>
                </div>
            `;
        });

        let currentIndex = 0;
        const nextButton = document.getElementById('next-button');
        const prevButton = document.getElementById('prev-button');

        function updateCarousel() {
            track.style.transform = \`translateX(-\${currentIndex * 100}%)\`;
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % projects.length;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + projects.length) % projects.length;
            updateCarousel();
        });
    }
});
