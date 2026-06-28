document.addEventListener("DOMContentLoaded", () => {
    const heartsContainer = document.getElementById("heartsContainer");
    const musicToggle = document.getElementById("musicToggle");
    const bgMusic = document.getElementById("bgMusic");
    const btnYes = document.getElementById("btnYes");
    const btnNo = document.getElementById("btnNo");
    const invitationCard = document.getElementById("invitationCard");
    const successCard = document.getElementById("successCard");
    const confettiContainer = document.getElementById("confettiContainer");

    // 1. Create Floating Hearts Background
    const createHeart = () => {
        const heart = document.createElement("i");
        heart.classList.add("fas", "fa-heart", "heart-particle");
        
        // Random style details
        const size = Math.random() * 20 + 10; // 10px to 30px
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 4 + 4; // 4s to 8s
        const delay = Math.random() * 2;
        
        heart.style.fontSize = `${size}px`;
        heart.style.left = `${left}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        // Random opacity & color tint
        const hue = Math.random() * 30 + 340; // Pink shades (340 to 10)
        heart.style.color = `hsl(${hue}, 100%, 75%)`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;

        heartsContainer.appendChild(heart);

        // Remove element after animation completes
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    };

    // Generate initial hearts and start loop
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, Math.random() * 3000);
    }
    setInterval(createHeart, 800);

    // 2. Play/Pause Background Music
    let isPlaying = false;
    musicToggle.addEventListener("click", () => {
        toggleMusic();
    });

    const toggleMusic = () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove("playing");
        } else {
            bgMusic.play().then(() => {
                musicToggle.classList.add("playing");
            }).catch(err => {
                console.log("Autoplay blocked or audio failed to load: ", err);
            });
        }
        isPlaying = !isPlaying;
    };

    // 3. Dodge Game for "No" Button
    const dodgeButton = () => {
        // Change position style to fixed to allow positioning anywhere in viewport
        btnNo.style.position = "fixed";
        btnNo.style.zIndex = "999";

        const btnWidth = btnNo.offsetWidth;
        const btnHeight = btnNo.offsetHeight;
        
        // Calculate safe boundaries
        const maxX = window.innerWidth - btnWidth - 20;
        const maxY = window.innerHeight - btnHeight - 20;
        
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        // Make sure it doesn't position at negative space
        newX = Math.max(10, newX);
        newY = Math.max(10, newY);

        // Update positions
        btnNo.style.left = `${newX}px`;
        btnNo.style.top = `${newY}px`;
    };

    // Dodge on mouse hover & mobile touch
    btnNo.addEventListener("mouseover", dodgeButton);
    btnNo.addEventListener("mouseenter", dodgeButton);
    btnNo.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent default touch action
        dodgeButton();
    });

    // 4. Success Actions for "Yes" Button
    btnYes.addEventListener("click", () => {
        // Hide invitation card, show success card
        invitationCard.classList.add("hidden");
        successCard.classList.remove("hidden");

        // Automatically start music if not playing yet
        if (!isPlaying) {
            toggleMusic();
        }

        // Fire confetti explosion
        createConfettiBurst();
    });

    // 5. Confetti Burst Function
    const createConfettiBurst = () => {
        const colors = [
            "#ff6b8b", "#ff8da5", "#8b6cff", "#ffc0cb", 
            "#ffd700", "#48dbfb", "#1dd1a1", "#ff9ff3"
        ];
        
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement("div");
            particle.classList.add("confetti-particle");
            
            // Random styling
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const size = Math.random() * 8 + 6; // 6px to 14px
            const rotation = Math.random() * 360;
            const duration = Math.random() * 2.5 + 1.5; // 1.5s to 4s
            
            particle.style.background = color;
            particle.style.left = `${left}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.transform = `rotate(${rotation}deg)`;
            particle.style.animationDuration = `${duration}s`;
            
            // Random shapes
            if (Math.random() > 0.5) {
                particle.style.borderRadius = "50%";
            }

            confettiContainer.appendChild(particle);

            // Clean up
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }
    };
});
