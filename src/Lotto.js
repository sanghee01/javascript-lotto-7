import Validation from './Validation.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    Validation.validateLottoNumber(numbers);
  }

  getNumbers() {
    return this.#numbers;
  }

  countMatchingNumbers(winningNumbers) {
    return this.#numbers.filter((number) => winningNumbers.includes(number)).length;
  }

  contains(number) {
    return this.#numbers.includes(number);
  }

  toString() {
    return `[${this.#numbers.join(', ')}]`;
  }
}

export default Lotto;
