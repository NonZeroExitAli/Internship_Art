document.addEventListener('DOMContentLoaded', () => {
    // --- Global Background Music Logic ---
    const globalBgMusic = document.getElementById('global-bg-music');
    const musicToggleButton = document.getElementById('music-toggle');
    let isMusicPlaying = true;

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
        isMusicPlaying ? globalBgMusic.pause() : globalBgMusic.play().catch(e => {});
        isMusicPlaying = !isMusicPlaying;
        updateMusicToggleButton();
    });
    globalBgMusic.addEventListener('play', updateMusicToggleButton);
    globalBgMusic.addEventListener('pause', updateMusicToggleButton);
    updateMusicToggleButton();

    // --- Celebration Overlay & Balloons Logic ---
    const celebrationOverlay = document.getElementById('celebration-overlay');
    if (celebrationOverlay) {
        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.left = `${Math.random() * 100}vw`;
            const duration = 10 + Math.random() * 10;
            const delay = Math.random() * 3;
            balloon.style.animation = `balloon-rise ${duration}s linear ${delay}s forwards`;
            celebrationOverlay.appendChild(balloon);
            setTimeout(() => balloon.remove(), (delay + duration) * 1000);
        }
        for (let i = 0; i < 15; i++) createBalloon(); // 15 balloons is good for mobile

        setTimeout(() => {
            celebrationOverlay.classList.add('fade-out');
            globalBgMusic.play().catch(e => {});
            updateMusicToggleButton();
        }, 4000);
        setTimeout(() => celebrationOverlay.remove(), 5500);
    } else {
        globalBgMusic.play().catch(e => {});
        updateMusicToggleButton();
    }

    // --- Carousel Function ---
    function setupCarousel(carouselSelector) {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return;
        const items = carousel.querySelectorAll('img');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentItemIndex = 0;

        function showItem(index) {
            items.forEach((item, i) => item.classList.remove('active'));
            items[index].classList.add('active');
        }
        showItem(currentItemIndex);
        prevBtn.addEventListener('click', () => {
            currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
            showItem(currentItemIndex);
        });
        nextBtn.addEventListener('click', () => {
            currentItemIndex = (currentItemIndex + 1) % items.length;
            showItem(currentItemIndex);
        });
        setInterval(() => nextBtn.click(), 5000);
    }
    setupCarousel('.memories-carousel');

    // --- Scroll Reveal Animation ---
    const scrollRevealSections = document.querySelectorAll('.scroll-reveal');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    scrollRevealSections.forEach(section => sectionObserver.observe(section));
});
