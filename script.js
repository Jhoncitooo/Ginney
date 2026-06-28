document.addEventListener("DOMContentLoaded", () => {
    const particlesContainer = document.getElementById("particlesContainer");
    const musicToggle = document.getElementById("musicToggle");
    const bgMusic = document.getElementById("bgMusic");
    const btnYes = document.getElementById("btnYes");
    const btnNo = document.getElementById("btnNo");
    const invitationCard = document.getElementById("invitationCard");
    const successCard = document.getElementById("successCard");
    const confettiContainer = document.getElementById("confettiContainer");

    // 1. Create Floating Bokeh/Bubbles Background (Beautiful but not too romantic)
    const createBubble = () => {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble-particle");
        
        // Random style details
        const size = Math.random() * 40 + 15; // 15px to 55px
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 6 + 6; // 6s to 12s
        const delay = Math.random() * 3;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
        
        // Random pastel colors for orbs
        const colors = [
            "rgba(255, 107, 139, 0.15)", // Soft Pink
            "rgba(139, 108, 255, 0.15)", // Soft Lavender
            "rgba(72, 219, 251, 0.15)",  // Soft Cyan
            "rgba(255, 238, 242, 0.2)",  // Pale rose
            "rgba(255, 255, 255, 0.35)"   // White orb
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        bubble.style.background = `radial-gradient(circle, ${randomColor} 0%, rgba(255,255,255,0) 70%)`;
        
        particlesContainer.appendChild(bubble);

        // Remove element after animation completes
        setTimeout(() => {
            bubble.remove();
        }, (duration + delay) * 1000);
    };

    // Generate initial bubbles and start loop
    for (let i = 0; i < 15; i++) {
        setTimeout(createBubble, Math.random() * 3000);
    }
    setInterval(createBubble, 1000);

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

    // 3. Dodge Game for "No" Button (Restricted to Card Bounds so it doesn't get lost)
    const dodgeButton = () => {
        // Change position style to absolute relative to invitationCard
        btnNo.style.position = "absolute";
        btnNo.style.zIndex = "99";

        const cardWidth = invitationCard.offsetWidth;
        const cardHeight = invitationCard.offsetHeight;
        const btnWidth = btnNo.offsetWidth;
        const btnHeight = btnNo.offsetHeight;
        
        // Calculate safe boundaries within the card
        const padding = 20;
        const maxX = cardWidth - btnWidth - padding;
        const maxY = cardHeight - btnHeight - padding;
        
        let newX = Math.random() * (maxX - padding) + padding;
        let newY = Math.random() * (maxY - padding) + padding;

        // Ensure it doesn't position at negative space
        newX = Math.max(padding, newX);
        newY = Math.max(padding, newY);

        // Update positions relative to the card
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
