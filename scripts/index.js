/** @format */
import getWords from './number-to-words.js';
const inputEl = document.querySelector('#number-input');
const displayEl = document.querySelector('.display-section');
const previewEl = document.querySelector('.preview');

let previews = [];
const generatePreviews = () => {
  for (let i = 1; i <= 1000; i++) {
    const randomNumber = getRandomNumber(1, 5000000);
    const { number, word } = getWords(String(randomNumber));
    previews.push({ originalNumber: String(randomNumber), number, word });
  }
};

inputEl.addEventListener('input', () => {
  renderDisplay();
});

generatePreviews();
renderPreviews();

function renderDisplay() {
  const number = inputEl.value;
  const result = getWords(number);
  displayEl.innerHTML = `
  <div class="words">${
    Number(number)
      ? `<div style='width: 100%'>
      <div>${result.number} = ${result.word}</div>
      <div class='btn-container'>
       <button class='copy-btn'>Copy</button>
      </div>
      </div>`
      : '<p>Please enter a number</p>'
  }</div>
  `;

  document
    ?.querySelector('.copy-btn')
    ?.addEventListener('click', () => copyNumber(result.word));
}

const copyNumber = (word) => {
  navigator.clipboard.writeText(word);
};

function renderPreviews() {
  let html = '';
  previews.forEach((preview) => {
    const { originalNumber, number, word } = preview;

    html += `
    <div class='number-item' data-number='${originalNumber}'>${number} = ${word}</div>
    `;
  });

  previewEl.innerHTML = `<div>
  <button class='generate-button'>Regenerate numbers</button>
    <div style='display: grid; row-gap: 5px;'>
    ${html}
    </div>
  </div>`;

  document.querySelector('.generate-button').addEventListener('click', () => {
    previews = [];
    generatePreviews();
    renderPreviews();
  });

  document.querySelectorAll('.number-item').forEach((El) => {
    El.addEventListener('click', () => {
      inputEl.value = El.dataset.number;
      renderDisplay();
    });
  });
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1) + min);
}
