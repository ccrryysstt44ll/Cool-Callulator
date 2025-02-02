// State Management
let currentLang = 'en';
let lastCalculation = null;
let isScientificMode = false;

// Input Validation
const isValidInput = (value) => {
    const validChars = /^[0-9+\-*/().]$/;
    const current = display.value;
    const lastChar = current.slice(-1);
    
    // Prevent double operators
    if ('+-*/'.includes(value) && '+-*/'.includes(lastChar)) return false;
    
    // Prevent multiple decimals
    if (value === '.' && current.split('.').length > (current.match(/\d+\.\d+/g)?.length || 0) + 1) return false;
    
    return validChars.test(value);
};

// Calculation Logic
function calculate() {
    try {
        if (display.value === lastCalculation) return;
        
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/,/g, '.');
            
        // Handle percentage calculations
        expression = expression.replace(/(\d+)%/g, (match, p1) => `(${p1}*0.01)`);
        
        const result = eval(expression);
        display.value = Number.isInteger(result) ? result : result.toFixed(4);
        lastCalculation = display.value;
    } catch (error) {
        showError(currentLang === 'de' ? 'Ungültige Rechnung' : 'Invalid calculation');
    }
    resizeText();
}

// Language System
function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.style.display = el.getAttribute('data-lang') === lang ? 'inline' : 'none';
    });
    document.getElementById('decimal').textContent = lang === 'de' ? ',' : '.';
}

// Mobile Optimization
document.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'BUTTON') e.preventDefault();
}, { passive: false });

// Initialize
document.body.setAttribute('data-theme', 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);
changeLanguage(navigator.language.startsWith('de') ? 'de' : 'en');