// Display Logic
let isResultDisplayed = false;
const display = document.getElementById('display');

// Input Validation
const isValidInput = (value) => /^[0-9+\-*/().]$/.test(value);

// Append Characters
function appendToDisplay(value) {
    if (!isValidInput(value)) return;
    
    const current = display.value;
    const lastChar = current.slice(-1);
    const operators = ['+', '-', '*', '/', '.'];

    // Block invalid sequences
    if (operators.includes(value) && operators.includes(lastChar)) return;
    if (value === '.' && current.split('.').length > (current.match(/\d+\.\d+/g)?.length || 0) + 1) return;

    // Reset display after result
    if (isResultDisplayed && !isNaN(value)) {
        display.value = '';
        isResultDisplayed = false;
    }

    display.value += value;
    resizeText();
}

// Delete/AC Logic
function handleDelete() {
    if (isResultDisplayed) {
        display.value = '';
        isResultDisplayed = false;
    } else {
        display.value = display.value.slice(0, -1);
    }
    resizeText();
}

// Parentheses Logic
function appendParenthesis() {
    const open = (display.value.match(/\(/g) || []).length;
    const close = (display.value.match(/\)/g) || []).length;
    appendToDisplay(open <= close ? '(' : ')');
}

// Calculation
function calculate() {
    try {
        const expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        display.value = eval(expression);
        isResultDisplayed = true;
    } catch (e) {
        showError('Invalid expression');
    }
    resizeText();
}

// Text Resizing
function resizeText() {
    const length = display.value.length;
    display.style.fontSize = length > 16 ? '24px' : length > 8 ? '36px' : '48px';
}

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', theme);
    document.querySelector('.theme-toggle i').className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Language Settings
function changeLanguage(lang) {
    const decimalBtn = document.getElementById('decimal');
    decimalBtn.textContent = lang === 'de' ? ',' : '.';
    document.getElementById('settings-title').textContent = lang === 'de' ? 'Einstellungen' : 'Settings';
    document.querySelectorAll('[data-lang]').forEach(el => el.textContent = el.getAttribute(`data-lang-${lang}`));
    document.getElementById('en-check').style.display = lang === 'en' ? 'inline' : 'none';
    document.getElementById('de-check').style.display = lang === 'de' ? 'inline' : 'none';
}

// Settings Menu Toggle
function toggleMenu() {
    document.getElementById('settings-modal').classList.toggle('active');
}

// Error Handling
function showError(message) {
    const toast = document.getElementById('error-toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const settingsModal = document.getElementById('settings-modal');
    if (!e.target.closest('.settings-modal') && !e.target.closest('.settings-button')) {
        settingsModal.classList.remove('active');
    }
});

// Initialize
document.body.setAttribute('data-theme', 'light');
changeLanguage('en');