let displayValue = '0';
let currentLang = 'en';
let isScientificMode = false;
const display = document.getElementById('display');
const errorToast = document.getElementById('error-toast');

// Calculator functions
function appendToDisplay(value) {
    if (displayValue === '0') displayValue = '';
    displayValue += value;
    updateDisplay();
}

function updateDisplay() {
    display.value = displayValue;
    resizeText();
}

function appendDecimal() {
    if (!displayValue.includes('.')) appendToDisplay('.');
}

function handleParenthesis() {
    const open = (displayValue.match(/\(/g) || []).length;
    const close = (displayValue.match(/\)/g) || []).length;
    appendToDisplay(open <= close ? '(' : ')');
}

function handleDelete() {
    displayValue = displayValue.slice(0, -1) || '0';
    updateDisplay();
}

function calculate() {
    try {
        const expression = displayValue
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/,/g, '.');
        const result = eval(expression);
        displayValue = Number.isFinite(result) ? result.toString() : 'Error';
    } catch {
        displayValue = 'Error';
    }
    updateDisplay();
}

// Theme functions
function toggleTheme() {
    const body = document.body;
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Language functions
function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.style.display = el.getAttribute('data-lang') === lang ? 'inline' : 'none';
    });
    document.getElementById('decimal').textContent = lang === 'de' ? ',' : '.';
    localStorage.setItem('language', lang);
}

// UI functions
function toggleSettings() {
    document.getElementById('settings-menu').classList.toggle('active');
}

function showError(message) {
    errorToast.textContent = message;
    errorToast.style.display = 'block';
    setTimeout(() => errorToast.style.display = 'none', 3000);
}

function resizeText() {
    const length = displayValue.length;
    display.style.fontSize = length > 16 ? '24px' : length > 8 ? '36px' : '48px';
}

// Initialization
function initialize() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLang = localStorage.getItem('language') || 'en';
    document.body.setAttribute('data-theme', savedTheme);
    changeLanguage(savedLang);
}

document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'BUTTON') e.preventDefault();
}, { passive: false });