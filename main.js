// ─── DOM references ────────────────────────────────────────────
const inputName  = document.querySelector('#input-name');
const inputNumber = document.querySelector('#input-number');
const inputMonth = document.querySelector('#input-month');
const inputYear  = document.querySelector('#input-year');
const inputCVC   = document.querySelector('#input-cvc');

const cardNumber = document.querySelector('#card-number');
const cardName   = document.querySelector('#card-name');
const cardMonth  = document.querySelector('#card-month');
const cardYear   = document.querySelector('#card-year');
const cardCVC    = document.querySelector('#card-cvc');

const form        = document.querySelector('#form');
const thankYou    = document.querySelector('#thank-you');
const btnContinue = document.querySelector('#continue');

const errName   = document.querySelector('#err-name');
const errNumber = document.querySelector('#err-number');
const errDate   = document.querySelector('#err-date');
const errCVC    = document.querySelector('#err-cvc');

// ─── Formateo del número (reemplaza Cleave) ───────────────────
function formatCardNumber(value) {
  // Solo dígitos, máximo 16
  const digits = value.replace(/\D/g, '').slice(0, 16);
  // Grupos de 4
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

inputNumber.addEventListener('input', () => {
  const cursor = inputNumber.selectionStart;
  const formatted = formatCardNumber(inputNumber.value);
  inputNumber.value = formatted;
  // Actualiza tarjeta
  cardNumber.textContent = formatted || '0000 0000 0000 0000';
  clearError(inputNumber, errNumber);
});

// ─── Live preview — otros campos ─────────────────────────────────
inputName.addEventListener('input', () => {
  cardName.textContent = inputName.value.trim() || 'Jane Appleseed';
  clearError(inputName, errName);
});

inputMonth.addEventListener('input', () => {
  inputMonth.value = inputMonth.value.replace(/\D/g, '').slice(0, 2);
  cardMonth.textContent = inputMonth.value || '00';
  clearError(inputMonth, errDate);
  errDate.textContent = '';
});

inputYear.addEventListener('input', () => {
  inputYear.value = inputYear.value.replace(/\D/g, '').slice(0, 2);
  cardYear.textContent = inputYear.value || '00';
  clearError(inputYear, errDate);
  errDate.textContent = '';
});

inputCVC.addEventListener('input', () => {
  inputCVC.value = inputCVC.value.replace(/\D/g, '').slice(0, 3);
  cardCVC.textContent = inputCVC.value || '000';
  clearError(inputCVC, errCVC);
});

// ─── Helpers validación ──────────────────────────────────────────
function setError(input, msgEl, message) {
  msgEl.textContent = message;
  input.classList.add('error');
}
function clearError(input, msgEl) {
  msgEl.textContent = '';
  input.classList.remove('error');
}

// ─── Validación ──────────────────────────────────────────────────
function validateAll() {
  let valid = true;

  if (!inputName.value.trim()) {
    setError(inputName, errName, "Can't be blank");
    valid = false;
  } else {
    clearError(inputName, errName);
  }

  const digits = inputNumber.value.replace(/\s/g, '');
  if (!digits) {
    setError(inputNumber, errNumber, "Can't be blank");
    valid = false;
  } else if (!/^\d{13,16}$/.test(digits)) {
    setError(inputNumber, errNumber, 'Wrong format, numbers only');
    valid = false;
  } else {
    clearError(inputNumber, errNumber);
  }

  const m = parseInt(inputMonth.value, 10);
  const y = parseInt(inputYear.value, 10);
  if (!inputMonth.value || !inputYear.value) {
    setError(inputMonth, errDate, "Can't be blank");
    valid = false;
  } else if (isNaN(m) || m < 1 || m > 12) {
    setError(inputMonth, errDate, 'Invalid month');
    valid = false;
  } else if (isNaN(y) || inputYear.value.length < 2) {
    setError(inputMonth, errDate, 'Invalid year');
    valid = false;
  } else {
    clearError(inputMonth, errDate);
    errDate.textContent = '';
  }

  if (!inputCVC.value) {
    setError(inputCVC, errCVC, "Can't be blank");
    valid = false;
  } else if (!/^\d{3}$/.test(inputCVC.value)) {
    setError(inputCVC, errCVC, 'Must be 3 digits');
    valid = false;
  } else {
    clearError(inputCVC, errCVC);
  }

  return valid;
}

// ─── Submit ──────────────────────────────────────────────────────
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateAll()) return;
  form.classList.add('hidden');
  thankYou.classList.remove('hidden');
});

// ─── Continue / reset ────────────────────────────────────────────
btnContinue.addEventListener('click', () => {
  thankYou.classList.add('hidden');
  form.classList.remove('hidden');
  form.reset();

  cardName.textContent   = 'Jane Appleseed';
  cardNumber.textContent = '0000 0000 0000 0000';
  cardMonth.textContent  = '00';
  cardYear.textContent   = '00';
  cardCVC.textContent    = '000';

  [inputName, inputNumber, inputMonth, inputYear, inputCVC].forEach(i => i.classList.remove('error'));
  [errName, errNumber, errDate, errCVC].forEach(el => el.textContent = '');
});

// ─── Init ────────────────────────────────────────────────────────
thankYou.classList.add('hidden');
