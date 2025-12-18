document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdown = document.querySelector('.dropdown');

    const handleHeaderScroll = () => {
        if (window.innerWidth > 768) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('resize', handleHeaderScroll);
    handleHeaderScroll();

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    if (dropdown) {
        const dropbtn = dropdown.querySelector('.dropbtn');
        if (dropbtn) {
            dropbtn.addEventListener('click', function (event) {
                if (window.innerWidth <= 768) {
                    event.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    }

    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target').replace('+', '');
        let count = +counter.innerText;

        const inc = target / speed;

        const updateCount = () => {
            if (count < target) {
                count += inc;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };

        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    counter.innerText = '0';
                    animateCounter(counter);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const experienceBanner = document.querySelector('.experience-banner');
    if (experienceBanner) {
        observer.observe(experienceBanner);
    }
});
