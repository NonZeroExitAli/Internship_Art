document.addEventListener('DOMContentLoaded', () => {

    // --- Global Background Music Logic ---
    const globalBgMusic = document.getElementById('global-bg-music');
    const musicToggleButton = document.getElementById('music-toggle');

    let isMusicPlaying = true; // Assume it's trying to play

    function updateMusicToggleButton() {
        if (globalBgMusic.paused) {
            musicToggleButton.innerHTML = `<span class="icon">🔇</span> Music Off`;
            isMusicPlaying = false;
        } else {
            musicToggleButton.innerHTML = `<span class="icon">🎶</span> Music On`;
            isMusicPlaying = true;
        }
    }

    musicToggleButton.addEventListener('click', () => {
        if (isMusicPlaying) {
            globalBgMusic.pause();
        } else {
            globalBgMusic.play().catch(e => console.log("Music play prevented by browser."));
        }
        isMusicPlaying = !isMusicPlaying;
        updateMusicToggleButton();
    });

    globalBgMusic.addEventListener('play', updateMusicToggleButton);
    globalBgMusic.addEventListener('pause', updateMusicToggleButton);
    updateMusicToggleButton();

    // --- Celebration Overlay Logic ---
    const celebrationOverlay = document.getElementById('celebration-overlay');
    if (celebrationOverlay) {
        setTimeout(() => {
            celebrationOverlay.classList.add('fade-out');
            globalBgMusic.play().catch(e => console.log("Autoplay was prevented by the browser."));
            updateMusicToggleButton();
        }, 4000); // Overlay display time

        setTimeout(() => {
            celebrationOverlay.remove();
        }, 5500); // Remove after fade-out
    } else {
        // Fallback if overlay is missing
        globalBgMusic.play().catch(e => console.log("Autoplay was prevented by the browser."));
        updateMusicToggleButton();
    }

    // --- Reusable Carousel Function ---
    // (This part is identical to the original script)
    function setupCarousel(carouselSelector) {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return;
        const items = carousel.querySelectorAll('img');
        if (items.length === 0) return;
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentItemIndex = 0;

        function showItem(index) {
            items.forEach((item, i) => {
                item.style.display = 'none'; // Simple fade can be added with CSS
                if (i === index) {
                    item.style.display = 'block';
                }
            });
        }

        showItem(currentItemIndex);

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
                showItem(currentItemIndex);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentItemIndex = (currentItemIndex + 1) % items.length;
                showItem(currentItemIndex);
            });
        }

        // Automatic slide change
        setInterval(() => {
            nextBtn.click();
        }, 5000);
    }

    setupCarousel('.memories-carousel');

    // --- Scroll Reveal Animation for Sections ---
    // (This part is identical to the original script)
    const scrollRevealSections = document.querySelectorAll('.scroll-reveal');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollRevealSections.forEach(section => {
        sectionObserver.observe(section);
    });
});
