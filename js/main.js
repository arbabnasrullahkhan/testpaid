document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Remove Skeleton Loader
    // Simulates a 1-second load, then reveals the content
    setTimeout(() => {
        document.body.classList.remove('loading');
        
        // Mobile Logic: Scroll to Center Pricing Card
        if(window.innerWidth <= 768) {
            const pricingGrid = document.querySelector('.pricing-grid');
            const popularCard = document.querySelector('.price-card.popular');
            if(pricingGrid && popularCard) {
                // Calculate position to center the popular card
                const scrollLeft = popularCard.offsetLeft - (window.innerWidth / 2) + (popularCard.offsetWidth / 2);
                pricingGrid.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    }, 1000);

    // 2. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progressBar').style.width = scrolled + "%";
    });

    // 3. Scroll Reveal Animation (Fade Up)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));

    // 4. Countdown Timer logic
    const timerEl = document.getElementById('countdown-timer');
    if(timerEl) {
        let time = 8100; // 2h 15m
        setInterval(() => {
            let h = Math.floor(time / 3600);
            let m = Math.floor((time % 3600) / 60);
            let s = time % 60;
            timerEl.innerText = `${h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
            if(time > 0) time--;
        }, 1000);
    }

    // 5. Pricing Toggle (Animation + Data Switch)
    const toggle = document.getElementById('pricing-toggle-checkbox');
    const amounts = document.querySelectorAll('.amount');
    
    if(toggle) {
        toggle.addEventListener('change', () => {
            amounts.forEach(amt => {
                // Switch between data-monthly and data-quarterly
                const val = toggle.checked ? amt.dataset.quarterly : amt.dataset.monthly;
                
                // Animate text change
                amt.style.opacity = 0;
                setTimeout(() => {
                    amt.innerText = val;
                    amt.style.opacity = 1;
                }, 200);
            });
        });
    }

    // 6. FAQ Accordion Logic (Fixed Animation)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Close others if you want only one open at a time (Optional)
            // document.querySelectorAll('.accordion-item').forEach(i => {
            //     if(i !== item) i.classList.remove('active');
            // });

            item.classList.toggle('active');
        });
    });

    // 7. Dark Mode Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
        
        // Check saved preference
        if(localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    // 8. ROI Calculator Logic
    const calcInputs = document.querySelectorAll('.calc-inputs input');
    if(calcInputs.length > 0) {
        calcInputs.forEach(input => input.addEventListener('input', () => {
            const traffic = document.getElementById('calc-traffic').value;
            const conv = document.getElementById('calc-conv').value;
            const val = document.getElementById('calc-val').value;
            
            const total = (traffic * (conv / 100)) * val;
            document.getElementById('calc-total').innerText = '$' + Math.floor(total).toLocaleString();
        }));
    }
});