// Digital Signage Dashboard Logic

// --- Clock Logic ---
function updateClock() {
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');

    const now = new Date();

    // Format Time: HH:MM
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;

    // Format Date: DAY, MONTH DD, YYYY
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    dateElement.textContent = dateStr;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call


// --- Slideshow Logic ---
const slidesData = [
    {
        title: "Company Update",
        content: "Q3 objectives are fully aligned with our new <span class='highlight-text'>brand guidelines</span>. Thank you to all departments for a smooth transition.",
    },
    {
        title: "Security Notice",
        content: "Reminder: Scheduled maintenance on the primary database will occur this <span class='highlight-text'>Friday at 02:00 AM EST</span>. Expect minimal downtime.",
    },
    {
        title: "Welcome New Hires",
        content: "Please join us in welcoming the new <span class='highlight-text'>Engineering Cohort</span> starting this week in the West Wing.",
    },
    {
        title: "Innovation Metrics",
        content: "Our new automated deployment pipeline has reduced standard release times by <span class='highlight-text'>over 45%</span>.",
    }
];

const SLIDE_DURATION = 10000; // 10 seconds per slide

function initSlideshow() {
    const slideshowContainer = document.getElementById('slideshow');
    const indicatorsContainer = document.getElementById('slide-indicators');

    // Create slide elements
    slidesData.forEach((slide, index) => {
        // Slide DOM
        const slideEl = document.createElement('div');
        slideEl.className = `slide ${index === 0 ? 'active' : ''}`;
        slideEl.innerHTML = `
            <h2>${slide.title}</h2>
            <p>${slide.content}</p>
        `;
        slideshowContainer.appendChild(slideEl);

        // Indicator DOM
        const indicatorEl = document.createElement('div');
        indicatorEl.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicatorsContainer.appendChild(indicatorEl);
    });

    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    function nextSlide() {
        // Remove active class from current
        slides[currentIndex].classList.remove('active');

        // We need to re-trigger the animation on the indicator,
        // so we remove the node and re-insert it, or just toggle classes carefully.
        const currentIndicator = indicators[currentIndex];
        currentIndicator.classList.remove('active');
        void currentIndicator.offsetWidth; // Trigger reflow to restart CSS animation if we re-add

        // Increment index
        currentIndex = (currentIndex + 1) % slides.length;

        // Add active class to new
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    setInterval(nextSlide, SLIDE_DURATION);
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    animateCharts();
});


// --- Chart Animation Logic ---
function animateCharts() {
    // Randomly shift chart bar heights every 5 seconds to simulate live data
    const bars = document.querySelectorAll('.bar');

    setInterval(() => {
        bars.forEach(bar => {
            const randomHeight = Math.floor(Math.random() * 60) + 30; // 30% to 90%
            bar.style.height = `${randomHeight}%`;
        });
    }, 5000);
}

// --- Background Particles ---
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = '#00b7af';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px #00b7af';
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Simple drifting animation via CSS transition mapped in JS
        container.appendChild(particle);

        animateParticle(particle);
    }
}

function animateParticle(particle) {
    const duration = Math.random() * 10000 + 10000; // 10-20s

    particle.animate([
        { transform: 'translate(0, 0)', opacity: particle.style.opacity },
        {
            transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px)`,
            opacity: Math.random() * 0.5 + 0.1
        }
    ], {
        duration: duration,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
}

createParticles();