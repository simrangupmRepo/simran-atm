// ATM Management System - OOP Implementation
class ATM {
  constructor(initialBalance = 0) {
    this.balance = initialBalance;
    this.minBalance = 0;
  }

  deposit(amount) {
    if (!this.validateAmount(amount)) return false;
    this.balance += amount;
    return true;
  }

  withdraw(amount) {
    if (!this.validateAmount(amount)) return false;
    if (amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }

  getBalance() {
    return this.balance;
  }

  validateAmount(amount) {
    return typeof amount === 'number' && amount > 0 && Number.isInteger(amount);
  }
}

// DOM Elements
const balanceAmount = document.getElementById('balance-amount');
const amountInput = document.getElementById('amount');
const amountError = document.getElementById('amount-error');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const balanceBtn = document.getElementById('balance-btn');
const messageEl = document.getElementById('message');

// Initialize ATM
const atm = new ATM(1000); // Starting balance for demo

function updateBalance() {
  balanceAmount.textContent = `₹${atm.getBalance().toLocaleString()}`;
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
}

function clearMessage() {
  messageEl.textContent = '';
  messageEl.className = 'message';
}

function validateInput() {
  const value = amountInput.value.trim();
  amountError.textContent = '';

  if (!value) {
    amountError.textContent = 'Please enter an amount';
    return null;
  }

  const amount = parseInt(value, 10);
  if (isNaN(amount) || amount <= 0) {
    amountError.textContent = 'Please enter a valid positive amount';
    return null;
  }

  if (!Number.isInteger(parseFloat(value))) {
    amountError.textContent = 'Amount must be a whole number';
    return null;
  }

  return amount;
}

depositBtn.addEventListener('click', () => {
  clearMessage();
  const amount = validateInput();
  if (amount === null) return;

  if (atm.deposit(amount)) {
    updateBalance();
    showMessage(`Successfully deposited ₹${amount.toLocaleString()}`, 'success');
    amountInput.value = '';
  } else {
    showMessage('Invalid deposit amount', 'error');
  }
});

withdrawBtn.addEventListener('click', () => {
  clearMessage();
  const amount = validateInput();
  if (amount === null) return;

  if (atm.withdraw(amount)) {
    updateBalance();
    showMessage(`Successfully withdrew ₹${amount.toLocaleString()}`, 'success');
    amountInput.value = '';
  } else {
    showMessage(amount > atm.getBalance() ? 'Insufficient balance' : 'Invalid withdrawal amount', 'error');
  }
});

balanceBtn.addEventListener('click', () => {
  clearMessage();
  showMessage(`Your current balance is ₹${atm.getBalance().toLocaleString()}`, 'info');
});

// Initialize display
updateBalance();
