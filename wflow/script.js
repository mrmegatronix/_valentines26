document.addEventListener('DOMContentLoaded', () => {
    // Task management logic
    const taskItems = document.querySelectorAll('.task-item input');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentText = document.getElementById('progress-percent');

    function updateProgress() {
        const total = taskItems.length;
        const checked = document.querySelectorAll('.task-item input:checked').length;
        const percentage = Math.round((checked / total) * 100);
        
        progressFill.style.width = `${percentage}%`;
        progressPercentText.textContent = `${percentage}%`;

        // Add/remove completed class for styling
        taskItems.forEach(input => {
            const item = input.closest('.task-item');
            if (input.checked) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
        });
    }

    taskItems.forEach(input => {
        input.addEventListener('change', updateProgress);
    });

    // Initial progress update
    updateProgress();

    // Chat handover logic
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatContainer = document.querySelector('.chat-container');

    function sendMessage() {
        const msg = chatInput.value.trim();
        if (msg) {
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble sent';
            bubble.innerHTML = `<p>${msg}</p>`;
            chatContainer.appendChild(bubble);
            chatInput.value = '';
            
            // Auto-scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;

            // Optional: Simulate a quick auto-response for "wow" factor
            if (msg.toLowerCase().includes('pos')) {
                setTimeout(() => {
                    simulateReply('AM Manager', 'I just checked the server logs, Station 2 seems to have a memory leak. Restarting it now.', 'c7d2fe', '3730a3');
                }, 1500);
            }
        }
    }

    function simulateReply(name, text, bg, color) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble received';
        bubble.innerHTML = `
            <div class="chat-meta">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=24&background=${bg}&color=${color}" alt="">
                <span>${name}</span>
            </div>
            <p>${text}</p>
        `;
        chatContainer.appendChild(bubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Notification button interaction
    const notifBtn = document.getElementById('notif-btn');
    notifBtn.addEventListener('click', () => {
        alert('Operational Alert: Low inventory detected for "Premium Gin". Emergency order required.');
    });

    // Simple interaction for cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add a subtle flare effect or similar if needed
        });
    });
});
