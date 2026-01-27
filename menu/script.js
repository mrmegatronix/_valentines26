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
        textColor: '#ffffff',
        fontSize: '12vh', // Boosted from 8vh
        color: '#ff3366', // Default Heart Color
        enlarged: false,
        compact: false, // Normal text
        hideFooter: false,
        duration: 120000 // 2 minutes
    },
    {
        // Msg 2: Starter (Index 1)
        text: `
        <p style="margin-bottom: 0.5em;">Valentine's Day Set Menu</p>
        <p style="text-decoration: underline;">Starter</p>
        <br>
        <p>SHARING PLATE:</p>
        <p>Crumbed Camembert w. Plum Sauce,</p>
        <p>Chicken Poppers w. Sriracha Aioli</p>
        <p>& Cauli-bites w. Hot Honey.</p>
        `,
        textColor: '#ffffff',
        fontSize: '8vh', // Switched to vh for better TV scaling
        color: 'rgba(255, 0, 0, 0.5)', // Red 50%
        enlarged: true,
        compact: true,
        hideFooter: true,
        duration: 30000 // 30s
    },
    {
        // Msg 3: Main (Index 2)
        text: `
        <p style="text-decoration: underline;">Main Course</p>
        <p style="margin-bottom: 0.5em;">Select One Each</p>
        <p>· Sirloin Medium Rare w. Veg & Red Wine Jus.</p>
        <p>· Ooh La La Chicken w. Pumpkin Mash & Greens.</p>
        <p>· Salmon w. Veg, Salad & Lemon Mustard Sauce.</p>
        <p>· Pumpkin, Spinach, Feta Filo Parcel w. Salad.</p>
        `,
        textColor: '#ffffff',
        fontSize: '6vh', // Switched to vh for better TV scaling
        color: 'rgba(170, 0, 255, 0.5)', // Purple 50%
        enlarged: true,
        compact: true,
        hideFooter: true,
        duration: 30000 // 30s
    },
    {
        // Msg 4: Dessert (Index 3)
        text: `
        <p style="text-decoration: underline;">Desserts</p>
        <br>
        <p>Shared Plate:</p>
        <p>Chocolate Cheesecake, Apple Shortcake,</p>
        <p>Berries, Cream & Berry Sorbet.</p>
        `,
        textColor: '#ffffff',
        fontSize: '8vh', // Switched to vh for better TV scaling
        color: 'rgba(0, 102, 255, 0.5)', // Blue 50%
        enlarged: true,
        compact: true,
        hideFooter: true,
        duration: 30000 // 30s
    },
    {
        // Msg 5a: Poem Part 1 (Index 4)
        text: `
        <p>Valentine's Day</p>
        <p>Set Menu</p>
        <p>Our Special Menu</p>
        <p>Just for Two</p>
        `,
        textColor: '#ffffff',
        fontSize: '10vh',
        color: 'rgba(255, 20, 147, 0.5)', // Deep Pink 50%
        enlarged: true,
        compact: true,
        hideFooter: true,
        duration: 30000 // 30s
    },
    {
        // Msg 5b: Poem Part 2 (Index 5)
        text: `
        <p>Yes You!</p>
        <p>You and Boo</p>
        <p>Should Come Too,</p>
        <p>Book Now</p>
        <p>For Your Table</p>
        <p>of Two!</p>
        `,
        textColor: '#ffffff',
        fontSize: '10vh',
        color: 'rgba(255, 20, 147, 0.5)', // Deep Pink 50%
        enlarged: true,
        compact: true,
        hideFooter: true,
        duration: 30000 // 30s
    },
    {
        // Msg 6: Contact & QR (Index 6)
        text: `
        <p>Ring us: 352 0102</p>
        <p>It's Only $90 FOR TWO</p>
        <div id="qr-placeholder" style="margin-top: 1vh; display: flex; flex-direction: column; align-items: center;">
           <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fbookings.nowbookit.com%2F%3Faccountid%3Dd7034cd3-cfde-4556-a98c-ea943ec35ef4%26venueid%3D13703%26theme%3Ddark%26colors%3Dhex%2Cff2d6f%26date%3D2026-02-14%26serviceids%3Devent" alt="Scan to Book" style="border: 2px solid white; border-radius: 10px; width: 35vh; height: 35vh;">
        </div>
        `,
        textColor: '#ffffff',
        fontSize: '8vh', 
        color: '#ff3366', // Default
        enlarged: false, 
        compact: true, 
        hideFooter: false,
        duration: 240000 // 4 minutes
    }
];

let currentMessageIndex = 0;
const messageContainer = document.querySelector('.message');
const progressBar = document.querySelector('.progress-bar');
const heartContainer = document.querySelector('.heart-container');
const heartShape = document.querySelector('.heart');
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

function adjustFontSize(element, startSize) {
    // Force the start size
    element.style.fontSize = startSize;
    
    // Use a small timeout to let the browser compute the layout
    setTimeout(() => {
        let size = parseFloat(startSize);
        let unit = startSize.replace(/[0-9.]/g, '');
        let attempts = 0;
        
        // Define limits - use viewport as fallback if element is weird
        const maxH = element.clientHeight || window.innerHeight * 0.7;
        const maxW = element.clientWidth || window.innerWidth * 0.95;

        // Ensure we don't shrink too much. Minimum font size for TV
        const minSize = unit === 'vh' ? 5 : 4; // 5vh or 4rem/em floor for "Massive" requirement

        while (attempts < 40) {
            const currentH = element.scrollHeight;
            const currentW = element.scrollWidth;
            
            if (currentH <= maxH && currentW <= maxW) break;
            
            size *= 0.95;
            if (size < minSize) {
                size = minSize;
                element.style.fontSize = size + unit;
                break;
            }
            
            element.style.fontSize = size + unit;
            attempts++;
        }
    }, 100);
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

    // Toggle Text Size / Compact Class
    if (config.compact) {
        messageContainer.classList.add('compact');
    } else {
        messageContainer.classList.remove('compact');
    }

    // Toggle Footer Visibility
    // User requested Footer ONLY on Msg 1 and Last (Msg 7)
    const isFirstOrLast = (index === 0 || index === messagesConfig.length - 1);
    if (!isFirstOrLast) {
        bottomMessage.classList.add('hidden');
    } else {
        bottomMessage.classList.remove('hidden');
    }

    // Apply specific Font Styling
    messageContainer.style.color = config.textColor || '';
    
    // Toggle White Text Class (Legacy, config.textColor takes precedence now but good for shadow)
    if (config.textColor === '#ffffff') {
        messageContainer.classList.add('white-text');
    } else {
        messageContainer.classList.remove('white-text');
    }

    // Prepare message
    messageContainer.innerHTML = wrapWords(config.text);
    
    // Reveal words nicely slow if text exists
    const words = messageContainer.querySelectorAll('.word');
    words.forEach((word, i) => {
        setTimeout(() => {
            word.classList.add('visible');
            word.style.opacity = '1';
            word.style.color = '#ffffff';
        }, i * 300); // Faster reveal for readability
    });

    // Adjust font size to prevent clipping
    // Wait a bit for the rendering to stabilize
    setTimeout(() => {
        adjustFontSize(messageContainer, config.fontSize || '8vh');
    }, 50);

    // Heart Visibility Logic:
    // Visible on First (Index 0) and Last (Index length-1)
    // Hidden on everything in between (Msg 2-6)
    const lastIndex = messagesConfig.length - 1;
    if (index === 0 || index === lastIndex) {
        heartContainer.classList.remove('hidden-heart');
    } else {
        heartContainer.classList.add('hidden-heart');
    }

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

