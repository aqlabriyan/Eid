document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Overlay Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const menuLinks = fullscreenMenu.querySelectorAll('.overlay-nav a');
    // const body = document.body; // Untuk efek blur/scroll lock (optional)

    if (menuToggle && fullscreenMenu && closeMenuBtn) {
        // Buka Menu
        menuToggle.addEventListener('click', () => {
            fullscreenMenu.classList.add('active');
            // Optional: Mencegah scroll body saat menu terbuka
            // body.style.overflow = 'hidden';
        });

        // Tutup Menu (Tombol X)
        closeMenuBtn.addEventListener('click', () => {
            fullscreenMenu.classList.remove('active');
            // Optional: Kembalikan scroll body
            // body.style.overflow = '';
        });

        // Tutup Menu (Klik Link)
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                fullscreenMenu.classList.remove('active');
                // Optional: Kembalikan scroll body
                // body.style.overflow = '';

                // Smooth scroll (jika belum otomatis dari CSS html scroll-behavior)
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                     // event.preventDefault(); // Aktifkan jika link hanya untuk navigasi internal
                     const offsetTop = targetElement.offsetTop - 60; // Sesuaikan offset jika header fixed
                     window.scrollTo({
                         top: offsetTop,
                         behavior: 'smooth'
                     });
                }
            });
        });

         // Optional: Tutup menu jika klik di luar area link (di overlaynya)
         fullscreenMenu.addEventListener('click', (event) => {
             if (event.target === fullscreenMenu) { // Hanya jika klik langsung di overlay
                 fullscreenMenu.classList.remove('active');
                 // body.style.overflow = '';
             }
         });
    }

    // --- Scroll Animation Logic (Lebih Fleksibel) ---
    // Cari semua elemen yang punya kelas dimulai dengan 'scroll-animate-'
    const animatedElements = document.querySelectorAll('[class*="scroll-animate-"]');

    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger saat 15% terlihat
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // Tambah kelas 'visible'
                    observer.unobserve(entry.target); // Stop mengamati setelah animasi
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

        animatedElements.forEach(el => {
            intersectionObserver.observe(el);
        });
    }

     // Optional: Tambah kelas 'scrolled' ke body saat scroll untuk efek header
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 50) { // Jarak scroll sebelum efek aktif
    //         document.body.classList.add('scrolled');
    //     } else {
    //         document.body.classList.remove('scrolled');
    //     }
    // });

});