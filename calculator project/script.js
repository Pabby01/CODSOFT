const display = document.getElementById('display');

// Append number to the display
function appendNumber(number) {
    display.value += number;
}

// Append operator to the display
function appendOperator(operator) {
    display.value += operator;
}

// Clear the display
function clearDisplay() {
    display.value = '';
}

// Delete the last character in the display
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculateResult() {
    try {
        // Replace "^" with "**" for exponentiation
        display.value = display.value.replace(/(\d+)\^(\d+)/g, (match, base, exp) => `Math.pow(${base},${exp})`);
        
        // Evaluate trigonometric functions
        display.value = display.value.replace(/sin\(([^)]+)\)/g, "Math.sin($1)");
        display.value = display.value.replace(/cos\(([^)]+)\)/g, "Math.cos($1)");
        display.value = display.value.replace(/tan\(([^)]+)\)/g, "Math.tan($1)");
        
        // Evaluate logarithmic functions
        display.value = display.value.replace(/ln\(([^)]+)\)/g, "Math.log($1)");
        display.value = display.value.replace(/log10\(([^)]+)\)/g, "Math.log10($1)");
        
        // Evaluate square root function
        display.value = display.value.replace(/sqrt\(([^)]+)\)/g, "Math.sqrt($1)");
        
        // Replace "e" with "Math.E"
        display.value = display.value.replace(/e/g, "Math.E");
        
        // Evaluate the expression
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}
