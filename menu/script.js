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

// --- Message Cycling & Animation Logic ---

const messagesConfig = [
    {
        // Msg 1: Default Poem (Index 0)
        text: `
        <p>Roses are Red &</p>
        <p>Violets are Blue,</p>
        <p>Have you booked</p>
        <p>Your table for</p>
        <p>Two?</p>
        `,
        color: '#ff3366', // Default
        enlarged: false,
        compact: false, // Large text
        hideFooter: false,
        duration: 20000 // 20s default
    },
    {
        // Msg 2: Starter (Index 1)
        text: `
        <p style="font-size: 1.5em; margin-bottom: 0.5em;">Valentine's Day Set Menu</p>
        <p style="font-size: 1.3em; text-decoration: underline;">Starter</p>
        <br>
        <p>SHARING PLATE:</p>
        <p>Crumbed Camembert w. Plum Sauce,</p>
        <p>Chicken Poppers w. Sriracha Aioli</p>
        <p>& Cauli-bites w. Hot Honey</p>
        `,
        color: 'rgba(255, 0, 0, 0.5)', // Red 50%
        enlarged: true,
        compact: true,
        hideFooter: true,
        duration: 20000
    },
    {
        // Msg 3: Main (Index 2)
        text: `
        <p style="font-size: 1.3em; text-decoration: underline;">Main Course</p>
        <p style="font-size: 0.8em; margin-bottom: 0.5em;">Select One Each</p>
        <p>· Sirloin Medium Rare w.</p>
        <p>Veg & Red Wine Jus</p>
        <p>· Ooh La La Chicken w.</p>
        <p>Pumpkin Mash & Greens</p>
        <p>· Salmon w. Veg, Salad</p>
        <p>& Lemon Mustard Sauce</p>
        <p>· Pumpkin, Spinach, Feta</p>
        <p>Filo Parcel w. Salad</p>
        `,
        color: 'rgba(170, 0, 255, 0.5)', // Purple 50%
        enlarged: true,
        compact: true,
        hideFooter: true,
        duration: 20000
    },
    {
        // Msg 4: Dessert (Index 3)
        text: `
        <p style="font-size: 1.5em; text-decoration: underline;">Desserts</p>
        <br>
        <p>Sharing Dessert:</p>
        <p>Chocolate Cheesecake,</p>
        <p>Apple Shortcake,</p>
        <p>Berries, Cream</p>
        <p>and Berry Sorbet</p>
        `,
        color: 'rgba(0, 102, 255, 0.5)', // Blue 50%
        enlarged: true,
        compact: true,
        hideFooter: true,
        duration: 20000
    },
    {
        // Msg 5: Poems (Index 4)
        text: `
        <p>Valentine's Day</p>
        <p>Set Menu</p>
        <p>Our</p>
        <p>Special Menu</p>
        <p>Just for Two</p>
        <p>Yes You!</p>
        <p>You and Boo</p>
        <p>Should Come Too,</p>
        <p>Book Now</p>
        <p>For Your Table</p>
        <p>of Two!</p>
        `,
        color: 'rgba(255, 20, 147, 0.5)', // Deep Pink 50%
        enlarged: true,
        compact: true,
        hideFooter: true,
        duration: 20000
    },
    {
        // Msg 6: Contact & QR (Index 5)
        text: `
        <p>Ring us on:</p>
        <p>Three Five Two</p>
        <p>Oh One Oh Two</p>
        <p>Ask for</p>
        <p>A Table of Two...</p>
        <p>And we'll see you soon!</p>
        <p>Because....</p>
        <p>It's Only</p>
        <p>$90 FOR TWO</p>
        <br>
        <div id="qr-placeholder" style="margin-top: 10px;">
           <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com" alt="Scan to Book" style="border: 2px solid white; border-radius: 10px;">
           <p style="font-size: 0.5em; margin-top: 5px;">Scan to Book</p>
        </div>
        `,
        color: '#ff3366', // Default
        enlarged: false, 
        compact: true, 
        hideFooter: false,
        duration: 120000 // 2 minutes
    }
];

let currentMessageIndex = 0;
const messageContainer = document.querySelector('.message');
const progressBar = document.querySelector('.progress-bar');
const heartContainer = document.querySelector('.heart-container');
const root = document.documentElement;
const bottomMessage = document.querySelector('.bottom-message');

let cycleTimeout;

function wrapWords(htmlString) {
    if (!htmlString) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    
    // If empty text, return empty
    if (!tempDiv.innerText.trim() && !tempDiv.querySelector('img')) return '';

    const walk = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null, false);
    let node;
    const textNodes = [];
    while (node = walk.nextNode()) {
        textNodes.push(node);
    }

    for (const textNode of textNodes) {
        let textContent = textNode.nodeValue;
        const words = textContent.split(/(\s+)/); 
        
        const fragment = document.createDocumentFragment();
        words.forEach(word => {
            if (word.trim().length === 0) {
                 fragment.appendChild(document.createTextNode(word));
            } else {
                const span = document.createElement('span');
                span.textContent = word;
                span.className = 'word';
                fragment.appendChild(span);
            }
        });
        textNode.parentNode.replaceChild(fragment, textNode);
    }
    
    return tempDiv.innerHTML;
}

function displayMessage(index) {
    // Clear existing timeout to prevent overlap
    if (cycleTimeout) clearTimeout(cycleTimeout);

    const config = messagesConfig[index];
    const duration = config.duration || 20000; // Fallback 20s

    // Reset progress bar
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    void progressBar.offsetWidth; 
    progressBar.style.transition = `width ${duration}ms linear`;
    progressBar.style.width = '100%';

    // Update Heart Style
    root.style.setProperty('--heart-color', config.color);
    
    // Toggle Heart Size
    if (config.enlarged) {
        heartContainer.classList.add('enlarged');
    } else {
        heartContainer.classList.remove('enlarged');
    }

    // Toggle Text Size
    // If text is empty, ensure container is cleared
    if (config.compact) {
        messageContainer.classList.add('compact');
    } else {
        messageContainer.classList.remove('compact');
    }

    // Toggle Footer Visibility
    if (config.hideFooter) {
        bottomMessage.classList.add('hidden');
    } else {
        bottomMessage.classList.remove('hidden');
    }

    // Prepare message
    messageContainer.innerHTML = wrapWords(config.text);
    
    // Reveal words nicely slow if text exists
    const words = messageContainer.querySelectorAll('.word');
    words.forEach((word, i) => {
        setTimeout(() => {
            word.classList.add('visible');
        }, i * 600); 
    });

    // Schedule next message
    cycleTimeout = setTimeout(nextMessage, duration);
}

function nextMessage() {
    currentMessageIndex = (currentMessageIndex + 1) % messagesConfig.length;
    displayMessage(currentMessageIndex);
}

function prevMessage() {
    currentMessageIndex = (currentMessageIndex - 1 + messagesConfig.length) % messagesConfig.length;
    displayMessage(currentMessageIndex);
}

// Initial Call
displayMessage(currentMessageIndex);
