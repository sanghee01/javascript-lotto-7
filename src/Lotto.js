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
    numbers.forEach((char) => {
      if (isNaN(char)) {
        throw new Error('[ERROR] 쉼표(,)와 숫자 이외의 문자는 입력할 수 없습니다.');
      }
      if (!Number.isInteger(char)) {
        throw new Error('[ERROR] 로또 번호는 정수여야 합니다.');
      }
      if (char < 1 || char > 45) {
        throw new Error('[ERROR] 로또 번호는 1 ~ 45 범위의 숫자만 입력할 수 있습니다');
      }
    });

    if (new Set(numbers).size !== 6) {
      throw new Error('[ERROR] 로또 번호는 중복되면 안됩니다.');
    }
  }

  getNumbers() {
    return this.#numbers;
  }
  // TODO: 추가 기능 구현
}

export default Lotto;
