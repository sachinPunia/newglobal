// script.js

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');
    const h1 = document.querySelector(".animated-text");
    const contactForm = document.getElementById('contactForm');
    let lastScrollTop = 0;

    AOS.init({
        duration: 1000,
        once: true
    });

    if (h1) {
        const text = h1.textContent;
        h1.innerHTML = "";
        text.split("").forEach((letter, index) => {
            const span = document.createElement("span");
            if (letter === " ") {
                span.innerHTML = "&nbsp;";
            } else {
                span.textContent = letter;
            }
            span.style.animationDelay = `${index * 0.1}s`;
            h1.appendChild(span);
        });
    }

    // Function to show active page and update navigation
    function showPage(pageId) {
        pages.forEach(page => {
            page.style.display = 'none';
        });

        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.style.display = 'block';
        }

        // Update active state in navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${pageId}`) {
                link.classList.add('active');
            }
        });

        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Handle hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !hamburger.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Handle navigation scroll effect
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.classList.add('scroll-down');
            nav.classList.remove('scroll-up');
        } else {
            nav.classList.add('scroll-up');
            nav.classList.remove('scroll-down');
        }
        lastScrollTop = scrollTop;
    });

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            alert(`🎉 Message Sent!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
            contactForm.reset();
        });
    }

    // Show initial page based on hash or default to home
    const initialPage = window.location.hash ? window.location.hash.substring(1) : 'home';
    showPage(initialPage);
});