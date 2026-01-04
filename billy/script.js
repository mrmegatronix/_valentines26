function createConfetti() {
    const isLogo = Math.random() > 0.7; // 30% chance for logo
    const confetti = document.createElement('div');

    if (isLogo) {
        confetti.classList.add('logo-confetti');
        confetti.style.backgroundImage = "url('logo.png')";
        const size = Math.random() * 20 + 30; // 30px to 50px
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
    } else {
        confetti.classList.add('heart-confetti');
        confetti.innerHTML = '❤';
        const size = Math.random() * 1 + 0.5; // 0.5rem to 1.5rem
        confetti.style.fontSize = size + 'rem';
        const colors = ['#ff69b4', '#ff1493', '#db7093', '#ffc0cb'];
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
    }

    // Randomize position
    confetti.style.left = Math.random() * 100 + 'vw';

    // Randomize animation duration (slow falling)
    const duration = Math.random() * 10 + 10; // 10 to 20 seconds
    confetti.style.animationDuration = duration + 's';

    document.getElementById('confetti-container').appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
        confetti.remove();
    }, duration * 1000);
}

// Create a new piece of confetti every 100ms
setInterval(createConfetti, 100);
