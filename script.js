// Calculator Logic
function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (display.value.length < 32) {
        display.value += value;
        resizeText();
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
    resizeText();
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
    resizeText();
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/'));
    } catch (e) {
        display.value = 'Error';
    }
    resizeText();
}

// Resize Text
function resizeText() {
    const display = document.getElementById('display');
    const length = display.value.length;
    if (length > 16) {
        display.style.fontSize = '24px';
    } else if (length > 8) {
        display.style.fontSize = '36px';
    } else {
        display.style.fontSize = '48px';
    }
}

// Settings Modal
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// Language Change
function changeLanguage(lang) {
    const decimalButton = document.getElementById('decimal');
    if (lang === 'de') {
        decimalButton.textContent = ',';
    } else {
        decimalButton.textContent = '.';
    }
}

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
}

// Initialize
document.body.setAttribute('data-theme', 'light');