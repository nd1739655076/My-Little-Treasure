document.addEventListener('DOMContentLoaded', () => {
    const greetingBar = document.getElementById('greeting-bar');
    var username = localStorage.getItem('username');
    const hours = new Date().getHours();
    let greeting;

    if (6 < hours < 12) greeting = 'Good Morning🌞, My Little Treasure';
    else if (12 < hours < 18) greeting = 'Good Afternoon☕️, My Little Treasure';
    else if (18 < hours < 22) greeting = 'Good Evening✨, My Little Treasure';
    else greeting = 'Good Night🌛, My Little Treasure';
    
    greetingBar.textContent = `${greeting} ${username}`;

    // Function to create tooltip element
    function createTooltip(text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.position = 'absolute';
        tooltip.style.visibility = 'hidden';
        tooltip.style.backgroundColor = '#8076a3';
        tooltip.style.color = 'white';
        tooltip.style.textAlign = 'center';
        tooltip.style.borderRadius = '6px';
        tooltip.style.padding = '5px';
        tooltip.style.zIndex = '10';
        tooltip.style.bottom = '100%'; // Adjust as needed
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.transition = 'visibility 0.3s, opacity 0.3s ease';
        tooltip.style.opacity = '0';
        return tooltip;
    }

    // Attach tooltips to button cards
    const cards = document.querySelectorAll('.button-card');
    cards.forEach(card => {
        const tooltipText = card.getAttribute('data-tooltip');
        if (tooltipText) {
            const tooltip = createTooltip(tooltipText);
            card.appendChild(tooltip);
            card.addEventListener('mouseover', () => {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
            });
            card.addEventListener('mouseout', () => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            });
        }
        card.addEventListener('click', () => {
            const page = card.getAttribute('data-page'); // 使用data-page属性指定URL
            if (page) {
                window.location.href = page; // 导航到指定页面
            }
        });
    });
});
