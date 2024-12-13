class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }

    if (new Set(numbers).size !== 6) {
      throw new Error('[ERROR] 로또 번호는 중복되면 안됩니다.');
    }

    if (!numbers.every((number) => this.#isValidNumber(number))) {
      throw new Error('[ERROR] 로또 번호는 1 ~ 45 범위의 숫자만 입력할 수 있습니다');
    }
  }

  #isValidNumber(number) {
    return Number.isInteger(number) && number >= 1 && number <= 45;
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
