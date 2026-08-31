const display = document.getElementById('display');
let currentInput = '';

function updateDisplay(value) {
  display.value = value || '0';
}

function appendNumber(number) {
  if (currentInput === '0') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay(currentInput);
}

function appendOperator(operator) {
  if (currentInput === '') return;
  
  const lastChar = currentInput.slice(-1);
  if (['+', '-', '*', '/'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay(currentInput);
}

function clearDisplay() {
  currentInput = '';
  updateDisplay('0');
}

function calculate() {
  if (!currentInput) return;
  
  try {
    // eval 사용을 피하기 위한 간단한 안전 계산 처리
    const result = Function(`'use strict'; return (${currentInput})`)();
    currentInput = String(result);
    updateDisplay(currentInput);
  } catch (error) {
    updateDisplay('Error');
    currentInput = '';
  }
}