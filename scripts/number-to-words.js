/** @format */

const num = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
};

let Numbers = {};

for (let i = 1; i <= 99; i++) {
  Numbers =
    i in num ? { ...Numbers, [i]: num[i] } : { ...Numbers, [i]: getNumber(i) };
}

function getNumber(i) {
  const string = String(i);
  const tens = string[0] + '0';
  const ones = string[1];

  return `${num[tens]}-${num[ones]}`;
}

function getWords(number) {
  const scales = [
    '',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
  ];
  let words = [];

  const chunks = [];
  let start = number.length;
  let end;

  while (start > 0) {
    end = start;
    chunks.push(number.slice((start = Math.max(0, start - 3)), end));
  }

  chunks.forEach((item, i) => {
    if (Number(item) !== 0) {
      words.push(`${getNumbers(item, i, chunks.length)} ${scales[i]}`);
    }
  });

  return {
    number: chunks.reverse().join(','),
    word: words.reverse().join(', '),
  };
}

function getNumbers(item, i, len) {
  const { length } = item;
  if (length === 1 || length === 2) {
    return Numbers[item];
  } else if (length === 3) {
    const [hundreds, tens, ones] = item;

    const hN = Number(hundreds);
    const tN = Number(tens);
    const oN = Number(ones);

    if (!hN && !tN && !oN) {
      return '';
    } else if (!hN && !tN && oN) {
      return `and ${Numbers[ones]}`;
    } else if (!hN && tN && !oN) {
      return `and ${Numbers[tens + ones]}`;
    } else if (!hN && tN && oN) {
      return `and ${Numbers[tens + ones]}`;
    } else if (hN && !tN && !oN) {
      return `${i !== len - 1 ? 'and' : ''} ${Numbers[hundreds]} hundred`;
    } else if (hN && !tN && oN) {
      return `${Numbers[hundreds]} hundred and ${Numbers[ones]}`;
    } else {
      return `${Numbers[hundreds]} hundred and ${Numbers[tens + ones]}`;
    }
  }
}

export default getWords;
