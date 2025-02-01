// Display Logic
const display = document.getElementById('display');

function appendToDisplay(value) {
    if (display.value.length < 32) {
        display.value += value;
        resizeText();
    }
}

function clearDisplay() {
    display.value = '';
    resizeText();
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    resizeText();
}

function calculate() {
    try {
        const expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        display.value = eval(expression);
    } catch (e) {
        display.value = 'Error';
    }
    resizeText();
}

// Text Resizing
function resizeText() {
    const length = display.value.length;
    if (length > 16) display.style.fontSize = '24px';
    else if (length > 8) display.style.fontSize = '36px';
    else display.style.fontSize = '48px';
}

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    body.setAttribute('data-theme', 
        body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    themeIcon.classList.toggle('fa-sun');
    themeIcon.classList.toggle('fa-moon');
}

// Language Settings (Example: Decimal Separator)
function changeLanguage(lang) {
    const decimalBtn = document.getElementById('decimal');
    decimalBtn.textContent = lang === 'de' ? ',' : '.';
}

// Settings Modal
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// Initialize
document.body.setAttribute('data-theme', 'light');